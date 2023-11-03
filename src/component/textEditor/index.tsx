import { useState } from "react";

export const TextEditor = () => {
  const [html, setHtml] = useState('')

  return <div
    className="leading-[1] p-1 outline-none min-w-[30px] inline-block border-1 border-solid border-[#000000]"
    contentEditable
    dangerouslySetInnerHTML={{ __html: html }}
    onInput={e => {
      setHtml((e.target as HTMLDivElement).innerHTML);
    }}
  />;
};
