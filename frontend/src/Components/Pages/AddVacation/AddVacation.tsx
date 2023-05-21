import "./AddVacation.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Vacation } from "../../../Models/vacation";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../../redux/store";
import notify from "../../../Utils/Notify";
import { addNewVacationAsync } from "../../../redux/vacation-slice";

function AddVacation(): JSX.Element {
    const dispatch = useAppDispatch();
    const today = new Date().toISOString().split('T')[0]; // Get today's date in the format "YYYY-MM-DD"
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger
      } = useForm<Vacation>();

    const [file, setFile] = useState();
    const navigate = useNavigate();

    const checkVacationDetails = (vacation: Vacation) =>{
        if((new Date(vacation.start_date) > new Date(vacation.end_date))){
            return "The start date cannot be after the end date!";
        }
        return "";
    }

    const validateImage = (file: FileList) => {
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    
        if (!file || file.length === 0) {
          return "* Please select an image file.";
        }
        const selectedFile = file[0];
        const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
        if (!allowedExtensions.includes(fileExtension || "")) {
          return "* Invalid file format. Only JPG, JPEG, PNG, and GIF formats are allowed.";
        }   
      };
    
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
                                fullWidth
                                id="destination"
                                label="Enter a destination"
                                autoFocus
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
                            {/* {errors.destination && <p className="myInvalidColor">{errors.destination.message}</p>} */}
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
                        {/* {errors.description && <p className="myInvalidColor">{errors.description.message}</p>} */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            fullWidth
                            id="start_date"
                            label="Start Date"
                            type="date"
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
                        {/* {errors.start_date && <p className="myInvalidColor">{errors.start_date.message}</p>} */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField   
                            fullWidth
                            id="end_date"
                            label="End Date"
                            type="date"
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
                       {/* {errors.end_date && <p className="myInvalidColor">{errors.end_date.message}</p>} */}
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
                            fullWidth
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
                        {/* {errors.price && <p className="myInvalidColor">{errors.price.message}</p>} */}
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
