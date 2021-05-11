import {
  UploadFileInfo,
  UploadListItemProps,
} from '@progress/kendo-react-upload';
import { useEffect } from 'react';

export default function UploadListItem({ files }: UploadListItemProps) {
  return (
    <>
      {files.map((file) => {
        return <PreviewImage key={file.uid} file={file} />;
      })}
    </>
  );
}

interface PreviewImageProps {
  file: UploadFileInfo;
}
function PreviewImage({ file }: PreviewImageProps) {
  const url = URL.createObjectURL(file.getRawFile?.());
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);
  return <img className="m__upload-preview" src={url} alt={file.name} />;
}
