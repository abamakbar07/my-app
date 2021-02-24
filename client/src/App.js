import React, { useContext, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';

import { PrivateRoute } from './components/routes/PrivateRoute'
import { AdminRoute } from './components/routes/AdminRoute'
import { API, setAuthToken } from './config/api'
import { AppContext } from './components/context/GlobalContext'

import Dashboard from './pages/Dashboard/Dashboard'
import BookDetail from './pages/PrivatePage/BookDetail/BookDetail'
import Profile from './pages/PrivatePage/Profile/Profile'
import Cart from "./pages/PrivatePage/Cart/Cart";
import Transaction from "./pages/AdminPage/Transaction/Transaction";
import AddBook from "./pages/AdminPage/AddBook/AddBook";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [state, dispatch] = useContext(AppContext)

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      dispatch({
        type: "USER_LOADED",
        payload: response.data.data.user,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: "AUTH_ERROR",
      });
    }
  };
  
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <PrivateRoute path="/home" exact component={Dashboard} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/book-detail" exact component={BookDetail} />
          <PrivateRoute path="/cart" exact component={Cart} />
          <AdminRoute path="/admin/transaction" exact component={Transaction} />
          <AdminRoute path="/admin/add-book" exact component={AddBook} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
