import { Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from '../context/GlobalContext';

export const PrivateRoute = ({component : Component, ...rest}) => {
  const [state] = useContext(AppContext);
  const isLogin = state.isLogin;
  console.log(isLogin)

  return (
    <Route
      {...rest}
      render={(props) => 
        isLogin ? <Component {...props} /> : <Redirect to="/"/>
      } 
    />
  );
};

export default PrivateRoute;