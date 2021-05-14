import { FormEvent, useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import {
  DropDownList,
  DropDownListChangeEvent,
} from '@progress/kendo-react-dropdowns';
import { Checkbox, Input } from '@progress/kendo-react-inputs';
import { DrawerItem, DrawerItemProps } from '@progress/kendo-react-layout';
import cuisines from '../cusine.json';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import { FloatingLabel } from '@progress/kendo-react-labels';
import useQueryParams from 'lib/useQueryParams';
const diningOptions = ['Indoor', 'Outdoor'];

function getInitialState(params: URLSearchParams, key: string) {
  return params.get(key) || '';
}

export default function Filters(props: DrawerItemProps) {
  const params = useQueryParams();
  const [text, setText] = useState(getInitialState(params, 'keyword'));
  const [cuisine, setCuisine] = useState(getInitialState(params, 'cuisine'));
  const [dining, setDinningOptions] = useState(
    getInitialState(params, 'dining')
  );
  const [open, setOpen] = useState(() => {
    const init = getInitialState(params, 'open');
    if (init) {
      return init === 'true' ? true : false;
    }
    return true;
  });

  const history = useHistory();
  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const params = {
      keyword: text,
      cuisine,
      dining,
      open,
    };
    history.push(
      `/?${qs.stringify(params, { skipEmptyString: true, skipNull: true })}`
    );
  };
  return (
    <DrawerItem {...props}>
      <form onSubmit={onSearch} className="m__filter-dropdowns   h-100">
        <FloatingLabel
          label="Keywords"
          editorId={'text'}
          className="mb-2 w-100 "
          editorValue={text}
        >
          <Input value={text} onChange={(e) => setText(e.value)} id="text" />
        </FloatingLabel>

        <DropdownWithLabel
          label={'Cuisine'}
          id="cuisine"
          value={cuisine}
          data={cuisines.types}
          onChange={(e) => setCuisine(e.value)}
        />
        <DropdownWithLabel
          label={'Dining options'}
          id="dining"
          value={dining}
          data={diningOptions}
          onChange={(e) => setDinningOptions(e.value)}
        />
        <div className="mb-2">
          <Checkbox
            value={open}
            onChange={(e) => setOpen(e.value)}
            color="success"
            label="Open now"
          />
        </div>

        <Button type="submit" className="btn-sm mt-2" primary={true}>
          Search
        </Button>
      </form>
    </DrawerItem>
  );
}

interface DropdownWithLabelProps {
  value: string;
  id: string;
  data: string[];
  label: string;
  onChange: (e: DropDownListChangeEvent) => void;
}

function DropdownWithLabel({
  value,
  id,
  data,
  onChange,
  label,
}: DropdownWithLabelProps) {
  return (
    <FloatingLabel
      label={label}
      className="mb-2 w-100"
      editorId={id}
      editorValue={value}
    >
      <DropDownList value={value} onChange={onChange} data={data} id={id} />
    </FloatingLabel>
  );
}
