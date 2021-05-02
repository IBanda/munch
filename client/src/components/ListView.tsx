import { ListView } from '@progress/kendo-react-listview';
import { Place } from 'lib/interface';
import PlaceCard from './Card';

interface Props {
  data: { places: Place[] };
}

const RenderItem = (props: any) => {
  return (
    <div className="mb-2">
      <PlaceCard place={props.dataItem} />
    </div>
  );
};

export default function PlaceListView({ data }: Props) {
  return <ListView data={data.places} item={RenderItem} />;
}
