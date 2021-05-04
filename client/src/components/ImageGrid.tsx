interface Props {
  images: string[];
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
  return (
    <div className="row no-gutters">
      <div className={`relative col-lg-5 m_img-drid-wrapper`}>
        <Image
          //  src={`data:image/png;base64,${image}`}
          src={imgs?.[0]}
          alt={`${name}-${1}`}
        />
      </div>
      <div className="col-lg-7">
        <div className="row no-gutters">
          {imgs.slice(1).map((img, indx) => (
            <div key={indx} className={`${indexer(indx)}   m_img-drid-wrapper`}>
              <img
                className="m__img-grid"
                //  src={`data:image/png;base64,${image}`}
                src={img}
                alt={`${name}-${indx + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ImageProps {
  src: string;
  alt: string;
}
function indexer(index: number) {
  if (index === 1 || index === 2) return 'col-lg-6';
  if (index >= 3 && index <= 5) return 'col-lg-4';
  return 'd-none';
}
function Image({ src, alt }: ImageProps) {
  return <img className="m__img-grid" src={src} alt={alt} />;
}
