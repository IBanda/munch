import { Window } from '@progress/kendo-react-dialogs';
import { Dispatch } from 'react';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  height?: number;
  width?: number;
}

export interface ModalDispatch {
  setModal: Dispatch<React.SetStateAction<'hidden' | 'visible'>>;
}

export default function Modal({
  children,
  onClose,
  height,
  width = 315,
}: Props) {
  return (
    <Window
      className="m__modal"
      modal={true}
      draggable={false}
      minimizeButton={() => null}
      maximizeButton={() => null}
      onClose={onClose}
      height={height}
      width={width}
    >
      {children}
    </Window>
  );
}
