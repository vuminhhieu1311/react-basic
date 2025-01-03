import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser } from '../../api/getUser';
import { useRefreshToken } from '../../react-query/hooks/refreshToken';

const Authentication = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const checkToken = (tokenKey, expireKey) => {
        const token = localStorage.getItem(tokenKey)
        const expires_at = localStorage.getItem(expireKey)
        if (token === null) return false;
        if (expires_at === null) return false;
            let now = new Date()
            now = now.toISOString().replace('Z', '.000000Z')
            if (now > expires_at) {
                return false
            }
        return true
    }
    const mutation = useRefreshToken()

    useEffect(() => {
        if (checkToken('access_token', 'expires_at')) {
            getUser().then(response => {
                if (location.pathname === 'login') {
                    navigate('/')
                }
            }).catch(e => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('expires_at')
                navigate('/login')
            })
        } else {
            if (!checkToken('refresh_token', 'rt_expires_at')) {
                navigate('/login')
            } else {
                mutation.mutate([], {
                    onSuccess: (data) => {
                        console.log('data', data)
                        if (data.status_code === 200) {
                            localStorage.setItem('access_token', data.access_token)
                            localStorage.setItem('expires_at', data.expires_at)
                            navigate('/')
                        }
                    },
                    onError: (error) => {
                        
                    }
                })
            }
        }
    }, [])
    return (
        <div>
            {children}
        </div>
    );
};

export default Authentication;