import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import signUpUser from "./screens/signUpUser";
// import signInUser from "./screens/signInUser";
// import showAllUsers from "./screens/showAllUsers";
// import showSpecificUser from "./screens/showSpecificUser";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signUpUser" component={signUpUser} />
        {/* <Route exact path="/signInUser" component={signInUser} />
        <Route exact path="/showAllUsers" component={showAllUsers} />
        <Route
          exact
          path="/showSpecificUser/:id"
          component={showSpecificUser}
        /> */}
      </Switch>
    </Router>
  );
};
export default App;
