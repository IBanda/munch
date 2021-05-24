import { useState } from 'react';
import { Skeleton } from '@progress/kendo-react-indicators';

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
        <Skeleton
          shape="rectangle"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 2,
          }}
        />
      )}
      <img
        onLoad={onLoad}
        style={{ ...style, opacity: loaded ? 1 : 0 }}
        className={className}
        src={src}
        alt={alt}
      />
    </div>
  );
}
