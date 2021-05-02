import { ListView } from '@progress/kendo-react-listview';
import { Place } from 'lib/interface';
import PlaceCard from './Card';
import { useDispatch } from './Context';

interface Props {
  data: { places: Place[] };
}

const RenderItem = (props: any) => {
  const setId = useDispatch();
  return (
    <div
      className="mb-2"
      onMouseOver={() => setId(props.dataItem.place_id)}
      onMouseOut={() => setId('')}
    >
      <PlaceCard place={props.dataItem} />
    </div>
  );
};

export default function PlaceListView({ data }: Props) {
  return <ListView data={data.places} item={RenderItem} />;
}
