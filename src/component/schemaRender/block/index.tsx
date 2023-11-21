export interface BlockRenderProps {
  style: React.CSSProperties;
  id: string;
}

export const BlockRender = ({ style, id }: BlockRenderProps) => {
  return (
    <pre aria-label='schema' style={style} id={id}>
      {style.content}
    </pre>
  );
};
