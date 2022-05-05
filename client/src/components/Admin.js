import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
// import axios from 'axios'
import useAuth from '../hooks/useAuth';

const Admin = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth, auth } = useAuth()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        // const getUsers = async () => {
        //     try {
        //         const response = await axios.get('/users', {
        //             signal: controller.signal,
        //             headers: {'Authorization': auth.accessToken}
        //         });
        //         console.log('Reponse')
        //         console.log(response);
        //         isMounted && setUsers(response.data);
        //     } catch (err) {
        //         console.error(err);
        //         navigate('/login', { state: { from: location }, replace: true });
        //     }
        // }

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.user_name}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Admin;