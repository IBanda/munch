import { ListView } from '@progress/kendo-react-listview';
import { Place } from 'lib/interface';
import PlaceCard from './Card';
import CardLoader from './CardLoader';
import { useDispatch } from './Context';

interface Props {
  data: Place[];
  loading: boolean;
}

const RenderItem = (props: any) => {
  const { setId, setWindow } = useDispatch();
  const id = props.dataItem.place_id;
  return (
    <button
      className="mb-2 w-100 bg-transparent border-0 p-0 text-left m__outline-none"
      onClick={() => setWindow({ open: true, id })}
      onMouseOver={() => setId(id)}
      onMouseOut={() => setId('')}
    >
      <PlaceCard place={props.dataItem} />
    </button>
  );
};

export default function PlaceListView({ data, loading }: Props) {
  return (
    <ListView
      data={data}
      item={!loading ? RenderItem : CardLoader}
      className="m__places-listview p-0"
    />
  );
}
