export default 

function guest({next,router}){
     
    if(localStorage.getItem('_token')){
         return router.push('dashboard')
     }

     return next();

}