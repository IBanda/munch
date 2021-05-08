import { ListView } from '@progress/kendo-react-listview';
import { Place } from 'lib/interface';
import PlaceCard from './Card';
import { useDispatch } from './Context';

interface Props {
  data: Place[];
}

const RenderItem = (props: any) => {
  const { setId, setWindow } = useDispatch();
  const id = props.dataItem.place_id;
  return (
    <div
      className="mb-2"
      onClick={() => setWindow({ open: true, id })}
      onMouseOver={() => setId(id)}
      onMouseOut={() => setId('')}
    >
      <PlaceCard place={props.dataItem} />
    </div>
  );
};

export default function PlaceListView({ data }: Props) {
  return (
    <ListView data={data} item={RenderItem} className="m__places-listview" />
  );
}
