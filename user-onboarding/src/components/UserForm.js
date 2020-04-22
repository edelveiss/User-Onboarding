import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import "../App.css";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//import NativeSelect from "@material-ui/core/NativeSelect";
import MenuItem from "@material-ui/core/MenuItem";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup.string().email().required("Must include an email"),
  terms: yup.boolean().oneOf([true], "please agree to terms of use"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
  role: yup.string(),
  location: yup.string().min(5, "Needs to be a minimum of 5 characters."),
});

function UserForm(props) {
  const classes = useStyles();
  // const [position, setPosition] = useState("");
  // new state to set our post request
  const [post, setPost] = useState([]);

  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    terms: "",
    role: "",
    password: "",
    location: "",
  });

  // state for our errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    terms: "",
    role: "",
    password: "",
    location: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const validateChange = (e) => {
    // Reach will allow us to "reach" into the schema and test only one part.
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors,
        });
      });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        setPost(res.data);
        console.log("success", post);

        setFormState({
          name: "",
          email: "",
          terms: "",
          password: "",
          role: "",
          location: "",
        });
      })
      .catch((err) => {
        console.log(err.res);
      });
  };

  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={formSubmit}>
            {/*-------------------Name----------------------- */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formState.name}
              onChange={inputChange}
            />
            {errors.name.length > 0 ? (
              <p className="error" style={{ color: " red" }}>
                {errors.name}
              </p>
            ) : null}
            {/*8888888888888888888888888888888888888 */}
            {/*-------------------Role----------------------- */}
            <FormControl
              variant="outlined"
              className={classes.formControl}
              style={{ width: " 100%" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Role
              </InputLabel>
              <Select
                onChange={inputChange}
                style={{ width: " 100%" }}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={formState.role}
                // onChange={handleChange}
                label="Role"
                name="role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Project Manager"}>Project Manager</MenuItem>
                <MenuItem value={"Project Architect"}>
                  Project Architect
                </MenuItem>
                <MenuItem value={"UI/UX Designer"}>UI/UX Designer</MenuItem>
                <MenuItem value={"Web Developer"}>Web Developer</MenuItem>
                <MenuItem value={"QA Tester"}>QA Tester</MenuItem>
              </Select>
            </FormControl>
            {/**   </FormControl>*/}
            {/*8888888888888888888888888888888888888 */}
            {/*-------------------Location----------------------- */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              autoComplete="location"
              autoFocus
              value={formState.location}
              onChange={inputChange}
            />
            {errors.location.length > 0 ? (
              <p className="error" style={{ color: " red" }}>
                {errors.location}
              </p>
            ) : null}
            {/*-------------------Email----------------------- */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formState.email}
              onChange={inputChange}
            />
            {errors.email.length > 0 ? (
              <p className="error"> {errors.email}</p>
            ) : null}
            {/*-------------------Password----------------------- */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formState.password}
              onChange={inputChange}
            />
            {errors.password.length > 0 ? (
              <p className="error">{errors.password}</p>
            ) : null}
            {/*-------------------CheckBox----------------------- */}
            <FormControlLabel
              control={
                <Checkbox
                  type="checkbox"
                  //value="terms"
                  color="primary"
                  name="terms"
                  checked={formState.terms}
                  onChange={inputChange}
                />
              }
              label="Terms and Conditions"
            />
            {/*console.log("formState.terms", formState.terms)*/}
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={buttonDisabled}
            >
              Submit
            </Button>
            {/* 
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
*/}
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default UserForm;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        TatianaZ Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     "label + &": {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: "relative",
//     backgroundColor: theme.palette.background.paper,
//     border: "1px solid #ced4da",
//     fontSize: 16,
//     padding: "10px 26px 10px 12px",
//     transition: theme.transitions.create(["border-color", "box-shadow"]),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:focus": {
//       borderRadius: 4,
//       borderColor: "#80bdff",
//       boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
//     },
//   },
// }))(InputBase);
