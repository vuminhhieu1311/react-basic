import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser } from '../../api/getUser';

const Authentication = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const checkToken = () => {
        const access_token = localStorage.getItem('access_token')
        const expires_at = localStorage.getItem('expires_at')
        if (access_token === null) return false;
        if (expires_at === null) return false;
            let now = new Date()
            now = now.toISOString().replace('Z', '.000000Z')
            if (now > expires_at) {
                return false
            }
       
        return true
    }

    useEffect(() => {
        if (!checkToken()) {
            navigate('/login')
        } else {
            getUser().then(response => {
                if (location.pathname === 'login') {
                    navigate('/')
                }
            }).catch(e => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('expires_at')
                navigate('/login')
            })
        }
    }, [])
    return (
        <div>
            {children}
        </div>
    );
};

export default Authentication;