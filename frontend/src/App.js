import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Workplace from "./components/Workplace"
import NotFoundPage from "./components/NotFoundPage"
import CreateWorkplace from './components/Messages/createWorkplace';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/workplace">
            <Workplace />
        </Route>
        <Route path="/newWorkplace">
          <CreateWorkplace />
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default App;
