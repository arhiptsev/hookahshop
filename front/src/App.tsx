import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RxContext } from './context/rx-context';
import { Main } from './main/Main';
import { Container } from './styeld';
import { Toolbar } from './toolbar/Toolbar';
import { useObservable } from './utils/hooks/useObservable';

export const App = () => {
  const { sideBarObservable } = useContext(RxContext);
  const sideBarIsOpen = useObservable(sideBarObservable);

  return (
    <Container>
      <BrowserRouter>
        <Toolbar
          toogle={() => {
            sideBarObservable.next(!sideBarIsOpen);
          }}
        />
        <Main sidebar={sideBarIsOpen} />
      </BrowserRouter>
    </Container>
  );
};
