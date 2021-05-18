import { FloatingActionButton } from '@progress/kendo-react-buttons';
import useUser from './AuthProvider';
import { useMutation, gql } from '@apollo/client';
import updateRating, { indexMapper } from 'utils/updateRating';

const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!, $hasImages: Boolean, $placeId: ID!) {
    deleteReview(id: $id, hasImages: $hasImages, placeId: $placeId)
  }
`;

interface ActionButtonProps {
  creatorId: string;
  reviewId: string;
  hasImages: boolean;
  placeId: string;
  rating: 1 | 2 | 3 | 4 | 5;
}
export default function ReviewDeleteBtn({
  creatorId,
  reviewId,
  hasImages = false,
  placeId,
  rating,
}: ActionButtonProps) {
  const { user } = useUser();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    update(cache) {
      cache.modify({
        fields: {
          places: (existing) => {
            const copy = [...existing.places];
            const index = copy.findIndex((place) => place.place_id === placeId);
            const place = { ...copy[index] };
            place.ratings = updateRating(place.ratings, rating, 'sub');
            copy[index] = place;
            return {
              next_page_token: existing.next_page_token,
              places: copy,
            };
          },
          ratings(existing) {
            if (existing.placeId === placeId) {
              const ratings = [...existing.ratings];
              ratings[indexMapper[rating]] -= 1;
              return { placeId, ratings };
            }
            return existing;
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
