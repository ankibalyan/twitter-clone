import { useEffect, useReducer, useRef } from 'react';

function useSetState(initialState) {
  const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), initialState);

  return [state, setState];
}

export default function useSafeSetState(initialState) {
  const [state, setState] = useSetState(initialState);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  const safeSetState = (...args) => mountedRef.current && setState(...args);

  return [state, safeSetState];
}
