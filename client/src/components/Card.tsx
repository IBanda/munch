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
  const isOpen = place.opening_hours?.open_now === true;
  const isUnknown = place.opening_hours?.open_now == null;
  const photo = place?.photos?.[0]?.photo_reference;
  return (
    <Card orientation="horizontal" className="cursor-pointer">
      <CardBody className="d-flex">
        <CardImage
          src={`${photo ? `data:image/png;base64,${photo}` : '/place.png'}`}
          className="m__card-image rounded mr-2"
        />
        <div className="w-100">
          <CardTitle className="mb-1 m__card-title">{place.name}</CardTitle>
          <div className="d-flex align-items-center w-100">
            <SvgIcon icon={mapMarkerIcon} size="small" />
            <CardSubtitle className=" m-0  m__card-subtitle d-inline-block text-truncate">
              {place?.vicinity}
            </CardSubtitle>
          </div>
          {!isUnknown ? (
            <span
              className={`m-0  m__card-status   d-inline text-white  ${
                isOpen ? 'text-success' : 'text-danger'
              }`}
            >
              {isOpen ? 'Open' : 'Closed'}
            </span>
          ) : null}
        </div>
      </CardBody>
    </Card>
  );
}
