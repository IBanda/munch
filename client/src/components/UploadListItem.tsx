import {
  UploadFileInfo,
  UploadListItemProps,
} from '@progress/kendo-react-upload';
import { useContext, useEffect } from 'react';
import { UploadState } from './Context';
import { xCircleIcon } from '@progress/kendo-svg-icons';
import { SvgIcon } from '@progress/kendo-react-common';
import { Button } from '@progress/kendo-react-buttons';

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
  const removeFile = useContext(UploadState);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);

  return (
    <div className="position-relative h-100 w-100">
      <img className="m__upload-preview" src={url} alt={file.name} />
      <Button
        style={{ top: 0, right: 0 }}
        onClick={() => removeFile?.(file.uid)}
        className="position-absolute shadow-none px-2 bg-transparent m__outline-none border-0 z-index-2"
      >
        <SvgIcon icon={xCircleIcon} themeColor="error" />
      </Button>
    </div>
  );
}
