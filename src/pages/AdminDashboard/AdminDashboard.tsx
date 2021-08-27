import { useEffect } from "react";
import useApi from "../../hooks/useFetch";

interface User {
    id: string;
    name: string;
    email: string;
}

interface DataResponse { 
    users: User[];

}


const AdminDashboard: React.FC = () => {
    

    const { data } = useApi('/listusers', {});
    const users = (data as DataResponse)?.users;
    console.log(users);
    if(!users) {
        return <h1>Loading</h1>
    }

    return (
        <div>
            <h1>Lista</h1>
            <ul>
                {users.map(user => (
                    <div key={user.id}>
                        <li>{user.name}</li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default AdminDashboard;