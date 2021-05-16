import { InputChangeEvent } from '@progress/kendo-react-inputs';
import { FloatingLabel } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';

interface Props {
  id: string;
  value: string;
  label: string;
  onChange: (e: InputChangeEvent) => void;
  type?: string;
  required?: boolean;
}

export function InputWithLabel({
  id,
  value,
  label,
  onChange,
  type = 'text',
  required = false,
}: Props) {
  return (
    <FloatingLabel
      label={label}
      editorId={id}
      className="w-100"
      editorValue={value}
    >
      <Input
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        required={required}
      />
    </FloatingLabel>
  );
}
