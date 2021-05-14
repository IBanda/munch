import Filters from 'components/Filters';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import Layout from 'components/Layout';
import { useState } from 'react';
import useBodyOverflow from 'lib/useBodyOverflow';

interface Props {
  children: React.ReactNode;
}

export default function PlacesContainer({ children }: Props) {
  const [expanded, setExpanded] = useState(false);
  useBodyOverflow(expanded);
  return (
    <Layout className="p-0 h-100" fluid>
      <div
        style={{ height: 50 }}
        className="border-bottom py-2 px-2 d-flex justify-content-end"
      >
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