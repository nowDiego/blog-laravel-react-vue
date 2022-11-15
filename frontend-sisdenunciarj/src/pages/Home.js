import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ItemPost from '../components/ItemPost'
import Header from '../components/Header'
import axios from '../axios/index';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



export default function Home(){

  const [post,setPost] = useState([]);
  const [load,setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    from:0,
    last_page:0,
    per_page:0,
    to:0,
    total:0
  });

    let { categoryId } = useParams();


    const handlePagination = (event, value) => {
      setPage(value);
      loadPost(value)
    };


    useEffect(() => {          
        loadPost()        
      },[]);


     function loadPost(page=1){
      setLoad(true);

        axios
      .get(`post?page=${page}`,{
        params: {
          category: categoryId
        }
      }
      )
      .then(res => {
        if (res.data.status) {  

          // console.log(res.data)
                   
          setPagination({
            from:res.data.data.from,
            last_page:res.data.data.last_page,
            per_page:res.data.data.per_page,
            to:res.data.data.to,
            total:res.data.data.total
          })
          setPost(res.data.data.data);
        }
        setLoad(false);

      })  
      .catch((error) => {
        setLoad(false);           
          });


      }


return (
<div>

<Header/>
   
{!Object.keys(post).length == 0?
  <Box
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        margin:'10px'
      }}>


  
<Grid container spacing={2} >
  
   {post.map((item,index)=>
    
    <Grid key={index} item xs={12} md={3}  sx={{justifyContent:'center',alignItems:'center'}} > 
    <ItemPost item={item} key={item.id} /> 
     </Grid>   

  )}
   </Grid>


   <Stack mt={2} >
  
       {
      pagination.last_page>1?
      <Pagination count={pagination.last_page} page={page} onChange={handlePagination} />
       :null
       }
    </Stack>

  
</Box>   
  :
  <Box sx={{ display: 'flex' ,justifyContent:'center',alignItems:'center' ,height:'100vh'}}>
   {load?<CircularProgress />:
   <p>Nenhuma postagem encontrada!!!</p>
   }

</Box>
}
    

    </div>
  
   
)

}