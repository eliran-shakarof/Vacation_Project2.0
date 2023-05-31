import './App.css';
import Main from './Components/Layout/Main/Main';
import Footer from './Components/Layout/Footer/Footer';
import Header from './Components/Layout/Header/Header';
import { useEffect,useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useNavigate } from "react-router-dom";
import { Typography,Box,Modal} from '@mui/material';
import { selectUserState, userRole } from './redux/user-slice';
import { relogAsync, selectAuthState } from './redux/auth-slice';
import { RequestStatus } from './Models/request-status';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { status } = useAppSelector(selectAuthState)  

  useEffect(()=>{
      dispatch(relogAsync({failureCallback: failureRelog}))
  },[dispatch])
  
  const failureRelog = () =>{  
    handleOpen();
    navigate("/Login");
  }
  
  if (status === RequestStatus.Loading) {    
      return(
        <>
          <div className="loadingCircle"><CircularProgress /></div>
        </>
      )
  }

  return (
    <div className="App">
        <header><Header/></header>
        <main><Main/></main>
        <footer><Footer/></footer>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="expiredModal" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Your login period has expired,
              Please log in again.
              We Hope To See You!
          </Typography>
        </Box>
      </Modal>  
    </div>
  );
}

export default App;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

        // JWTaxios.post("/auth/relog")
        // .then((res:any)=>{
        //   store.dispatch(userLogin(res.headers.authorization));

        // })

        // .catch(err =>{
        //   store.dispatch(userLogout());
        //   handleOpen();
        //   navigate("/Login");
        // })