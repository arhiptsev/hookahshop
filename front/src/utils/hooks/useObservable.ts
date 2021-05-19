import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export const useObservable = <T = any>(observable: Observable<T>) => {

  const [state, setState] = useState<T>();

  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
};
