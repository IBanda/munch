import { FormEvent, useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { useMutation, gql } from '@apollo/client';
import {
  TextArea,
  Rating,
  RatingChangeEvent,
} from '@progress/kendo-react-inputs';
import { Loader } from '@progress/kendo-react-indicators';
import {
  Upload,
  UploadFileInfo,
  UploadOnAddEvent,
} from '@progress/kendo-react-upload';
import UploadListItem from './UploadListItem';
import { UploadState } from './Context';
import updateRating from 'utils/updateRating';

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
          user: '609b9bde25e9f52edc0652aa',
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
  return (
    <form onSubmit={onPostReview}>
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
      <UploadState.Provider value={removeFile}>
        <Upload
          files={files}
          onAdd={onAdd}
          listItemUI={UploadListItem}
          multiple={true}
          withCredentials={false}
          autoUpload={false}
          showActionButtons={false}
          restrictions={{
            allowedExtensions: ['.png', '.jpg'],
            maxFileSize: 250000,
          }}
        />
      </UploadState.Provider>
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
    </form>
  );
}
