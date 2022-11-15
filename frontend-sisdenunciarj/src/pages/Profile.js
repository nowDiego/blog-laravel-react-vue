import react,{useState,useEffect,useRef,useContext} from 'react';
import axios from '../axios/index';
import {AuthContext} from '../context/AuthContext'

import Layout from '../components/Layout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = react.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Profile(){

// const [me,setMe] = useState([]);

const {user,setUser} = useContext(AuthContext); 

const [response, setResponse] = useState({
  status:false,
  title:'',
  message:''
})

const [open, setOpen] = useState(false);

const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};


  const fileInput = useRef();
 

  const selectFile = () => {
      fileInput.current.click();
  }
 

  async function handleUpdateAvatar(file) {

// console.log(file);
    const formData = new FormData();
    formData.append('photo', file);

// console.log(formData);
// console.log('teste');

    axios({
      method: "post",
      url: "/customer/avatar",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(res => {

        // console.log(res.data)
        if (res.data.status) {
          //   localStorage.setItem('_token', res.data.access_token);
          //   setUser(res.data.data); 
          // navigate("/login");       
          // console.log(res.data)
          
          setUser(item => {
            return {
              ...item,            
                photo:res.data.data
                                 
            }
          });

          setResponse({        
            'status':res.data.status,
             'message':res.data.message  
         }          
         );
        
         handleClick();

        }
      })
    // //   .catch((error) => {
    // //     console.log(error)
    // //     setResponse(
    // //       {
    // //         status: false,
    // //         title: 'Usuario!!!',
    // //         message: 'Ocorreu ao Acessar o Chat'
    // //       }
    // //     )

    // //   });

    // // }


  }



  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }


  function stringAvatar(name) {


    return {
      sx: {       
        bgcolor: stringToColor(name),
      },
      children: name.split(' ').length === 1?`${name.split(' ')[0][0]} ` : `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
 
 
    };
  }



    return (

        
        <Layout>


{!Object.keys(user).length == 0?
  <Box
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'80vh'
      }}>


  
<Box  sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      }}>


<Box m={2} sx={{display:'flex', 
           flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'}}>

        {user.photo?
     
        <Avatar
        alt={user.name}
        src={`http://localhost:8000/storage/${user.photo}`}
        sx={{ width: 200, height: 200 , marginBottom:'20px' }}
      />
              
        :
       
<Avatar {...stringAvatar(user.name)}
  sx={{ width: 200, height: 200 , marginBottom:'20px',fontSize:'100px' }}
/>


        }    
       
       <input type="file" style={{ "display": "none" }} ref={fileInput} onChange={(e)=>handleUpdateAvatar(e.target.files[0])} />
           <IconButton onClick={selectFile}><AddAPhotoIcon /></IconButton> 

      
        </Box>

    <Box m={2}>{user.name}</Box>
    <Box m={2} >{user.email}</Box>
   

   </Box>

  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'right' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {response.message}
     </Alert>
  </Snackbar>   

  
</Box>   
  :
  <Box sx={{ display: 'flex' ,justifyContent:'center',alignItems:'center' ,height:'100vh'}}>
  <CircularProgress />
</Box>
}


        </Layout>

   )
}