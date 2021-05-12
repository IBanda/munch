import { memo, useRef, useState } from 'react';
import { SvgIcon } from '@progress/kendo-react-common';
import { useAppState } from './Context';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { mapMarkerTargetIcon } from '@progress/kendo-svg-icons';

interface MarkerProps {
  openTooltip?: boolean;
  id: string;
  name: string;
  open: boolean | null;
  setWindow?: React.SetStateAction<any>;
  lat?: number;
  lng?: number;
}

function Marker({ openTooltip, name, open, setWindow, id }: MarkerProps) {
  const marker = useRef<HTMLDivElement>(null);
  const [shouldOpenTooltip, setTooltipState] = useState(false);
  const isUnknown = open == null;

  return (
    <Tooltip
      open={openTooltip || shouldOpenTooltip}
      anchorElement="target"
      targetElement={marker.current}
      openDelay={50}
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
          themeColor={!isUnknown ? (open ? 'success' : 'error') : 'primary'}
          size="medium"
        />
      </div>
    </Tooltip>
  );
}

const MemoMarker = memo(Marker);

export default function PlaceMarker({ id: placeId, name, open }: MarkerProps) {
  const { id, setWindow } = useAppState();
  return (
    <MemoMarker
      openTooltip={placeId === id}
      id={placeId}
      name={name}
      open={open}
      setWindow={setWindow}
    />
  );
}
