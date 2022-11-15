import React, { useEffect, useState } from 'react';
import axios from '../axios/index';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Grow from '@mui/material/Grow';






const style = {
  margin: '20px',
  paddingLeft: '10px',
  paddingRight: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'spaceBetween',
}


export default function FormPost() {



  const [values, setValues] = useState({
    title: '',
    content: '',
    category: '',
    street: '',
    city: '',
    state: '',
    number: '',
    zip_code: '',
    latitude: '',
    longitude: ''
  });

  const [file, setFile] = useState()

  const [category, setCategory] = useState([])

  const [response, setResponse] = useState({
    status: false,
    title: '',
    message: ''
  })

  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
    loadCategory();
  }, []);


  useEffect(() => {

    if (values.zip_code.length === 8) {
      handleCep(values.zip_code)
    }

  }, [values.zip_code])


  const onChange = e => setValues({ ...values, [e.target.name]: e.target.value });

  const onChangeFile = (e) => setFile(e.target.files[0])



  async function loadCategory() {

    await axios
      .get("/category")
      .then(res => {
        if (res.data.status) {
          setCategory(res.data.data);
          // console.log(res.data.data)

        }
      })
    //   .catch((error) => {
    //     console.log(error)
    //     setResponse(
    //       {
    //         status: false,
    //         title: 'Usuario!!!',
    //         message: 'Ocorreu ao Acessar o Chat'
    //       }
    //     )

    //   });

    // }


    
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.title) {
      errors.title = "Título é obrigatório";
     
    } 
    if (!values.content) {
      errors.content = "Conteúdo é obrigatório";
         } 
    

      if (!values.category) {
        errors.category = "Categoria é obrigatória";
      } 

      
      if (!values.street) {
        errors.street = "Rua é obrigatória";
      } 

      if (!values.city) {
        errors.city = "Cidade é obrigatório";
      } 

      if (!values.state) {
        errors.state = "Estado é obrigatório";
      } 

      if (!values.zip_code) {
        errors.zip_code = "Cep é obrigatório";
      } 

    return errors;
  };


  

  async function handleCep(cep) {

    await axios
      .post("/cep", {
        cep: cep,

      })
      .then(res => {
        if (res.data.status) {

          let address = res.data.data;
          setValues(item => {
            return {
              ...item,
              street: address.logradouro,
              city: address.localidade,
              state: address.uf,
            }
          });

        }
      })
    //   .catch((error) => {
    //     console.log(error)
    //     setResponse(
    //       {
    //         status: false,
    //         title: 'Usuario!!!',
    //         message: 'Ocorreu ao Acessar o Chat'
    //       }
    //     )

    //   });

    // }


  }

  async function onSubmit(e) {
    e.preventDefault();

    let validation = validate(values);    
    setFormErrors(validation);


      if(Object.keys(validation).length === 0) {

    const formData = new FormData();
    formData.append('photo', file);

    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('category', values.category);
    formData.append('street', values.street);
    formData.append('city', values.city);
    formData.append('state', values.state);
    formData.append('zip_code', values.zip_code);



    axios({
      method: "post",
      url: "/post",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(res => {
        if (res.data.status) {             
          console.log(res.data)
          setResponse({
            'status': res.data.status,
            'message': res.data.message
          }
          );

        }
      })
      .catch((error) => {
        console.log(error)
        setResponse(
          {
            status: false,
            title: 'Postagem!!!',
            message: 'Ocorreu ao cadastrar a postagem'
          }
        )

      });

    }    

  }


  return (
    <Grid container spacing={2}>

      <Grid item xs={19} md={8} >

      {response.status?
         <Grow in={true}>
       <Box sx={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <h2>Postagem cadastrada com sucesso</h2>
     
          <img
            style={{ width: "30px", height: "30px" }}
            src="/images/check.png"
            loading="lazy"
          />

        </Box>
        </Grow>
      :
        <form onSubmit={onSubmit} style={style}>
          <h2 className='lobby-title'>Compartilhe conosco sua Denuncia</h2>
         
       
            <FormGroup margin="normal">

              <InputLabel for="title" >Titulo</InputLabel>
              <Input type="text" id="title" name="title" value={values.title} onChange={onChange} />
              <p className="content-error">{formErrors.title}</p>

            </FormGroup>

    

            <FormGroup margin="normal">

            <InputLabel for="content" >Conteudo:</InputLabel>

              <TextareaAutosize
                aria-label="minimum height"
                minRows={8}               
                
                id="content" name="content" value={values.content} onChange={onChange} />
              <p className="content-error">{formErrors.content}</p>

            </FormGroup>

           
       <FormGroup margin="normal">
            <InputLabel for="file" >Foto:</InputLabel>    
            <Input type="file" onChange={onChangeFile} />
            </FormGroup>

            <FormGroup margin="normal">

              <InputLabel for="category">Categoria:</InputLabel>
              <Select
                name="category" id="category"
                onChange={onChange}
                value={values.category}
              >
              
                {category.map((item, index) =>
                  <MenuItem key={index} value={item.id}>{item.category}</MenuItem>
                )}

              </Select>

              <p className="content-error">{formErrors.category}</p>

            </FormGroup>

            <FormGroup margin="normal">

              <InputLabel for="zip_code">Cep</InputLabel>
              <Input  type="text" id="zip_code" name="zip_code" value={values.zip_code} onChange={onChange} />
         
              <p className="content-error">{formErrors.zip_code}</p>

            </FormGroup>

            <FormGroup margin="normal">
              <InputLabel for="street">Rua</InputLabel>
              <Input type="text" disabled id="street" name="street" value={values.street} onChange={onChange} />

              <p className="content-error">{formErrors.street}</p>

            </FormGroup>

            <FormGroup margin="normal">

              <InputLabel for="city" >Cidade</InputLabel>
              <Input type="text" disabled id="city" name="city" value={values.city} onChange={onChange} />

              <p className="content-error">{formErrors.city}</p>
            </FormGroup>


            <FormGroup margin="normal">

              <InputLabel for="state">Estado</InputLabel>
              <Input type="text" disabled id="state" name="state" value={values.state} onChange={onChange} />
             
              <p className="content-error">{formErrors.state}</p>

            </FormGroup>

            <FormGroup margin="normal">
              <InputLabel for="number" >Numero</InputLabel>
              <Input type="text" placeholder='(Opcional)' id="number" name="number" value={values.number} onChange={onChange} />
          
            </FormGroup>

          
            <FormGroup margin="normal">        
            <InputLabel for="maps" >Mapa</InputLabel>
              <Stack direction="row" spacing={2}>
         
              <Input type="text" placeholder='Latitude' id="latitude" name="latitude" value={values.latitude} onChange={onChange} />
                  
              <Input type="text" id="longitude" placeholder='Longitude' name="longitude" value={values.longitude} onChange={onChange} />
             
              </Stack>

            </FormGroup>

            <FormGroup margin="normal">
              <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '10px' }} >Entrar</Button>
            </FormGroup>

            {response ? <p className="content-error">{response.message}</p> : null}


         
        </form>
    }
      </Grid>

      <Grid item xs={4} sx={{display: { xs: 'none', md: 'flex' }}}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            style={{ width: "90%", height: "80vh" }}
            src="/images/image3.png"
            loading="lazy"
          />

        </Box>

      </Grid>


    </Grid>


  );
}