import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Main from './main/Main';
import { getToogleAction } from './toolbar/actions';
import { Toolbar } from './toolbar/Toolbar';


class App extends Component<any> {
  public render(): ReactNode {
    return (
      <div id="container">
        <BrowserRouter>
          <Toolbar toogle={this.props.toogle} />
          <Main sidebar={this.props.sidebar} />
        </BrowserRouter>
      </div>
    )
  }
}

export default connect<any, any>(
  (store: any) => ({ sidebar: store.sidebar }),
  dispatch => ({ toogle: () => dispatch(getToogleAction()) })
)(App);

