import { FormEvent, FormEventHandler, useState } from 'react';
import api from '../../services/api';
import './SignUp.css';

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const response = await api.post('/users', {email, password})
        console.log(response.data);
    }

    return (
        <form className="container" onSubmit={handleSubmit}>
            <h2>Cadastro</h2>
            <div className="form-wraper">
                <input type="text" placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
            </div>

            <div className="form-wraper">
                <input type="password" placeholder='Password' onChange={(event) => setPassword(event.target.value)}/>
            </div>

            <div className="form-wraper">
                <button type="submit"> Cadastrar </button>
            </div>
        </form>
    )
}