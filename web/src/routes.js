import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
import Employees from "./pages/Employees";
import Projects from "./pages/Projects";
import MacroActivities from "./pages/MacroActivities";
import Properties from "./pages/Properties";

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);
const IndexRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Redirect
            to={{ pathname: `/properties`, state: { from: props.location } }}
          />
        ) : (
          <Redirect
            to={{ pathname: "/signup", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <IndexRoute exact path="/" />

      <AuthRoute path="/signin" component={SignIn} />
      <AuthRoute path="/signup" component={SignUp} />

      <Route path="/undefined">
        <Redirect to="/" />
      </Route>

      <PrivateRoute path="/logout" component={Logout} />
      <PrivateRoute path="/properties" component={Properties} />
      <PrivateRoute path="/:property/dashboard" component={Dashboard} />
      <PrivateRoute path="/:property/machines" component={Machines} />
      <PrivateRoute path="/:property/employees" component={Employees} />
      <PrivateRoute path="/:property/projects" component={Projects} />
      <PrivateRoute
        path="/:property/:project/macrosActivities"
        component={MacroActivities}
      />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
