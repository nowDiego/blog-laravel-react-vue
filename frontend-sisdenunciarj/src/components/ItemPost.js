import React  from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Moment from 'react-moment';



export default function ItemPost(props){

    const navigate = useNavigate();

   function handleReadMore(id){
   
    navigate('/post', { state: { id: id } });
   }

  

    return(

              <Box sx={{
          boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
          padding:'10px',
         
        }}>
        
        <Typography mb={1} fontSize={10} align={'right'} color="primary" sx={{fontWeight: 600}}>
         {
        
         <Moment format="DD/MM/YYYY">
          {props.item.created_at}
          </Moment>
         }
        </Typography>
        
        <Box>
        {props.item.photo?
         <img
        style={{width:'100%',height:'200px'}}
        alt={props.item.title}
    src={`http://localhost:8000/storage/${props.item.photo}`}
        />:
 
        <img
        style={{width:'100%',height:'200px'}}
        alt={props.item.title}
        src='/images/sem-imagem.jpg'
        />

        }    

       
        </Box>

        <Box>
        <Typography color="custom" mt={2} mb={4} >
         {props.item.title}
        </Typography>
        </Box>
        
        <Box>
        <Stack direction="row" spacing={2}>

        <Button variant="contained" color="primary" onClick={()=>handleReadMore(props.item.id)}> Leia mais...</Button>
        
        {props.delete?
        <Button variant="contained" color="secondary" onClick={()=>props.handleDeletePost(props.item.id)}> Excluir</Button>
       :
        null     
        }
      
      </Stack>
        </Box>

        </Box>
    )

}