import { Editor } from '@progress/kendo-react-editor';
import { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';

export default function ReviewEditor() {
  const [value, setValue] = useState('<p>Share your experience</p>');
  return (
    <>
      <Editor
        contentStyle={{ height: 100 }}
        value={value}
        onChange={(e) => setValue(e.html)}
      />
      <Button className="mt-3 ml-auto" primary={true}>
        Post
      </Button>
    </>
  );
}
