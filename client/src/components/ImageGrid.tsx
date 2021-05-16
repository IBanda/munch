import React from 'react';
import { Photo } from 'lib/interface';
import Image from './Image';

interface Props {
  images: Photo[];
  name: string;
}

const imgs = [
  'https://www.elitetraveler.com/wp-content/uploads/2017/10/Hotel-Eden-La-Terrazza-scaled-e1600071873644.jpg',
  'https://lucianacencioniarte.com/wp-content/uploads/2019/08/Restaurants-Rome.jpg',
  'https://njfamily-images.s3.us-east-1.amazonaws.com/wp-content/uploads/2019/07/Rebecca-Ferrier-Photography-Image-1.jpeg',
  'https://www.discoverlosangeles.com/sites/default/files/images/2019-01/hotel-angeleno-west-views.jpg?width=1600&height=1200&fit=crop&quality=78&auto=webp',
  'https://media.cntraveler.com/photos/5cacaf106c6a90694611589b/master/pass/Nightshade_2019_Frank-Lee_2018-12-14-NightShade-117.jpg',
  'https://37g8q83dpternslae3eh1f8t-wpengine.netdna-ssl.com/wp-content/uploads/2019/01/jpg-2000x1125.jpg',
  'https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2019/07/fea_restaurants-18.jpg',
  'http://www.northpalmbeachlife.com/uploads/6/2/4/1/62412075/esr-farestart-48-orlando-and-ethan-serving_orig.jpg',
];

export default function ImageGrid({ images, name }: Props) {
  const hasImages = images?.[0].photo_reference == null;
  return (
    <div className="row no-gutters">
      {!hasImages ? (
        <>
          <div className={`position-relative col-5 m__img-grid-wrapper`}>
            <Image
              src={`data:image/png;base64,${images?.[0].photo_reference}`}
              // src={images?.[0]}
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
