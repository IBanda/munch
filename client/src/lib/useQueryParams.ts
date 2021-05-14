import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export default function useQueryParams() {
  const qs = useLocation().search;
  return useMemo(() => new URLSearchParams(qs), [qs]);
}
