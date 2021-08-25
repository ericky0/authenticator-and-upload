import React, { useCallback, useState} from "react";
import history from '../../utils/History'
import { useAuth } from "../../context/AuthContext";
import './Login.css'

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const { signIn } = useAuth();

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            
            await signIn({ email, password })
            history.push('/dashboard')

    }, [email, password]);

    return (
        <form className="container" onSubmit={handleSubmit}>
            <h2>Authenticator</h2>
            <div className="form-wraper">
                <input type="text" placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
            </div>

            <div className="form-wraper">
                <input type="password" placeholder='Password' onChange={(event) => setPassword(event.target.value)}/>
            </div>
        
            <div className="form-wraper">
                <button type="submit"> Login </button>
            </div>
        </form>
    )
}