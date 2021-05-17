import React from 'react';
import { Photo } from 'lib/interface';
import Image from './Image';

interface Props {
  images: Photo[];
  name: string;
}

export default function ImageGrid({ images, name }: Props) {
  const hasImages = images?.[0].photo_reference == null;
  return (
    <div className="row no-gutters">
      {!hasImages ? (
        <>
          <div className={`position-relative col-5 m__img-grid-wrapper`}>
            <Image
              src={`data:image/png;base64,${images?.[0].photo_reference}`}
              style={{ height: '10em' }}
              alt={`${name}-${1}`}
              className="m__img-grid"
            />
          </div>
          <div className="col-7">
            <div className="row no-gutters">
              {images.slice(1).map((image, indx) => (
                <div
                  key={indx}
                  className={`${indexer(indx)}   m__img-grid-wrapper`}
                >
                  <img
                    className="m__img-grid"
                    src={`data:image/png;base64,${image.photo_reference}`}
                    style={{ height: indx > 2 ? '4em' : '5.8em' }}
                    alt={`${name}-${indx + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="w-100 text-center bg-secondary py-4">
          <img
            style={{ maxWidth: '5em', width: '100%' }}
            src="/place.png"
            alt="placeholder"
            className="mx-auto"
          />
        </div>
      )}
    </div>
  );
}

function indexer(index: number) {
  if (index === 1 || index === 2) return 'col-6';
  if (index >= 3 && index <= 5) return 'col-4';
  return 'd-none';
}
