import { Form } from 'antd';
import React from 'react';
import '../../App.css';
import CustomerForm from './CustomerForm';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const queryClient = new QueryClient()

const CustomerCreate = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    
    const submitCustomer = async (values) => {
        const response = await fetch(`http://localhost:3001/customers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        return response.json()
    }

    const mutation = useMutation({mutationFn: submitCustomer})

    const onFinishForm = (values) => {
        mutation.mutate(values, {
            onSuccess: (data) => {
                queryClient.invalidateQueries("customers");
                alert('Thêm mới thành công')
                navigate("/");
            },
            onError: (error) => {
                alert('Thêm mới thất bại')
            },  
        })
    }
    return (
        <div>
            <Sidebar item_active={'2'}></Sidebar>
            <div className='ml-96 mr-16 py-16'>
                <div className='flex items-center gap-x-3 text-3xl'>
                    <p className=''>Khách hàng</p>
                    <p className=''>/</p>
                    <p className='text-sky-500'>Tạo mới</p>
                </div>
                <div className='mt-16'>
                    <CustomerForm form={form} onFinishForm={onFinishForm}></CustomerForm>
                </div>
            </div>
        </div>
    );
};

export default CustomerCreate;