import { FormEvent, useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { useMutation, gql } from '@apollo/client';
import {
  TextArea,
  Rating,
  RatingChangeEvent,
} from '@progress/kendo-react-inputs';
import { Loader } from '@progress/kendo-react-indicators';
import { UploadFileInfo, UploadOnAddEvent } from '@progress/kendo-react-upload';
import updateRating from 'utils/updateRating';
import ImageUpload from './ImageUpload';
import useUser from './AuthProvider';
import { useAuthFormControls } from './Context';
import { Fade } from '@progress/kendo-react-animation';
import { Notification } from '@progress/kendo-react-notification';

const POST_REVIEW = gql`
  mutation PostReview($review: ReviewInput, $files: [Upload]) {
    review: postReview(review: $review, files: $files) {
      id
      review
      placeId
      rating
    }
  }
`;

interface Props {
  placeId: string;
}

export default function ReviewEditor({ placeId }: Props) {
  const { setModal, setForm } = useAuthFormControls();
  const { user } = useUser();
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);
  const [files, setFiles] = useState<Array<UploadFileInfo>>([]);

  const [postReview, { loading, error }] = useMutation(POST_REVIEW, {
    update(cache, { data: { review } }) {
      cache.modify({
        fields: {
          places(existing) {
            const copy = [...existing.places];
            const index = copy.findIndex(
              (place) => place.place_id === review.placeId
            );
            const place = { ...copy[index] };
            place.ratings = updateRating(place.ratings, review.rating);
            copy[index] = place;
            return {
              next_page_token: existing.next_page_token,
              places: copy,
            };
          },
        },
      });
    },
  });

  const onPostReview = (e: FormEvent) => {
    e.preventDefault();
    const rawFiles = files?.map((file) => file.getRawFile?.());
    postReview({
      variables: {
        review: {
          review: value,
          placeId,
          rating,
          user: user?.id,
        },
        files: rawFiles,
      },
    });

    setValue('');
    setRating(0);
    setFiles([]);
  };

  const onAdd = (event: UploadOnAddEvent) => {
    setFiles(event.newState.slice(0, 3));
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.uid !== id));
  };
  const handleChange = (e: RatingChangeEvent) => {
    setRating(e.value);
  };

  const onSignIn = () => {
    setModal('visible');
    setForm('login');
  };
  return user ? (
    <form onSubmit={onPostReview} className="mt-2">
      <div>
        <Rating
          className="m__shadow-rating"
          value={rating}
          onChange={handleChange}
        />
        <Rating value={rating} />
      </div>
      <TextArea
        placeholder="Share your experience"
        value={value}
        rows={3}
        onChange={(e) => {
          setValue(e.value as any);
        }}
        className="w-100 bg-secondary m__editor"
      />
      <ImageUpload
        files={files}
        onAdd={onAdd}
        multiple={true}
        removeFile={removeFile}
      />
      <small className="text-muted">Upload a maximum of 3 images</small>
      <div className="text-right">
        <Button
          disabled={!rating || (loading && Boolean(rating))}
          type="submit"
          className="mt-3  btn-sm"
          primary={true}
        >
          {!loading ? 'Post' : <Loader themeColor="light" />}
        </Button>
      </div>
      {error ? (
        <Fade>
          <Notification
            type={{
              style: 'error',
              icon: true,
            }}
          >
            {error?.message}
          </Notification>
        </Fade>
      ) : null}
    </form>
  ) : (
    <div className="d-flex align-items-center mt-4">
      <Button onClick={onSignIn} primary={true} className="btn-sm mr-1">
        Sign in
      </Button>
      <span>to post a review</span>
    </div>
  );
}
