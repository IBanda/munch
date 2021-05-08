import { useEffect } from 'react';

export default function useBodyOverflow(open: boolean) {
  useEffect(() => {
    if (open) {
      return document.body.classList.add('m__overflow-hidden');
    }
    document.body.classList.remove('m__overflow-hidden');
  }, [open]);
}
