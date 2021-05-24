import { Skeleton } from '@progress/kendo-react-indicators';

export default function CardLoader(props: any) {
  return (
    <div data-testid="skeleton" className="d-flex w-100 mb-3 py-2 px-3">
      <div className="mr-1">
        <Skeleton
          shape="rectangle"
          style={{ width: 78, height: 70, borderRadius: 3 }}
        />
      </div>
      <div className="w-100">
        <Skeleton shape="text" style={{ width: '70%' }} />
        <Skeleton shape="text" style={{ width: '50%' }} />
        <Skeleton shape="text" style={{ width: '90%' }} />
      </div>
    </div>
  );
}
