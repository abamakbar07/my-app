import React, { useContext, useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { PrivateRoute } from './components/routes/PrivateRoute'
import { AdminRoute } from './components/routes/AdminRoute'

import { API, setAuthToken } from './config/api'

import { AppContext } from './components/context/GlobalContext'
import { ModalContextProvider } from "./components/context/ModalContext";
import { CartContextProvider } from "./components/context/CartContext";

import NavigationBar from "./components/NavigationBar";

import LandingPage from "./pages/LandingPage/LandingPage";

import Dashboard from "./pages/PrivatePage/Dashboard/Dashboard";
import BookDetail from './pages/PrivatePage/BookDetail/BookDetail'
import Cart from "./pages/PrivatePage/Cart/Cart";
import Profile from './pages/PrivatePage/Profile/Profile'

import Transaction from "./pages/AdminPage/Transaction/Transaction";
import AddBook from "./pages/AdminPage/AddBook/AddBook";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [state, dispatch] = useContext(AppContext)
  const [style, setStyle] = useState({
    textAlign: "center",
    backgroundAttachment: "fixed",
    backgroundBlendMode: "normal",
    backgroundSize: "auto",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    backgroundColor: "#f3f3f3",
  });

  const styleBookDetail = () => {
    setStyle({
      ...state,
      backgroundBlendMode: "multiply"
    });
  }

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
    <ModalContextProvider>
      <CartContextProvider>
        <Router>
          <div className="App" style={style}>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute
                path="/book-detail/:id"
                exact
                component={BookDetail}
              />
              <PrivateRoute path="/cart" exact component={Cart} />
              <AdminRoute
                path="/admin/transaction"
                exact
                component={Transaction}
              />
              <AdminRoute path="/admin/add-book" exact component={AddBook} />
            </Switch>
            <NavigationBar
              className="appNavbar"
              isAdmin={state.isAdmin}
              isLogin={state.isLogin}
              pageTransaction={state.pageTransaction}
              user={state.user}
            />
            {/* <pre>
              {JSON.stringify(state.user)}
            </pre> */}
          </div>
        </Router>
      </CartContextProvider>
    </ModalContextProvider>
  );
}

export default App;
