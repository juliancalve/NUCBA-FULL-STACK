import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getUserById } from '../services/users.service';

const ShowUser = () => {

    const { id } = useParams();
    const [user, setUser] = useState({});

    const onGetUserById = async () => {
        const response = await getUserById({ id });
        setUser(response?.data?.data);
    };

    useEffect(() => {
        onGetUserById();
    }, [id]);

    return (
        <div>
            <h1>id: {user?._id}</h1>
            <h1>email: {user?.email}</h1>
            <h1>password: {user?.password}</h1>
            <h1>age: {user?.age}</h1>
            <h1>firstName: {user?.firstName}</h1>
            <h1>lastName: {user?.lastName}</h1>
            <h1>createdAt: {user?.createdAt}</h1>
            <h1>enabled: <span style={{color: user?.enabled ? 'green' : 'red'}}>@</span></h1>
        </div>
    )
}

export default ShowUser
