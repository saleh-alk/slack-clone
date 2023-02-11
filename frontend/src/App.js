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
import Header from './components/Channels/Header';
import Channel from './components/Channels/Channel';
import Sidebar from './components/Channels/Sidebar';
import ChatBoxHeader from './components/Channels/ChatBoxHeader';
import MessageBox from './components/Channels/MessageBox';
import ChatMessages from './components/Channels/ChatMessages';
import ChannelModal from './components/Channels/ChannelModal';
import JoinWorkplace from './components/JoinWorkplace';
import Messaging from './components/Messaging/Messaging';

function App() {
  const currentUser = useSelector(state => state.session.user);
  const current = useSelector(state => state)
  
  
  return (
    <>
      
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

        <Route path="/messaging/:workplaceId/channels/:channelId">
            <Messaging />
        </Route>

        <Route path="/:workplaceId/channels/:channelId">
          <Header />
          <Channel />
  
          
        </Route>

        <Route path="/newWorkplace">
          <CreateWorkplace />
        </Route>
        <Route path="/joinWorkplace">
          <JoinWorkplace />
        </Route>


        <Route path="/">
          <Splash />
        </Route>
        
        <Route path="*" component={NotFoundPage} />

      </Switch>
    </>
  );
}

export default App;
