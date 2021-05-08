import { useEffect, useRef, useCallback, useState } from 'react';
import { ListView } from '@progress/kendo-react-listview';
import SimpleBar from 'simplebar-react';
import { formatDistanceToNow } from 'date-fns';
import { Rating } from '@progress/kendo-react-inputs';
import ReviewText from './ReviewText';
import 'simplebar/dist/simplebar.min.css';
import { Review } from 'lib/interface';
import isScrollatBottom from 'utils/isScrollatBottom';

interface Props {
  fetchMore: any;
  reviews: Review[];
  hasMore: Boolean;
}

export default function ReviewList({ fetchMore, reviews, hasMore }: Props) {
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(6);

  const scrollHandler = useCallback(
    async (event: any) => {
      if (isScrollatBottom(event) && hasMore) {
        await fetchMore({
          variables: {
            offset,
          },
        });
        setOffset((p) => p + 6);
      }
    },
    [fetchMore, hasMore, offset]
  );
  useEffect(() => {
    if (scrollBarRef.current) {
      scrollBarRef.current.onscroll = scrollHandler;
    }
  }, [scrollHandler]);

  return reviews.length ? (
    <SimpleBar
      scrollableNodeProps={{ ref: scrollBarRef }}
      className="m__listview-reviews shadow rounded mb-4"
    >
      <ListView item={RenderItem} data={reviews} className="rounded" />
    </SimpleBar>
  ) : null;
}

function RenderItem(props: any) {
  const item = props.dataItem;
  return (
    <div key={item.id} className=" p-2 bg-white my-2">
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center">
          <div
            style={{ width: 30, height: 30 }}
            className="mr-2 rounded-circle bg-primary text-white text-uppercase d-flex align-items-center justify-content-center"
          >
            {item?.user?.name[0]}
          </div>
          <span className="m__details-reviews-name">
            <strong>{item.user.name}</strong>
          </span>
        </div>

        <div className="d-flex flex-column ">
          <div>
            <div className="d-flex align-items-center m__meta">
              <Rating
                className="m__rating"
                value={item.rating}
                id={`rating-${item.user.name}`}
                readonly
              />
              <span className="m__details-reviews-created">
                {formatDistanceToNow(+item.created_on, {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <div className="m__details-reviews-text">
            <ReviewText review={item.review} />
          </div>
        </div>
      </div>
    </div>
  );
}
