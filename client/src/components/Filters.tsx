import { FormEvent, useEffect, useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DrawerItem, DrawerItemProps } from '@progress/kendo-react-layout';
import cuisines from '../cusine.json';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import useQueryParams from 'lib/useQueryParams';
import { Input } from '@progress/kendo-react-inputs';
const diningOptions = ['Indoor', 'Outdoor'];

function getInitialState(params: URLSearchParams, key: string) {
  return params.get(key) || '';
}

export default function Filters(props: DrawerItemProps) {
  const params = useQueryParams();
  const [text, setText] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dining, setDinningOptions] = useState('');

  useEffect(() => {
    setText(getInitialState(params, 'keyword'));
    setCuisine(getInitialState(params, 'cuisine'));
    setDinningOptions(getInitialState(params, 'dining'));
  }, [params]);

  const history = useHistory();
  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const params = {
      keyword: text,
      cuisine,
      dining,
    };
    history.push(
      `/?${qs.stringify(params, {
        skipEmptyString: true,
        skipNull: true,
      })}`
    );
  };
  return (
    <DrawerItem {...props}>
      <form onSubmit={onSearch} className="m__filter-dropdowns   h-100">
        <Input
          label="Keywords"
          id="keywords"
          value={text}
          onChange={(e) => setText(e.value)}
        />
        <DropDownList
          label={'Cuisine'}
          id="cuisine"
          value={cuisine}
          data={cuisines.types}
          onChange={(e) => setCuisine(e.value)}
        />
        <DropDownList
          label={'Dining options'}
          id="dining"
          value={dining}
          data={diningOptions}
          onChange={(e) => setDinningOptions(e.value)}
        />

        <Button type="submit" className="btn-sm mt-2" primary={true}>
          Search
        </Button>
      </form>
    </DrawerItem>
  );
}
