import { memo, useRef } from 'react';
import { SvgIcon } from '@progress/kendo-react-common';
import { useAppState } from './Context';
import { Tooltip } from '@progress/kendo-react-tooltip';

interface Props {
  openTooltip: boolean;
  name: string;
  open: boolean;
}

function Marker({ openTooltip, name, open }: Props) {
  const marker = useRef<HTMLDivElement>(null);
  return (
    <Tooltip
      open={openTooltip}
      anchorElement="target"
      targetElement={marker.current}
      openDelay={50}
      className="relative"
      position="top"
      tooltipClassName="m__marker-tooltip"
    >
      <div
        ref={marker}
        title={name}
        className={`${open ? 'bg-success' : 'bg-danger'} ${
          openTooltip ? 'z-index-2' : ''
        } m__marker`}
      >
        <SvgIcon
          style={{ width: 15, height: 15 }}
          size="medium"
          themeColor="light"
        >
          <g>
            <title>background</title>
            <rect
              fill="none"
              id="canvas_background"
              height="10"
              width="20"
              y="-1"
              x="-1"
            />
          </g>
          <g>
            <title>Layer 1</title>
            <path
              id="svg_1"
              d="m23,19l-3.328,-3.232c-0.433,-0.495 -0.672,-1.131 -0.672,-1.788l0,-1.98c0,-4.945 3.157,-9.535 3.157,-9.535l0.843,0.534l0,16.001z"
            />
            <circle id="svg_2" r="1" cy="3" cx="23" />
            <path
              id="svg_3"
              d="m24,3l-2,0l-1,10l0,13.5c0,0.828 0.672,1.5 1.5,1.5l0,0c0.828,0 1.5,-0.672 1.5,-1.5l0,-23.5z"
            />
            <path
              id="svg_4"
              d="m13.087,2.445c-0.05,-0.259 -0.276,-0.445 -0.539,-0.445c-0.303,0 -0.548,0.245 -0.548,0.548l0,5.807c0,0.356 -0.289,0.645 -0.645,0.645c-0.329,0 -0.605,-0.247 -0.641,-0.574l-0.66,-5.939c-0.031,-0.277 -0.265,-0.487 -0.545,-0.487l-0.009,0l-0.009,0c-0.28,0 -0.514,0.21 -0.545,0.488l-0.66,5.939c-0.036,0.326 -0.312,0.573 -0.641,0.573c-0.356,0 -0.645,-0.289 -0.645,-0.645l0,-5.807c0,-0.303 -0.245,-0.548 -0.548,-0.548c-0.263,0 -0.489,0.186 -0.539,0.445c-0.242,1.268 -0.913,4.917 -0.913,6.555c0,4 3,5 3,5l0,12.5c0,0.828 0.672,1.5 1.5,1.5s1.5,-0.672 1.5,-1.5l0,-12.5c0,0 3,-1 3,-5c0,-1.638 -0.671,-5.287 -0.913,-6.555z"
            />
          </g>
        </SvgIcon>
      </div>
    </Tooltip>
  );
}

const MemoMarker = memo(Marker);

export default function PlaceMarker(props: any) {
  const globalId = useAppState();
  return (
    <MemoMarker
      openTooltip={props.placeId === globalId}
      name={props.name}
      open={props.open}
    />
  );
}
