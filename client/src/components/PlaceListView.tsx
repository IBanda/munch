import { ListView, ListViewEvent } from '@progress/kendo-react-listview';
import { Place } from 'lib/interface';
import PlaceCard from './Card';
import CardLoader from './CardLoader';
import { useDispatch } from './Context';

interface Props {
  data: Place[];
  loading: boolean;
  loadMore: (event: ListViewEvent) => void;
}

const RenderItem = (props: any) => {
  const { setId, setWindow } = useDispatch();
  const id = props.dataItem.place_id;
  return (
    <button
      data-testid="place"
      className="mb-2 w-100 bg-transparent border-0 p-0 text-left m__outline-none"
      onClick={() => setWindow?.({ open: true, id })}
      onMouseOver={() => setId?.(id)}
      onMouseOut={() => setId?.('')}
    >
      <PlaceCard place={props.dataItem} />
    </button>
  );
};

export default function PlaceListView({ data, loading, loadMore }: Props) {
  if (!loading && !data?.length) return <p>No results match your search</p>;
  return (
    <ListView
      onScroll={loadMore}
      data={data}
      item={!loading ? RenderItem : CardLoader}
      className="m__places-listview p-0 h-100"
    />
  );
}
