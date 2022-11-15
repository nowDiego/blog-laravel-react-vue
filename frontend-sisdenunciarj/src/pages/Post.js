import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import axios from '../axios/index';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import Layout from '../components/Layout';




export default function Post() {

  // let { userId } = useParams();

  const { state } = useLocation();
  const { id } = state;

  const [post, setPost] = useState([]);
  const [load,setLoad] = useState(false);

  useEffect(() => {
    loadPost(id)
  }, []);



  async function loadPost(id) {

    setLoad(true);

    await axios
      .get(`/post/${id}`)
      .then(res => {
        if (res.data.status) {
          setPost(res.data.data);
          setLoad(false);
        }
        setLoad(false);
      })
      .catch((error) => {
        setLoad(false);      

      });

  

  }



  return (

    <Layout>

      {!Object.keys(post).length == 0? 

        <Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100'
            }}>

            <Typography  component={'div'} mb={1} fontSize={20} m={3}>
              {post.title}
            </Typography>

         
           {post.photo?
            <Box>
              <img
                style={{ width: '50vw', height: '40vh' }}
                alt={post.title}                
                src={`http://localhost:8000/storage/${post.photo}`}
              />
            </Box>
            :null
             }

            <Typography  component={'div'} mb={1} fontSize={15} mt={5} mr={7} ml={7}>
              {post.content}
            </Typography>

          </Box>

        </Box>
        :
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
           {load?<CircularProgress />:
           <p>Nenhuma postagem encontrada!!!</p>
          }
        </Box>
      }


    </Layout>
  )
}