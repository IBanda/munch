import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Checkbox, Input } from '@progress/kendo-react-inputs';
import { DrawerItem, DrawerItemProps } from '@progress/kendo-react-layout';
import cuisines from '../cusine.json';
const diningOptions = ['Indoor', 'Outdoor'];
export default function Filters(props: DrawerItemProps) {
  return (
    <DrawerItem {...props}>
      <div className="m__filter-dropdowns   h-100">
        <Input placeholder="Name" className="mb-4 w-100" />
        <DropDownList
          className="mb-4 w-100"
          data={cuisines.types}
          defaultItem="Cuisine"
        />
        <DropDownList
          data={diningOptions}
          defaultItem="Dining Options"
          className="mb-4 w-100"
        />
        <div className="mb-4">
          <Checkbox color="success" label="Open now" />
        </div>

        <Button className="btn-sm mt-2" primary={true}>
          Search
        </Button>
      </div>
    </DrawerItem>
  );
}
