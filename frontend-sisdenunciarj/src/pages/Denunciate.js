import React, {  useState ,useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import FormPost from '../components/FormPost'
import Box from '@mui/material/Box';
import Layout from '../components/Layout';


export default function Denunciate(){

    const {user} = useContext(AuthContext);
    

    return (
    <Layout>
 <Box m={2}>

 <FormPost/>

 </Box>
 </Layout>
    );
}