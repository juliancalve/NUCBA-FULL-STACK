import { useState } from 'react'
import { useNavigate } from 'react-router';
import { createUser } from '../services/users.service';

const CreateUser = () => {
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onCreate = async () => {
        try {
           const response = await createUser({
            ...user
           });
           navigate('/users');
        } catch( error ){
            alert(error);
        }
    }

    return (
        <div>
            <input onChange={handleChange} name='firstName' placeholder='firstName' />
            <input onChange={handleChange} name='lastName' placeholder='lastName'/>
            <input onChange={handleChange} name='age' placeholder='age'/>
            <input onChange={handleChange} name='email' placeholder='email'/>
            <input onChange={handleChange} name='password' placeholder='password'/>
            <button onClick={onCreate}>Create</button>
        </div>
    )
}

export default CreateUser
