import { useEffect, useRef, useState } from 'react';

interface SchemaMaskProps {
  /** 监听元素的 id */
  id?: string;
}

/** schema 选中时的遮罩样式组件 */
export const SchemaMask = ({ id }: SchemaMaskProps) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (id) {
      const dom = document.getElementById(id) as HTMLElement;
      if (!dom) return setValid(false);

      const updateMaskStyle = () => {
        setStyle({
          width: dom.style.width,
          height: dom.style.height,
          left: `${dom.offsetLeft}px`,
          top: `${dom.offsetTop}px`,
        });
      };

      const config = { attributes: true, childList: false, subtree: false, attributeFilter: ['style'] };
      const observer = new MutationObserver(updateMaskStyle);
      observer.observe(dom, config);

      updateMaskStyle();

      return () => {
        observer.disconnect();
      };
    }
  }, [id]);

  if (id && valid) {
    return (
      <div
        ref={containerRef}
        aria-label='schema-mask'
        style={{
          ...style,
          position: 'absolute',
          border: '1px solid #7272ff',
          pointerEvents: 'none',
        }}
      />
    );
  } else {
    return null;
  }
};
