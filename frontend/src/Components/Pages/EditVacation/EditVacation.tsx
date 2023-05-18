import "./EditVacation.css";
import { useState, useEffect } from "react";
import { Vacation } from "../../../Models/vacation";
import { useForm } from "react-hook-form";
import {Typography,TextField,Button,Grid} from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import notify from "../../../Utils/Notify";
import { selectUserState, userRole } from "../../../redux/user-slice";
import { useNavigate } from "react-router-dom";
import { editVacationAsync } from "../../../redux/vacation-slice";


function EditVacation(props:any): JSX.Element {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(selectUserState);
    const navigate = useNavigate();

    const [file, setFile] = useState();
    
    useEffect(() => {
        if (userState.userRole !== userRole.User) {
            navigate("/")
        }
    }, [navigate,userState]);
    
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<Vacation>();

    const checkVacationDetails = (vacation: Vacation) =>{
        if((new Date(vacation.start_date) > new Date(vacation.end_date))){
            return "The start date cannot be after the end date!";
        }
        return "";
    }

    const send = async (updateVacation: Vacation) => {  
        let updateVacationError:string = checkVacationDetails(updateVacation);
        if(updateVacationError === ""){
                updateVacation.vacation_id = props.vacationDetails.vacation_id;
                updateVacation.image = file;
                updateVacation.imageName = props.vacationDetails.imageName;
                updateVacation.sumFollowers = props.vacationDetails.sumFollowers;

                dispatch(editVacationAsync({...updateVacation, successCallback: editSuccess}))
        }else{
            notify.error(updateVacationError);
        }
     }

     const editSuccess = () =>{
        props.handleCloseFunction();
    }

    const handleFile = (e: any) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }

    const stringDateFormatter = (myDate: Date): string => {
        let date = new Date(myDate);
        let day = stringDateElementFormatter(date.getDate());
        let month = stringDateElementFormatter(date.getMonth() + 1);
        return `${date.getFullYear()}-${month}-${day}`;
    }

    const stringDateElementFormatter = (element: number): string => {
        return (element < 10)? `0${element}` : `${element}`;
    }

    return (
        <div className="EditVacation">
            <form onSubmit={handleSubmit(send)}>
                <Typography component="h1" variant="h5" sx={{mb:3}} textAlign={"center"}>
                    Edit Vacation
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                                required
                                fullWidth
                                id="destination"
                                label="Enter a destination"
                                defaultValue={props.vacationDetails.destination}
                                inputProps={{ maxLength: 25 }}
                                {...register("destination",{
                                    required: true,
                                    maxLength: {
                                        value: 25,
                                        message: "Destination need to be less than 25 chars!"
                                    }
                                })}
                            />
                            {errors.destination && <p className="myValidColor">{errors.destination.message}</p>}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            id="description"
                            label="Enter a description"
                            type="textarea"
                            rows={3}
                            multiline
                            inputProps={{ maxLength: 190 }}
                            defaultValue={props.vacationDetails.description}
                            {...register("description",{
                                required:true,
                                maxLength: {
                                    value: 190,
                                    message: "Destination need to be less than 190 chars!"
                                }
                            })}
                        /> 
                        {errors.destination && <p className="myValidColor">{errors.destination.message}</p>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="start_date"
                            label="Start Date"
                            type="date"
                            defaultValue={stringDateFormatter(props.vacationDetails.start_date)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register("start_date",{
                                required:true
                            })}
                        />    
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="end_date"
                            label="End Date"
                            type="date"
                            defaultValue={stringDateFormatter(props.vacationDetails.end_date)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register("end_date",{
                                required:true
                            })}
                        />    
                    </Grid>
                    <Grid item xs={8}>
                        <TextField                                
                                type="file"
                                id="image"
                                label="Upload a file"    
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleFile}
                        />    
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            defaultValue={props.vacationDetails.price}
                            type="number"
                            id="price"
                            label="Enter a Price"
                            {...register("price",{
                                required:true
                            })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            disabled
                            fullWidth
                            type="number"
                            label="Sum Followers"
                            defaultValue={props.vacationDetails.sumFollowers}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register("sumFollowers")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Update
                        </Button>
                    </Grid>
                </Grid>      
            </form>    
        </div>
    );
}

export default EditVacation;
