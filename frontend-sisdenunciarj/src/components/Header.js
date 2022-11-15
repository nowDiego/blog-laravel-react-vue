import {useContext,useState} from 'react'
// import '../assets/css/header.css';
import { Link } from "react-router-dom";
import {AuthContext} from '../context/AuthContext'


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from "react-router-dom";
import ReactLink from '../helper/routes/ReactLink'

import Grid from '@mui/material/Grid';


import Login from '../pages/Login'
import Sign from '../pages/Signup'



import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',    
    boxShadow: 24,
    p: 4,
    width:'80vw',
    // height:'80vh',
    display:'flex'
  };




 export default function Header(){

    const {user,setUser} = useContext(AuthContext); 

    const navigate = useNavigate();


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
        const [anchorElNav, setAnchorElNav] = useState(null);
        const [anchorElUser, setAnchorElUser] = useState(null);
  

        const handleOpenNavMenu = (event) => {
          setAnchorElNav(event.currentTarget);
        };
        const handleOpenUserMenu = (event) => {
          setAnchorElUser(event.currentTarget);
        };
      
        const handleCloseNavMenu = () => {
          setAnchorElNav(null);
        };
      
        const handleCloseUserMenu = () => {
          setAnchorElUser(null);
        };


        function stringToColor(string) {
          let hash = 0;
          let i;
                
          for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
          }
        
          let color = '#';
        
          for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
          }
       
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
      
        async function logout(){
          setUser([]);     
          localStorage.removeItem('_token');
          //desativar token jwt no backend
          navigate("/");    
      }


return (


<AppBar position="static" color="primary" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>          
          <Typography
            variant="h6"
            noWrap
            component="span"           
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
         <Link to='/'>   DENUNCIA RJ    </Link>
          </Typography>
      
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            
                {/* <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">  <Link to="/">Home </Link>  </Typography>
                </MenuItem>
             
                <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"><Link to="/">Login </Link> </Typography>  
                <Button onClick={handleOpen} sx={{color:'white'}}>Login</Button>         

                </MenuItem> */}
           
                {!user.name?
        <MenuItem sx={{display:'flex',alignItems:'center'}} onClick={handleCloseNavMenu}>
          <Button onClick={handleOpen} sx={{color:'#d32f2f'}}> Denuncie aqui !</Button> 
          </MenuItem>
          :
          <MenuItem sx={{display:'flex',alignItems:'center',color:'#d32f2f'}} onClick={handleCloseNavMenu}>
            <ArticleIcon sx={{color:'#d32f2f'}}/> 
           <Link to='/denunciate' className='primary-color' >                    
                   Denuncie aqui 
          </Link>
            </MenuItem>

       }



            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"          
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' } }}>
            
            <List sx={{display:'flex',alignItems:'center',listStyleType:'none',height:'100%'}}>

              <ListItem sx={{padding: '20px'}}>
         
        <Link to="/category/saneamento" className='nav-item'>Saneamento</Link >
          
                  
              </ListItem >                     
              <ListItem sx={{padding: '20px'}}>
          
          <Link to="/category/lazer" className='nav-item'>Lazer</Link >
              
              </ListItem >

              <ListItem sx={{padding: '20px'}}>
              
              <Link to="/category/educacao" className='nav-item'>Educação</Link >
              

              </ListItem >

              <ListItem sx={{padding: '20px'}}>
              
              <Link to="/category/seguranca" className='nav-item'>Segurança</Link >
             
              </ListItem >

              </List >

          </Box>

          
          <Box sx={{display:'flex' }}>

          <List sx={{display:'flex',alignItems:'center',listStyleType:'none'}}>
         
       {!user.name?
        <ListItem sx={{alignItems:'center', display: { xs: 'none', md: 'flex' }}}>
          <Button onClick={handleOpen} sx={{color:'white'}}><ArticleIcon sx={{color:'white'}}/> Denuncie aqui</Button> 
          </ListItem>
          :
          <ListItem sx={{display:'flex',alignItems:'center'}}>
            <ArticleIcon sx={{color:'white'}}/> 
           <Link to='/denunciate'  >                    
                   Denuncie aqui 
          </Link>
            </ListItem>

       }
         
                  
          </List>


          {user.name?
        
          <List sx={{display:'flex',alignItems:'center',listStyleType:'none'}}>
          {/* <ListItem sx={{display:'flex',alignItems:'center'}}>
          <ArticleIcon sx={{color:'white'}}/> 
           <Link href='/login'  >
                    
                   Denuncie aqui 
          </Link>
          </ListItem> */}
          {/* </List>            */}

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            
                {/* <Avatar alt="Remy Sharp" src="/images/ds.jpeg" /> */}

                {user.photo?
     
     <Avatar
     alt={user.name}
     src={`http://localhost:8000/storage/${user.photo}`}    
   />
           
     :
    
<Avatar {...stringAvatar(user.name)} />


     }    


              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to="/profile">
               <MenuItem onClick={handleCloseUserMenu}>
               <Typography  component={'span'} textAlign="center" sx={{color:'black'}}>Perfil</Typography>                 
                </MenuItem>
                </Link>
               
                <Link to="/mypost">
                <MenuItem  onClick={handleCloseUserMenu}>
                <Typography  component={'span'} textAlign="center" sx={{color:'black'}}>Minhas Postagens</Typography>                 
                </MenuItem>
                </Link>

               
                <MenuItem  onClick={logout}>
                <Typography  component={'span'} textAlign="center" sx={{color:'black'}}>Logout </Typography>                 
                </MenuItem>
                

             
            </Menu>
            </List> 
         
          :
          <List sx={{display:'flex',alignItems:'center',listStyleType:'none'}}>
          <ListItem>
          <Button onClick={handleOpen} sx={{color:'white'}}>Login</Button>         
        </ListItem>
     
        </List>     
             
            }
            </Box>
        </Toolbar>
      </Container>


   
   

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

        <Grid container spacing={2}>
        
        <Grid item xs={12} md={6}>
          <Box m={2}> <Login handleClose={handleClose}/></Box>
         </Grid>
       
         <Grid item xs={12} md={6}>
          <Box m={2}> <Sign/></Box>
          </Grid>
        
         </Grid>

        </Box>
      </Modal>
 

      </AppBar>



);
}

