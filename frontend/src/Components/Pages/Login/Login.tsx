import "./Login.css";
import { NavLink,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { UserCredentials } from "../../../Models/credentials-model";
import notify from "../../../Utils/Notify";
import { Avatar,Button,TextField,IconButton,InputAdornment,Grid,Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAppDispatch } from "../../../redux/store"
import { googleLoginAsync, loginAsync } from "../../../redux/auth-slice";

function Login(): JSX.Element {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    /* global google */
    /*@ts-ignore*/
    google.accounts.id.initialize({
      client_id: "52640252805-7lhae7grtmjj2atnb1555vmk41e001i5.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    /*@ts-ignore*/
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size:"large"}
    );
  },[])


  const {
      register,
      handleSubmit,
      formState: { errors },
      trigger,
  } = useForm<UserCredentials>();

  const handleCallbackResponse = async (response:any) =>{
    const token = response.credential;
    dispatch(googleLoginAsync({token, successCallback: loginSuccess}));
  }

  const send = async (userCred: UserCredentials) =>{
    dispatch(loginAsync({...userCred, successCallback: loginSuccess}));
  }

  const loginSuccess = (firstName: string) =>{
    notify.success("Welcome " + firstName);
    navigate("/");
  }

  return (
      <div className="Login">
        <div className="loginBox">
          <form onSubmit={handleSubmit(send)}>
              <div className="headerBox">
                <Avatar sx={{ m: 2, bgcolor: "secondary.main"} }>
                  <LockOutlinedIcon />
                </Avatar>
              </div>

              <Typography component="h1" variant="h5" textAlign={"center"}>
                Sign in
              </Typography>

              <TextField
                  margin="normal"
                  fullWidth
                  label="Email Address"

                  {... register("user_name",{
                    required: "* Email is required!",
                    pattern:{
                            value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i ,
                            message: "* Invalid Email Format"
                    }
                  })}
                  onBlur={() => trigger("user_name")}
                  error={!!errors.user_name}
                  helperText={errors.user_name?.message}
                />

              <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  type={!showPassword ? "password" : "text"}

                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}

                  {... register("password",{
                    required: "* Password is required!",
                    minLength:{
                        value: 6,
                        message: "* At least 6 chars!"
                    }
                  })}
                  onBlur={() => trigger("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>

              <div id="signInDiv"></div>

              <Grid container>
                <Grid item>
                  <NavLink to="/Register">
                     <Button>Don't have an account? Sign Up</Button>
                  </NavLink>
                </Grid>
              </Grid>
          </form>
        </div>
      </div>
    );
  }

export default Login;
