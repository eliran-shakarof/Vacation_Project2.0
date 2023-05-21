import "./Login.css";
import { NavLink,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { UserCredentials } from "../../../Models/credentials-model";
import notify from "../../../Utils/Notify";
import { Avatar,Button,TextField,IconButton,InputAdornment,Grid,Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAppDispatch } from "../../../redux/store"
import { loginAsync } from "../../../redux/auth-slice";


function Login(): JSX.Element {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
      register,
      handleSubmit,
      formState: { errors },
      trigger,
  } = useForm<UserCredentials>();

 
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
               {/* {errors.user_name && <p className="myInvalidColor">{errors.user_name.message}</p>} */}

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
              {/* {errors.password && <p className="myInvalidColor">{errors.password.message}</p>} */}

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>

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
