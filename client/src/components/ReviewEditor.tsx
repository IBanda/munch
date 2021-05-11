import { FormEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { useMutation, gql } from '@apollo/client';
import { TextArea, Rating } from '@progress/kendo-react-inputs';
import { Loader } from '@progress/kendo-react-indicators';
import {
  Upload,
  UploadFileInfo,
  UploadOnAddEvent,
  UploadOnRemoveEvent,
} from '@progress/kendo-react-upload';
import UploadListItem from './UploadListItem';

const POST_REVIEW = gql`
  mutation PostReview($review: ReviewInput, $files: [Upload]) {
    review: postReview(review: $review, files: $files) {
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
  const [files, setFiles] = useState<Array<UploadFileInfo>>();
  const [postReview, { loading, error }] = useMutation(POST_REVIEW);
  const uploadRef = useRef<Upload>(null);

  const onPostReview = (e: FormEvent) => {
    const rawFiles = files?.map((file) => file.getRawFile?.());
    e.preventDefault();
    console.log(rawFiles);
    postReview({
      variables: {
        review: {
          review: value,
          placeId,
          rating,
          user: '608e48a01e1d61a54c208752',
        },
        files: rawFiles,
      },
    });
    setValue('');
    setRating(0);
  };

  const onAdd = (event: UploadOnAddEvent) => {
    console.log(event.affectedFiles);
    setFiles(event.newState);
  };
  const onRemove = (event: UploadOnRemoveEvent) => {
    setFiles(event.newState);
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
      <Upload
        ref={uploadRef}
        files={files}
        onAdd={onAdd}
        onRemove={onRemove}
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
