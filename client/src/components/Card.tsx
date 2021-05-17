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
import { Rating } from '@progress/kendo-react-inputs';
import ratingData from 'utils/ratingData';

interface Props {
  place: Place;
}

export default function PlaceCard({ place }: Props) {
  const photo = place?.photos?.[0]?.photo_reference;
  const { averageRating, totalNumofRatings } = ratingData(place?.ratings);

  return (
    <Card
      orientation="horizontal"
      className="cursor-pointer border-top-0 border-left-0 border-right-0 rounded-0  border-bottom  "
    >
      <CardBody className="d-flex">
        <CardImage
          src={`${photo ? `data:image/png;base64,${photo}` : '/place.png'}`}
          className="m__card-image rounded mr-2"
        />
        <div className="w-100">
          <CardTitle className=" mb-0 m__card-title">{place.name}</CardTitle>
          <div className="d-flex align-items-center">
            {Boolean(averageRating) && (
              <span className="mr-1">
                <small>{averageRating || ''}</small>
              </span>
            )}
            <Rating value={averageRating} precision="half" readonly />
            <span>
              <small>{totalNumofRatings || 'No'} Ratings</small>
            </span>
          </div>
          <div className="d-flex align-items-center w-100">
            <SvgIcon
              className="mt-n1"
              icon={mapMarkerIcon}
              themeColor={'success'}
              size="small"
            />
            <CardSubtitle className=" m-0  m__card-subtitle d-inline-block text-truncate">
              {place?.vicinity}
            </CardSubtitle>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
