import { useEffect } from "react"
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";



export default () => {
    const { signOut } = useAuth();
    useEffect(() => {
        api.get('/users').then(console.log).catch((err) => {
            console.log('fwfwafaw')
            signOut();
        })
    }, []);
    return (
        <div>
            DashBoard
        </div>
    )
}