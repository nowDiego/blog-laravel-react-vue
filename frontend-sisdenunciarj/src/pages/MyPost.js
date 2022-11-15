import react, { useState, useEffect } from 'react'
import ItemPost from '../components/ItemPost'
import axios from '../axios/index'
import Layout from '../components/Layout'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Alert = react.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function MyPost() {

  const [post, setPost] = useState([]);

  const [response, setResponse] = useState({
    status: false,
    title: '',
    message: ''
  })

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    from:0,
    last_page:0,
    per_page:0,
    to:0,
    total:0
  });

  const [open, setOpen] = useState(false);
  const [load,setLoad] = useState(false);


  
  const handlePagination = (event, value) => {   
    setPage(value);
    loadMyPost(value)
  };


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



  useEffect(() => {
    loadMyPost()
  }, []);


  function loadMyPost(page=1) {

    setLoad(true);

    axios
      .get(`/me/mypost?page=${page}`)
      .then(res => {
        if (res.data.status) {

          setPagination({
            from:res.data.data.from,
            last_page:res.data.data.last_page,
            per_page:res.data.data.per_page,
            to:res.data.data.to,
            total:res.data.data.total
          })
          setPost(res.data.data.data);

          setLoad(false);

        }
        setLoad(false);

      })
      .catch((error) => {
        setLoad(false);           
          });


  }

  function handleDeletePost(id) {

    console.log(id)

    axios
      .post("/post", {
        id: id,
        _method: 'delete'
      }
      )
      .then(res => {

        if (res.data.status) {
       

          setPost(
            post.filter(item => item.id !== id)
          )

          setResponse({
            'status': res.data.status,
            'message': res.data.message
          }
          );

          handleClick();

        }

      });



  }


  return (


    <Layout>


      {!Object.keys(post).length == 0 ?
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection:'column',
            margin:'10px'
          }}>



          <Grid container spacing={2}  >
            {post.map((item, index) =>
              <Grid key={index} item  xs={12} md={3}  sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <ItemPost item={item} key={item.id} delete={true} handleDeletePost={handleDeletePost} />
              </Grid>
            )}
          </Grid>

          
   <Stack >
  
  {
 pagination.last_page>1?
 <Pagination count={pagination.last_page} page={page} onChange={handlePagination} />
  :null
  }
</Stack>


          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {response.message}
            </Alert>
          </Snackbar>


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