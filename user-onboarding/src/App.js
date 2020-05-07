import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Home from "./components/Home";
import UserForm from "./components/UserForm";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

function App() {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        console.log("res", res.data.data);
        //   setUsers(res.data.data);

        setUsers(
          res.data.data.map((user) => {
            return {
              id: user.id,
              email: user.email,
              name: user.first_name + " " + user.last_name,
            };
          })
        );
      })
      .catch((err) => console.error("Data was not returned", err));
  }, []);

  const addUser = (user) => {
    // setUsers((users) => [...users, user]);
    setUsers((users) => [
      ...users,
      {
        ["id"]: users.length + 1,
        ["name"]: user.name,
        ["email"]: user.email,
        ["location"]: user.location,
        ["terms"]: user.terms,
        ["password"]: user.password,
        ["role"]: user.role,
      },
    ]);
  };
  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Our Users
            </Typography>
            <Link to="/">
              <Button
                color="inherit"
                style={{ color: "white", fontSize: "1.1rem" }}
              >
                Home
              </Button>
            </Link>
            <Link to="/registration">
              <Button
                color="inherit"
                style={{ color: "white", fontSize: "1.1rem" }}
              >
                Sing Up
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>

      <Switch>
        <Route path="/registration">
          <UserForm users={users} setUsers={setUsers} addUser={addUser} />
        </Route>

        <Route path="/">
          <Home users={users} setUsers={setUsers} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
