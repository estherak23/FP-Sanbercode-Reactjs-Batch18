import React, {useContext} from "react"
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../pages/home"
import Login from "../auth/login"
import Register from "../auth/register"
import ChangePassword from "../auth/ChangePassword"
import Movies from "../pages/movie"
import MoviesCreate from "../movies/MoviesCreate"
import MoviesEditor from "../movies/MoviesEdit"
import Games from "../pages/games"
import GamesCreate from "../games/GamesCreate"
import GamesEditor from "../games/GamesEdit"
import {UserContext} from "../userContext/userContext"


const Section = () => {

  const [user] = useContext(UserContext);

  const PrivateRoute = ({user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({user, ...props }) =>
  user ? <Redirect to="/" /> : <Route {...props} />;

  return(    
    <section >
      <Switch>
        <Route exact path="/" user={user} component={Home}/>
        <Route exact path="/movie/:id" user={user} component={Movies}/>
        <Route exact path="/game/:id" user={user} component={Games}/>
        <PrivateRoute exact path="/movies-editor" user={user} component={MoviesEditor}/>
        <PrivateRoute exact path="/movies-create" user={user} component={MoviesCreate}/>
        <PrivateRoute exact path="/games-editor" user={user} component={GamesEditor}/>
        <PrivateRoute exact path="/games-create" user={user} component={GamesCreate}/>
        <PrivateRoute exact path="/change-password" user={user} component={ChangePassword}/>
        <LoginRoute exact path="/register" user={user} component={Register}/>
        <LoginRoute exact path="/login" user={user} component={Login}/>
      </Switch>
    </section>
  )
}

export default Section