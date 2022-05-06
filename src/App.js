
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Navbar from './components/navbar/Navbar';
import Register from './pages/Register/Register';
import Login from './pages/Register/Login';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login} />
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/profile' component={Profile} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
