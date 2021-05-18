import { useState } from 'react';
import ContentLoader from 'react-content-loader';

interface ImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function Image({ src, alt, style, className }: ImageProps) {
  const [loaded, setLoad] = useState(false);
  const onLoad = () => {
    setLoad(true);
  };
  return (
    <div className="position-relative">
      {loaded ? null : (
        <ContentLoader
          style={{
            position: 'absolute',
            zIndex: 10,
            top: 0,
            bottom: 0,
            height: '100%',
            width: '100%',
          }}
          speed={2}
          width="100%"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="" rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
      )}
      <img
        onLoad={onLoad}
        style={style}
        className={className}
        src={src}
        alt={alt}
      />
    </div>
  );
}
