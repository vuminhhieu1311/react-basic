import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useLogin } from '../../react-query/hooks/login';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [error, setError] = useState('')
    
    const mutation = useLogin()

    const onFinish = async (values) => {
        setLoadingBtn(true)
        mutation.mutate(values, {
            onSuccess: (data) => {
                if (data.status_code === 200) {
                    localStorage.setItem('access_token', data.access_token)
                    localStorage.setItem('expires_at', data.expires_at)
                    localStorage.setItem('refresh_token', data.refresh_token)
                    localStorage.setItem('rt_expires_at', data.rt_expires_at)
                    navigate('/')
                } else if (data.status_code === 401) {
                    setError('Email hoặc mật khẩu không chính xác!')
                }
            },
            onError: (error) => {
                
            },  
            onSettled: () => {
                setLoadingBtn(false)
            }
        })
    }
    return (
        <div className='w-screen h-screen flex items-center justify-center bg-gradient-to-r from-white to-blue-200'>
            <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                <div className='font-bold text-center py-3 text-2xl bg-blue-500 text-white'>LOGIN</div>
                <div className='p-12'>
                    <Form
                        layout={'vertical'}
                        onFinish={onFinish}
                        autoComplete='off'
                    >
                        <Form.Item 
                            name={'email'}
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: "email", message: 'Please input your email!' },
                            ]}
                            className='font-bold'
                        >
                            <Input 
                                placeholder={'Email'}
                                className='text-base py-2 px-5 font-normal w-80 rounded-full'
                            />
                        </Form.Item>
                        
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your password!',
                                },
                            ]}
                            className='mb-3'
                        >
                            <Input.Password
                                placeholder={'Pasword'}
                                className='text-base py-2 px-5 font-normal w-80 rounded-full'
                            />
                        </Form.Item>
                        <div className='text-[#ff4d4f] font-bold'>{error}</div>

                        <Form.Item label={null} className='flex justify-center w-full'>
                            <Button type="primary" htmlType="submit" className='py-5 px-16 font-bold' loading={loadingBtn}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;