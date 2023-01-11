import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Workplace from "./components/Workplace"
import NotFoundPage from "./components/NotFoundPage"
import CreateWorkplace from './components/CreateWorkspace/createWorkplace';
import Splash from './components/SplashPage';
// import ChannelsIndex from './components/Channels/ChannelsIndex';
import Channel from './components/Channels/Header';
import Sidebar from './components/Channels/Sidebar';
import ChatBoxHeader from './components/Channels/ChatBoxHeader';
import MessageBox from './components/Channels/MessageBox';
import ChatMessages from './components/Channels/ChatMessages';

function App() {
  const currentUser = useSelector(state => state.session.user);
  const current = useSelector(state => state)
  
  
  return (
    <>
      {/* <Navigation /> */}
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

        <Route path="/:workplaceId/channels/:channelId">
          <Channel />
          <Sidebar />
          <ChatBoxHeader />
          <MessageBox />
          <ChatMessages />
        </Route>

        <Route path="/newWorkplace">
          <CreateWorkplace />
        </Route>


        <Route path="*" component={NotFoundPage} />
        <Route path="/">
          <Splash />
        </Route>

      </Switch>
    </>
  );
}

export default App;
