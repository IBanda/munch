import { formatDistanceToNow } from 'date-fns';
import { Rating } from '@progress/kendo-react-inputs';
import ReviewText from './ReviewText';
import { Avatar } from '@progress/kendo-react-layout';
import { Card, CardBody } from '@progress/kendo-react-layout';
import ReviewDeleteBtn from './ReviewDeleteBtn';

export default function ReviewCard(props: any) {
  const item = props.dataItem;

  return (
    <Card
      key={item.id}
      orientation="horizontal"
      style={{ backgroundColor: '#f3f6f8' }}
      className=" p-2  my-2"
    >
      <CardBody className="d-flex flex-column position-relative p-0">
        <div className="d-flex align-items-center">
          <Avatar shape="circle">
            {item?.user?.profilePic ? (
              <img
                className="m__avatar-img "
                src={item?.user?.profilePic}
                alt={item?.user?.name}
              />
            ) : (
              item?.user?.name?.[0].toUpperCase()
            )}
          </Avatar>

          <span className="m__details-reviews-name ">
            <strong>{item?.user?.name}</strong>
          </span>
        </div>

        <div className="d-flex flex-column ">
          <div>
            <div className="d-flex align-items-center m__meta">
              <Rating
                className="m__rating"
                value={item?.rating}
                id={`rating-${item?.user?.name}`}
                readonly
              />
              <span className="m__details-reviews-created">
                {formatDistanceToNow(+item?.created_on, {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <div className="m__details-reviews-text">
            <ReviewText review={item?.review} />
          </div>
          <ul className="list-unstyled mt-2 d-flex mb-0">
            {item?.images.map((image: string) => (
              <li key={image} className="mr-1">
                <img className="m__review-img" src={image} alt="review" />
              </li>
            ))}
          </ul>
        </div>
        <ReviewDeleteBtn
          hasImages={Boolean(item?.images?.length)}
          reviewId={item?.id}
          placeId={item?.placeId}
          creatorId={item?.user?.id}
          rating={item?.rating}
        />
      </CardBody>
    </Card>
  );
}
