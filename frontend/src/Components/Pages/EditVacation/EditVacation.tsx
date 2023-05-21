import "./EditVacation.css";
import { useState } from "react";
import { Vacation } from "../../../Models/vacation";
import { useForm } from "react-hook-form";
import {Typography,TextField,Button,Grid} from '@mui/material';
import { useAppDispatch } from "../../../redux/store";
import notify from "../../../Utils/Notify";
import { editVacationAsync } from "../../../redux/vacation-slice";

function EditVacation(props:any): JSX.Element {
    const dispatch = useAppDispatch();
    const today = new Date().toISOString().split('T')[0]; // Get today's date in the format "YYYY-MM-DD"
    
    const [file, setFile] = useState();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger
      } = useForm<Vacation>();

    const checkVacationDetails = (vacation: Vacation) =>{
        if((new Date(vacation.start_date) > new Date(vacation.end_date))){
            return "The start date cannot be after the end date!";
        }
        return "";
    }

    const validateImage = (file: FileList) => {
        if(file.length === 0) return;
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    
        const selectedFile = file[0];
        const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
        if (!allowedExtensions.includes(fileExtension || "")) {
          return "* Invalid file format. Only JPG, JPEG, PNG, and GIF formats are allowed.";
        }   
      };

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
                                fullWidth
                                id="destination"
                                label="Enter a destination"
                                defaultValue={props.vacationDetails.destination}
                                inputProps={{ maxLength: 25 }}
                                {...register("destination",{
                                    required: "* Destination is required!",
                                    maxLength: {
                                        value: 25,
                                        message: "* Destination need to be less than 25 chars!"
                                    }
                                })}
                                onBlur={() => trigger("destination")}
                                error={!!errors.destination}
                                helperText={errors.destination?.message}
                            />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            id="description"
                            label="Enter a description"
                            type="textarea"
                            rows={3}
                            multiline
                            inputProps={{ maxLength: 190 }}
                            defaultValue={props.vacationDetails.description}
                           {...register("description",{
                                required: "* Description is required!",
                                maxLength: {
                                    value: 190,
                                    message: "* Description need to be less than 190 chars!"
                                }
                            })}
                            onBlur={() => trigger("description")}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        /> 
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
                            inputProps={{       
                                min: today,
                            }}
                            
                            {...register("start_date",{
                                required: "* Start date is required!"
                            })}      
                            onBlur={() => trigger("start_date")}
                            error={!!errors.start_date}
                            helperText={errors.start_date?.message}
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
                            inputProps={{       
                                min: today,
                            }}
                            {...register("end_date",{
                                required: "* End date is required!"
                            })}
                            onBlur={() => trigger("end_date")}
                            error={!!errors.end_date}
                            helperText={errors.end_date?.message}
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
                                 {...register("image", {
                                    validate: validateImage,
                                  })}
                                onChange={handleFile}  
                                error={!!errors.image}
                                helperText={errors.image && <span>{errors.image.message?.toString()}</span>}    
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
                                required: "* Price is required!",
                                min:{
                                    value: 1,
                                    message: "* Price can't be negative or zero!"
                                }
                            })}
                            onBlur={() => trigger("price")}
                            error={!!errors.price}
                            helperText={errors.price?.message}
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