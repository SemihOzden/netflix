import React from 'react';
import { Route, Redirect} from 'react-router-dom';

export function IsUserRedirect({user, logedInPath, children,...rest}){
    return (
        <Route
            {...rest}
            render={()=>{
                if(!user){
                    return children;
                }

                if(user){
                    return (
                        <Redirect 
                            to={{
                                pathname: logedInPath,
                            }}
                        />
                    )
                }
                
                return null;
            }}
        />
    );
}

export function ProtectedRoute({user, children, ...rest}){
    return (
        <Route
            {...rest}
            render={({location})=> {
                if(user){
                    return children;
                }

                if(!user){
                    return (
                        <Redirect
                            to={{
                                pathname:'signin',
                                state: {from: location}
                            }}
                        />
                    )
                }
                return null;
            }}
        />
    )
}