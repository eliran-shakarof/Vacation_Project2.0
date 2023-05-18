import "./AddVacation.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Vacation } from "../../../Models/vacation";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import notify from "../../../Utils/Notify";
import { userRole } from "../../../redux/userState";
import { selectUserState } from "../../../redux/user-slice";
import { addNewVacationAsync } from "../../../redux/vacation-slice";

function AddVacation(): JSX.Element {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(selectUserState);

    
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<Vacation>();

    const [file, setFile] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        if (userState.userRole !== userRole.Admin) {
          navigate("/")
        }
      }, [navigate,userState.userRole]);
    
    const checkVacationDetails = (vacation: Vacation) =>{
        if((new Date(vacation.start_date) > new Date(vacation.end_date))){
            return "The start date cannot be after the end date!";
        }
        return "";
    }
    
    const send = async (newVacation: Vacation) => {    
        let newVacationError:string = checkVacationDetails(newVacation);
        if(newVacationError === ""){
            newVacation.image = file;
            newVacation.sumFollowers = 0;
           dispatch(addNewVacationAsync({...newVacation, successCallback: addingSuccess}));
            
        }else{
            notify.error(newVacationError);
        }
    }

    const handleFile = (e: any) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }
    
    const addingSuccess = () =>{
        navigate("/AdminHome");
    }

    return (
        <div className="AddVacation Box">
            <form onSubmit={handleSubmit(send)}>
                <Typography component="h1" variant="h5" sx={{mb:3}} textAlign={"center"}>
                    Add new vacation
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                                required
                                fullWidth
                                id="destination"
                                label="Enter a destination"
                                autoFocus
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
                            {...register("description",{
                                required:true,
                                maxLength: {
                                    value: 190,
                                    message: "Destination need to be less than 190 chars!"
                                }
                            })}
                        />
                        {errors.description && <p className="myValidColor">{errors.description.message}</p>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="start_date"
                            label="Start Date"
                            type="date"
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
                            required
                            fullWidth
                            id="end_date"
                            label="End Date"
                            type="date"
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
                                required                                
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
                            defaultValue={0}
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
                            sx={{  mb: 2 }}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>      
            </form>
        </div>
    );
}

export default AddVacation;

// try{
//     newVacation.image = file;
//     newVacation.sumFollowers = 0;
//     axios.post(`${Urls.serverUrl}/vacations/add`,newVacation ,{
//         headers: {
//         "authorization": `${userState.userToken}`,
//         "Content-Type": "multipart/form-data"
//         }
//     })
//     .then(res=> navigate("/AdminHome"))
//     .catch(err =>{notify.error(`${err.response.data}`)})
// }catch(err:any){
//     console.log(err);
// }