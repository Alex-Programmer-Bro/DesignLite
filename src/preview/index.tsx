import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { useTitle } from "../hook/useTitle";
import { getCodeAtom } from "../store/schema";

export const Preview = () => {
  useTitle('FPS - Preview');

  const styleTag = useRef(document.createElement('style'));
  const htmlTag = useRef(document.createElement('div'));

  const { html, css } = useAtomValue(getCodeAtom);

  useEffect(() => {
    htmlTag.current.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
    `;

    document.head.appendChild(styleTag.current);
    document.body.appendChild(htmlTag.current);

    return () => {
      styleTag.current.remove();
      htmlTag.current.remove();
    }
  }, []);

  useEffect(() => {
    styleTag.current.innerText = css;
    htmlTag.current.innerHTML = html;
  }, [html, css]);

  return null;
};
