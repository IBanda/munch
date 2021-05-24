import { FloatingActionButton } from '@progress/kendo-react-buttons';
import useUser from './AuthProvider';
import { useMutation, gql, StoreObject } from '@apollo/client';
import updateRating from 'utils/updateRating';

const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!, $hasImages: Boolean, $placeId: ID!) {
    deleteReview(id: $id, hasImages: $hasImages, placeId: $placeId) {
      id
      placeId
      rating
    }
  }
`;

interface ActionButtonProps {
  creatorId: string;
  reviewId: string;
  hasImages: boolean;
  placeId: string;
}
export default function ReviewDeleteBtn({
  creatorId,
  reviewId,
  hasImages = false,
  placeId,
}: ActionButtonProps) {
  const { user } = useUser();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    update(cache, { data: { deleteReview } }) {
      cache.modify({
        fields: {
          places: (existing) => {
            const copy = [...existing.places];
            const index = copy.findIndex(
              (place) => place.place_id === deleteReview.placeId
            );
            const place = { ...copy[index] };
            place.ratings = updateRating(
              place.ratings,
              deleteReview.rating,
              'sub'
            );
            copy[index] = place;
            return {
              next_page_token: existing.next_page_token,
              places: copy,
            };
          },
          reviews: (existing, { readField }) => {
            const filteredReviews = existing.reviews.filter(
              (review: StoreObject) =>
                readField('id', review) !== deleteReview.id
            );
            return {
              reviews: filteredReviews,
              hasMore: existing.hasMore,
            };
          },
          ratings: (existing) => {
            return {
              placeId: deleteReview.placeId,
              ratings: updateRating(
                existing.ratings,
                deleteReview.rating,
                'sub'
              ),
            };
          },
        },
      });
    },
  });

  const onClick = () => {
    deleteReview({
      variables: {
        id: reviewId,
        hasImages,
        placeId,
      },
    });
  };
  return user?.id === creatorId ? (
    <FloatingActionButton
      data-testid={'del-btn'}
      align={{
        horizontal: 'end',
        vertical: 'top',
      }}
      onClick={onClick}
      size="small"
      className="position-absolute"
      icon="trash"
      themeColor="error"
    ></FloatingActionButton>
  ) : null;
}
