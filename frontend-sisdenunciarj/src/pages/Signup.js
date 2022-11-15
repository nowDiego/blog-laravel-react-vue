import React, {  useState ,useContext} from 'react';
import axios from '../axios/index';
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../context/AuthContext'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';

export default function Signup(){

    const navigate = useNavigate();
    
    const {setUser} = useContext(AuthContext);
  
    const [values, setValues] = useState({     
           nameSign: '',
          emailSign: '',
          passwordSign:'',      
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
      
          if (!values.nameSign) {
            errors.nameSign = "Usuário é obrigatório";           
          } 
          if (!values.emailSign) {
            errors.emailSign = "E-mail é obrigatório";
           
          } else if (!regex.test(values.emailSign)) {
            errors.emailSign = "E-mail inválido";
           
          }

          if (!values.passwordSign) {
            errors.passwordSign = "Senha é obrigatória";
               } 
                        
          return errors;
        };
      
       
       
       
        async function onSubmitSign(e) {
            e.preventDefault();    
                      
          let validation = validate(values);    
            setFormErrors(validation);
              
    
              if(Object.keys(validation).length === 0) {
           
            axios
              .post("/customer", {
                name: values.nameSign,
                email: values.emailSign,      
                password: values.passwordSign       
        
              })
              .then(res => {
                if (res.data.status) {           
                  localStorage.setItem('_token', res.data.access_token);
                  console.log(res.data)
                 
                  setUser(res.data.data); 
                  // setUser({
                  //   id:res.data.data.id,
                  //   name:res.data.data.name,
                  //   email:res.data.data.email                  
                  // })             
                
                setResponse({        
                  'status':res.data.status,
                   'message':res.data.message  
               })  
                                             
                }else{

                  setResponse({        
                    'status':res.data.status,
                     'message':res.data.message  
                 })  

                }    
              })
              .catch((error) => {
                console.log(error)
                setResponse(
                  {
                    status: false,
                    title: 'Sign!!!',
                    message: 'Ocorreu um erro ao cadastrar'
                  }
                )
                   
              });
           
            }
    
             }



    return (
  
  <form onSubmit={onSubmitSign} className="flex-column">
  <h2 className='sign-title'>Cadastre-se e faça suas postagens no Denuncia RJ</h2>

  <FormGroup>

<FormGroup margin="normal">
  <InputLabel >Nome</InputLabel>
  <Input type="text" id="nameSign" name="nameSign" value={values.nameSign} onChange={onChange}/>
  <p className="content-error">{formErrors.nameSign}</p>
  </FormGroup>

  <FormGroup margin="normal">
  <InputLabel >Email:</InputLabel>
  <Input type="email" id="emailSign" name="emailSign" value={values.emailSign} onChange={onChange} />
  <p className="content-error">{formErrors.emailSign}</p>
  </FormGroup>

  <FormGroup margin="normal">
  <InputLabel >Senha:</InputLabel>
  <Input type="password" id="passwordSign" name="passwordSign" value={values.passwordSign} onChange={onChange} />
  <p className="content-error">{formErrors.passwordSign}</p>
  </FormGroup>

  <FormControl margin="normal">
  <Button type="submit" variant="contained" color="primary" >Entrar</Button>
  </FormControl>

 {response?<p className="content-error">{response.message}</p>:null}

 </FormGroup>
 
</form>
   
    );
}