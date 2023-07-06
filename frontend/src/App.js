import { Switch } from 'react-router-dom';
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
import { getCurrentUser } from './store/session';
import { AboutPage } from './components/AboutPage/AboutPage';


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

          {/* <ProtectedRoute exact path="/event/edit" component={EventEditPage} /> */}
          <ProtectedRoute exact path="/event/new" component={EventForm} />
          <ProtectedRoute exact path="/profile/:id" component={ProfilePage} />
          <ProtectedRoute exact path="/event/:id" component={EventsShow} />
          <ProtectedRoute exact path="/about" component={AboutPage} />


          {/* <AuthRoute exact path="/event/:id" component={EventsShow} /> */}
          <AuthRoute exact path="/signup" component={SignupForm} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/about" component={AboutPage} />
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
