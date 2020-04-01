import React from 'react'
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

import { Container, Title } from './styles.js';
import Board from '../components/board/board';
import Viewer from '../components/viewer/viewer';
import Login from '../components/login/login';

import { parseHash, getHashFromProps } from '../helpers/utils';

function getRoute(props) {

  if (props.viewer){
    return <Viewer />
  } else if (props.start){
    return <Board key={ props.unique_id } />
  }

  return <Login />
}

const App = (props) => {

  let data = parseHash(props.hash);

  if (!props.logged && data.name && data.room){
    props.dispatch({ type: 'LOGIN_URL_LOGGING', data:data });
  }
  
  if (props.owner === null){
    props.dispatch({ type: 'LOGIN_GET_ROOM_OWNER' });
  }

  let hash = getHashFromProps(props);
  props.dispatch(push(hash));

  return (
    <Container>
      <Title>RedTetris</Title>

      { getRoute(props) }

    </Container>
  );
}

const mapStateToProps = state => ({
  name      : state.login.name,
  room      : state.login.room,
  name_set  : state.login.name_set,
  room_set  : state.login.room_set,
  logged    : state.login.logged,
  start     : state.login.start,
  viewer    : state.login.viewer,
  unique_id : state.login.unique_id,
  owner     : state.login.owner,
  hash      : state.router.location.hash,
});

export default connect(mapStateToProps)(App);