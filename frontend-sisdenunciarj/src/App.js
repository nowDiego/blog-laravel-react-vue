import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Denunciate from './pages/Denunciate';
import MyPost from './pages/MyPost';
import Post from './pages/Post'
import Profile from './pages/Profile'
import PrivateRoute from './helper/routes/PrivateRoute';
import AuthProvider from './context/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {     
      main: '#d32f2f',
    },
    secondary: {     
      main: '#74726f',
    },
    
  },
});



function App() {
  return (
    <ThemeProvider theme={theme}>
    <AuthProvider>        

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/post" element={<Post />} />

          {/* <Route path="/category/:categoryId" element={<Home />} />      */}
                 
          <Route  path='/category/:categoryId'   element={<Home/>} />

          <Route
            path="/denunciate"
            element={
              <PrivateRoute>
                <Denunciate />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/mypost"
            element={
              <PrivateRoute>
                <MyPost />
              </PrivateRoute>
            }
          />
     
        </Routes>
      </BrowserRouter>

    
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
