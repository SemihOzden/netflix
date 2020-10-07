import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom'
import { FirebaseContext } from '../context/firebase';
import { FooterContainer } from '../containers/footer';
import { HeaderContainer } from '../containers/header';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';

export default function Signin(){
    const history = useHistory();
    const { firebase}= useContext(FirebaseContext);
    const [emailAdress, setEmailAdress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //check form input elements are valid
    //email  & password
    const isInvalid= password ==='' || emailAdress === '';
    const handleSignin = (event) => {
        event.preventDefault();

        //firebase works here
        firebase
            .auth()
            .signInWithEmailAndPassword(emailAdress,password)
            .then(()=>{
                //push to browse page
                history.push(ROUTES.BROWSE);
            }).catch((error)=> {
                setEmailAdress('');
                setPassword('');
                setError(error.message);
            });
    }


    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign in</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}

                    <Form.Base onSubmit={handleSignin} method="POST">
                        <Form.Input
                            placeholder="Email Address"
                            value={emailAdress}
                            onChange={({target}) => setEmailAdress(target.value)}
                        />
                        <Form.Input
                            type="password"
                            autoComplete="off"
                            placeholder="Password"
                            value={password}
                            onChange={({target}) => setPassword(target.value)}
                        />
                        <Form.Submit disabled={isInvalid} type="submit">
                            Sign In
                        </Form.Submit>
                    </Form.Base>
                    <Form.Text>
                        New to Netflix? <Form.Link to="/signup">Sign up now.</Form.Link>
                    </Form.Text>
                    <Form.SmallText>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
                    </Form.SmallText>
                </Form>
            </HeaderContainer>
            <FooterContainer/>
        </>
    );
}