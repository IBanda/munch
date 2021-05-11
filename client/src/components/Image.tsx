interface ImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function Image({ src, alt, style, className }: ImageProps) {
  return <img style={style} className={className} src={src} alt={alt} />;
}
