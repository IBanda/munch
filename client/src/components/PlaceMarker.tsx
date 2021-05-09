import { memo, useRef, useState } from 'react';
import { SvgIcon } from '@progress/kendo-react-common';
import { useAppState } from './Context';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { mapMarkerTargetIcon } from '@progress/kendo-svg-icons';

interface Props {
  openTooltip: boolean;
  id: string;
  name: string;
  open: boolean;
  setWindow: any;
}

function Marker({ openTooltip, name, open, setWindow, id }: Props) {
  const marker = useRef<HTMLDivElement>(null);
  const [shouldOpenTooltip, setTooltipState] = useState(false);
  return (
    <Tooltip
      open={openTooltip || shouldOpenTooltip}
      anchorElement="target"
      targetElement={marker.current}
      openDelay={50}
      className="relative"
      position="top"
      tooltipClassName="m__marker-tooltip"
    >
      <div
        ref={marker}
        onClick={() => setWindow({ open: true, id })}
        onMouseOver={() => setTooltipState(true)}
        onMouseOut={() => setTooltipState(false)}
        title={name}
        className={`m__marker ${openTooltip ? 'z-index-2' : ''}`}
      >
        <SvgIcon
          style={{ width: 25, height: 25 }}
          className="mt-n1"
          icon={mapMarkerTargetIcon}
          themeColor={open ? 'success' : 'error'}
          size="medium"
        />
      </div>
    </Tooltip>
  );
}

const MemoMarker = memo(Marker);

export default function PlaceMarker(props: any) {
  const { id, setWindow } = useAppState();
  return (
    <MemoMarker
      openTooltip={props.placeId === id}
      id={props.placeId}
      name={props.name}
      open={props.open}
      setWindow={setWindow}
    />
  );
}
