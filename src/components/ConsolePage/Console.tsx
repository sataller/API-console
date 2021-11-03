import React from 'react';
import {logOut} from '../../api/api';
import {useHistory} from 'react-router-dom';

const Console = () => {
  const history = useHistory();
  const onLogoutClick = () => {
    history.push(`/login`);
    logOut();
  }
  return (
    <div>
      Console
      <button onClick={onLogoutClick}>jagsfjhghjdgf</button>
    </div>
  );
};

export default Console;