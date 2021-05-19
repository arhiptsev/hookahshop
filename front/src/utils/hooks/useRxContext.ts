import { useContext, useEffect, useState } from 'react';
import { Observable } from 'rxjs';
import { GlobalObservables, RxContext } from '../../context/rx-context';
import { useObservable } from './useObservable';

type PropType<TProp extends keyof GlobalObservables> = GlobalObservables[TProp];
type TypeWithGeneric<T> = T[]
type ExtractGeneric<Type> = Type extends TypeWithGeneric<infer X> ? X : never

type useRxContextType = <T extends keyof GlobalObservables>(observable: T) => ExtractGeneric<PropType<T>>;

export const useRxContext = <T extends keyof GlobalObservables>(observable: T) => {

  // const context = useContext(RxContext)

  // const observ: GlobalObservables[T] = context[observable];

  // const observableValue = useObservable(observ as Observable<any>);

  // const observableValue: ExtractGeneric<PropType<T>>;


  // return observableValue as ExtractGeneric<GlobalObservables[T]>;
};
