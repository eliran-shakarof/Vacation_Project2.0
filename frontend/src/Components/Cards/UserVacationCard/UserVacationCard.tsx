import "./UserVacationCard.css";
import { IconButton } from "@mui/material";
import VacationCard from "../VacationCard/VacationCard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Following } from "../../../Models/following";
import { selectUserState } from "../../../redux/user-slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { addNewFollowAsync, deleteFollowAsync } from "../../../redux/following-slice";


function UserVacationCard(props:any): JSX.Element {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(selectUserState);
 
    const getLiked = () =>{        
        const follow = new Following(0, userState.userName, props.cardDetails.vacation_id);
        if(props.isCardLike === false){   
            //Be Liked
            dispatch(addNewFollowAsync({follow: {...follow},vacation:props.cardDetails}));
        }else{
            //Be unLiked
            dispatch(deleteFollowAsync({...follow}));     
        }    
    }    

    const userIcons = () =>{
      return(
        <IconButton onClick={()=>{getLiked()}}>
          {(props.isCardLike === true) ? <FavoriteIcon color="primary"/> : <FavoriteBorderIcon color="primary"/>}
        </IconButton>
      );
    }

    return (
        <div className="UserVacationCard">
			    <VacationCard cardDetails={props.cardDetails} theIcons={userIcons()}/>
        </div>
    );
}

export default UserVacationCard;
