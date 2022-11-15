import React, {  useState,useContext } from 'react';
import axios from '../axios/index';
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../context/AuthContext'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';




export default function Login(props){

   

    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',       
        password:'',      
      });

      const [response, setResponse] = useState({
        status:false,
        title:'',
        message:''
      })
    
      const [formErrors, setFormErrors] = useState({});

      const onChange = e => setValues({ ...values, [e.target.name]: e.target.value });


      const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
        if (!values.name) {
          errors.name = "Usuário é obrigatório";
         
        } 
        if (!values.password) {
          errors.password = "Senha é obrigatória";
             } 
                      
        return errors;
      };
    



      async function onSubmitLogin(e) {
        e.preventDefault();    
                  
        let validation = validate(values);    
        setFormErrors(validation);        

          if(Object.keys(validation).length === 0) {
       
        axios
          .post("/login", {
            name: values.name,              
            password: values.password       
    
          })
          .then(res => {
            if (res.data.status) {           
              localStorage.setItem('_token', res.data.access_token);
              // console.log(res.data)  
              // setUser({
              //   id:res.data.data.id,
              //   name:res.data.data.name,
              //   email:res.data.data.email,
              //   photo:res.data.data.userable.photo
              // })                           
              setUser(res.data.data); 
              props.handleClose();  
              //  navigate("/");       
            // console.log(res.data)  
                                    
                        
            }else{
            
              setResponse({        
                'status':res.data.status,
                 'message':res.data.message  
             }  

             );

            }    
          })
          .catch((error) => {
            console.log(error)
            setResponse(
              {
                status: false,
                title: 'Login!!!',
                message: 'Login Inválido'
              }
            )
               
          });
       
        }

         }


    return (
     
     
          
<form onSubmit={onSubmitLogin} className="flex-column">

<h2 className='login-title'>Login</h2>

<FormGroup margin="normal">
<InputLabel >Nome</InputLabel>
<Input type="text" id="name" name="name" value={values.name} onChange={onChange}/>
<p className="content-error">{formErrors.name}</p>
</FormGroup>

<FormGroup margin="normal">
<InputLabel >Senha:</InputLabel>
<Input type="password" id="password" name="password" value={values.password} onChange={onChange} />
<p className="content-error">{formErrors.password}</p>
</FormGroup>

<FormGroup margin="normal">
<Button type="submit" variant="contained" color="primary" >Entrar</Button>
</FormGroup>
{response?<p className="content-error">{response.message}</p>:null}



</form>


    );
}