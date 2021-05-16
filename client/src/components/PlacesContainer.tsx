import Filters from 'components/Filters';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import Layout from 'components/Layout';
import { useState } from 'react';
import useBodyOverflow from 'lib/useBodyOverflow';
import useQueryParams from 'lib/useQueryParams';
import { useHistory } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export default function PlacesContainer({ children }: Props) {
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const params = useQueryParams();
  const hasParams = Boolean(Array.from(params.keys()).length);
  useBodyOverflow(expanded);

  return (
    <Layout className="p-0 h-100" fluid>
      <div
        style={{ height: 50 }}
        className="border py-2 px-2 d-flex justify-content-end"
      >
        {hasParams ? (
          <Button
            onClick={() => history.push('/places')}
            className="btn-sm mr-2"
            icon="close"
            look="outline"
          >
            Clear
          </Button>
        ) : null}
        <Button
          onClick={() => setExpanded((p) => !p)}
          primary={true}
          className="btn-sm"
          icon={`${expanded ? 'close' : 'filter'}`}
        >
          Filter
        </Button>
      </div>
      <Drawer
        className={`m__drawer-container ${expanded ? 'expanded' : ''}`}
        position="end"
        mode="push"
        expanded={expanded}
        item={Filters}
        items={[{}]}
        width={300}
      >
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </Layout>
  );
}
