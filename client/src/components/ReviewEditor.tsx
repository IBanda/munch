import { FormEvent, useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { useMutation, gql } from '@apollo/client';
import { TextArea, Rating } from '@progress/kendo-react-inputs';

const POST_REVIEW = gql`
  mutation PostReview($review: ReviewInput) {
    review: postReview(review: $review) {
      id
      review
    }
  }
`;
interface Props {
  placeId: string;
}

export default function ReviewEditor({ placeId }: Props) {
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);
  const [postReview, { loading, error }] = useMutation(POST_REVIEW);
  const onPostReview = (e: FormEvent) => {
    e.preventDefault();
    postReview({
      variables: {
        review: {
          review: value,
          placeId,
          rating,
          user: '608e48a01e1d61a54c208752',
        },
      },
    });
  };
  return (
    <form onSubmit={onPostReview}>
      <Rating value={rating} onChange={(e) => setRating(e.value)} required />
      <TextArea
        placeholder="Share your experience"
        value={value}
        rows={3}
        onChange={(e) => {
          setValue(e.value as any);
        }}
        className="w-100 bg-secondary m__editor"
      />
      <Button
        disabled={!rating}
        type="submit"
        className="mt-3 ml-auto btn-sm"
        primary={true}
      >
        Post
      </Button>
    </form>
  );
}
