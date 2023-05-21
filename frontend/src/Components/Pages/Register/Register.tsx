import "./Register.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { User } from "../../../Models/user";
import notify from "../../../Utils/Notify";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, Button, Grid, TextField, IconButton, InputAdornment,Typography } from "@mui/material";
import { useAppDispatch } from "../../../redux/store";
import { registerAsync } from "../../../redux/auth-slice";


function RegisterPage(): JSX.Element {
    const [showPassword, setShowPassword] = useState<Boolean>(false)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        trigger,
      } = useForm<User>();

    let password = watch("password", "");
  

    const send = async (newUser: User) => {
        delete newUser.confirmPassword;
        newUser.unique_id = "";
        newUser.role = 0;
        dispatch(registerAsync({...newUser, successCallback: registerSuccess}));
    }

    const registerSuccess = (firstName: string) =>{
        notify.success("Welcome " + firstName);
        navigate("/");
    }


    return (
        <div className="Register registerBox">
            <form onSubmit={handleSubmit(send)}>

                <div className="headerBox">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                </div>

                <Typography component="h1" variant="h5" sx={{mb:3}} textAlign={"center"}>
                    Sign up
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"

                            inputProps={{ maxLength: 20 }}
                            {...register("first_name",{
                                required: "* First name is required!",
                                minLength: {
                                    value: 2,
                                    message: "* Minimum 2 chars"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "* Less than 20 chars!"
                                }
                            })}
                            onBlur={() => trigger("first_name")}
                            error={!!errors.user_name}
                            helperText={errors.user_name?.message}
                        />
                        {/* {errors.first_name && <p className="myInvalidColor">{errors.first_name.message}</p>} */}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            inputProps={{ maxLength: 20 }}

                            {...register("last_name",{
                                required: "* Last name is required!",
                                minLength: {
                                    value: 2,
                                    message: "* Minimum 2 chars"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Last name need to be less than 20 chars!"
                                }
                            })}
                            onBlur={() => trigger("last_name")}
                            error={!!errors.last_name}
                            helperText={errors.last_name?.message}
                        />
                        {/* {errors.last_name && <p className="myInvalidColor">{errors.last_name.message}</p>} */}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="email"
                            label="Email Address"

                            inputProps={{ maxLength: 50 }}
                            {...register("user_name",{
                                    required: "* Email is required!",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
                                        message: "* Invalid Email Format"
                                    }
                                })}
                                onBlur={() => trigger("user_name")}
                                error={!!errors.user_name}
                                helperText={errors.user_name?.message}
                        />
                        {/* {errors.user_name && <p className="myInvalidColor">{errors.user_name.message}</p>} */}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
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

                            {...register("password",{
                                required: "* Password is required!",
                                minLength: {
                                    value: 2,
                                    message: "Last name need to be more than 2 chars!"
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Last name need to be less than 100 chars!"
                                }
                            })}
                            onBlur={() => trigger("password")}   
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        {/* {errors.password && <p className="myInvalidColor">{errors.password.message}</p>} */}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            
                            {...register("confirmPassword",{
                                    validate: (value: any) =>
                                    value === password ? undefined : "* The passwords do not match!"
                            })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />
                        {/* {errors.confirmPassword && <p className="myInvalidColor">{errors.confirmPassword.message}</p>} */}
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>

                <Grid container justifyContent="flex-start">
                    <Grid item>
                        <NavLink to="/Login">
                            <Button>Already have an account? Sign in</Button>
                        </NavLink>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default RegisterPage;
