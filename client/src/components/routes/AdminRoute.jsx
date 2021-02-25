import { Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from '../context/GlobalContext';

export const AdminRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(AppContext);
  const isAdmin = state.isAdmin;
  console.log(isAdmin)

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AdminRoute;