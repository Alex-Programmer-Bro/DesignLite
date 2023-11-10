use std::fs::File;
use std::io::prelude::*;
use std::path::PathBuf;

#[tauri::command]
fn export_assets(html: &str, schemas: &str) {
    // 创建或打开 index.html 文件
    let mut html_file = File::create("index.html").expect("Unable to create index.html");
    html_file.write_all(html.as_bytes()).expect("Unable to write to index.html");

    // 创建或打开 fps.json 文件
    let mut json_file = File::create("fps.json").expect("Unable to create fps.json");
    json_file.write_all(schemas.as_bytes()).expect("Unable to write to fps.json");

    // 获取用户的下载目录
    if let Some(download_dir) = dirs::download_dir() {
        // 构建目标路径
        let target_path: PathBuf = download_dir.join("website.zip");

        // 创建 ZIP 归档文件
        let mut archive = zip::ZipWriter::new(File::create(&target_path).expect("Unable to create website.zip"));

        // 添加文件到 ZIP 归档
        let options = zip::write::FileOptions::default()
            .compression_method(zip::CompressionMethod::Stored)
            .unix_permissions(0o755);

        archive.start_file("index.html", options).expect("Unable to start file in archive");
        archive.write_all(html.as_bytes()).expect("Unable to write to zip archive");

        archive.start_file("fps.json", options).expect("Unable to start file in archive");
        archive.write_all(schemas.as_bytes()).expect("Unable to write to zip archive");

        // 完成 ZIP 归档
        archive.finish().expect("Unable to finish zip archive");

        println!("website.zip has been generated in the download directory: {:?}", target_path);
    } else {
        eprintln!("Unable to determine the download directory");
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![export_assets])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
