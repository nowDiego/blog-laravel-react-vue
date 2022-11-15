export default 

function auth({next,router}){
     
    if(!localStorage.getItem('_token')){
        console.log('teste')
         return router.push('login')
     }

     return next();

}