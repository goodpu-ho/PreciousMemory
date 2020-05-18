export const isAuthenticated = request =>{
    if(!request.user){        
        throw Error("Your need to login to perform this action");
    }
    return;
}