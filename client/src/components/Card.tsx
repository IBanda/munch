import {
  Card,
  CardBody,
  CardImage,
  CardSubtitle,
  CardTitle,
} from '@progress/kendo-react-layout';
import { SvgIcon } from '@progress/kendo-react-common';
import { mapMarkerIcon } from '@progress/kendo-svg-icons';
import { Place } from 'lib/interface';

interface Props {
  place: Place;
}

export default function PlaceCard({ place }: Props) {
  const isOpen = place.opening_hours?.open_now;
  return (
    <Card orientation="horizontal">
      <CardBody className="d-flex">
        <CardImage
          // src={`data:image/png;base64,${place?.photos?.[0]?.photo_reference}`}
          src={
            'https://www.elitetraveler.com/wp-content/uploads/2007/02/Alain-Ducasse-scaled.jpg'
          }
          className="m__card-image rounded mr-2"
        />
        <div>
          <CardTitle className="m-0 m__card-title">{place.name}</CardTitle>
          <CardSubtitle
            className={`m-0  m__card-subtitle ${
              isOpen ? 'text-success' : 'text-danger'
            }`}
          >
            {isOpen ? 'Open' : 'Closed'}
          </CardSubtitle>
          <small className="d-flex align-items-center">
            <SvgIcon icon={mapMarkerIcon} size="small" /> {place?.vicinity}
          </small>
          <ul className="list-unstyled d-flex m-0 p-0 flex-wrap">
            {place?.types?.map((type) => (
              <li className="mr-1" key={type}>
                <small>{type}</small>
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
}
