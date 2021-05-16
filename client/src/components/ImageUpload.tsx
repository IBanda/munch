import {
  Upload,
  UploadFileInfo,
  UploadOnAddEvent,
} from '@progress/kendo-react-upload';
import UploadListItem from './UploadListItem';
import { UploadState } from './Context';

interface Props {
  removeFile: (id: string) => void;
  files: UploadFileInfo[];
  onAdd: (e: UploadOnAddEvent) => void;
  multiple?: boolean;
}

export default function ImageUpload({
  removeFile,
  files,
  onAdd,
  multiple = false,
}: Props) {
  return (
    <UploadState.Provider value={removeFile}>
      <Upload
        files={files}
        onAdd={onAdd}
        listItemUI={UploadListItem}
        multiple={multiple}
        withCredentials={false}
        autoUpload={false}
        showActionButtons={false}
        restrictions={{
          allowedExtensions: ['.png', '.jpg'],
          maxFileSize: 250000,
        }}
      />
    </UploadState.Provider>
  );
}
