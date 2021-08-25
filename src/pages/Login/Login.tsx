import React, { useCallback, useState } from "react";
import './Login.css'

export default () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        console.log(username, password);
    }, [username, password])

    return (
        <form className="container" onSubmit={handleSubmit}>
            <h2>Authenticator</h2>
            <div className="form-wraper">
                <input type="text" placeholder='Username' onChange={(event) => setUsername(event.target.value)}/>
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