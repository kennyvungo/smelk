import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
// import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import NavBar from './components/NavBar/NavBar';
import ProfilePage from './components/ProfilePage/ProfilePage';
import EventsShow from './components/Events/EventsShow';
import EventForm from './components/Events/Eventform';
import EventIndex from './components/Events/EventIndex';
import EventEdit from './components/Events/EventEdit';
import { getCurrentUser } from './store/session';
import { AboutPage } from './components/AboutPage/AboutPage';
import Sidebar from './components/SideBar/SideBar';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return  (
    <>
      <NavBar />
        <Switch>

          <ProtectedRoute exact path="/event/edit/:eventId" component={EventEdit} />
          <ProtectedRoute exact path="/event/new" component={EventForm} />
          <ProtectedRoute exact path="/profile/:id" component={ProfilePage} />
          <Route exact path="/event/:id" component={EventsShow} />
          <ProtectedRoute exact path="/events" component={EventIndex} />
          <ProtectedRoute exact path="/events" component={Sidebar} />
          <Route exact path="/about" component={AboutPage} />


          {/* <AuthRoute exact path="/event/:id" component={EventsShow} /> */}
          <AuthRoute exact path="/signup" component={SignupForm} />
          <AuthRoute exact path="/login" component={LoginForm} />
          {/* <AuthRoute exact path="/about" component={AboutPage} /> */}
          <AuthRoute exact path="/" component={MainPage} />

          {/* <Route>
            <Redirect to="/" />
          </Route> */}

        </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default App;
