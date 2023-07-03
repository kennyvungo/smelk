import { Switch } from 'react-router-dom';
import { AuthRoute } from './components/Routes/Routes';
// import { Route, Redirect } from 'react-router-dom';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Switch>

        {/* <ProtectedRoute exact path="/event/edit" component={EventEditPage} /> */}
        {/* <ProtectedRoute exact path="/event/new" component={EventFormPage} /> */}
        {/* <ProtectedRoute exact path="/profile/:id" component={UserShowPage} /> */}

        {/* <AuthRoute exact path="/event/:id" component={EventShowPage} /> */}
        <AuthRoute exact path="/signup" component={SignupForm} />
        <AuthRoute exact path="/login" component={LoginForm} />
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
