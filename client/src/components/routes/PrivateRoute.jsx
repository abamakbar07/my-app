import { Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from '../context/GlobalContext';

export const PrivateRoute = ({component : Component, ...rest}) => {
  const [state, dispatch] = useContext(AppContext);
  const isLogin = state.isLogin;
  if (!isLogin) {
    dispatch({
      type: "SET_LOGIN_REQUIRE",
      payload: {
        loginRequire: true,
      }
    })
  }

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