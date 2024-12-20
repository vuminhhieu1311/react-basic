import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Modal } from 'antd';
import '../../App.css';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import CustomerForm from './CustomerForm';
import Sidebar from '../sidebar/Sidebar';

const queryClient = new QueryClient()

const CustomerEdit = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [formValue, setFormValue] = useState(null)
    const submitRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const { data: customer, refetch } = useQuery({
        queryKey: ['customer'], 
        queryFn: async () => {
            const response = await fetch(`http://localhost:3001/customers/${id}`);
            const data = await response.json()
            form.setFieldsValue({
                fullname: data['fullname'],
                age: data['age'],
                phone: data['phone'],
                sex: data['sex'],
            });
            setFormValue({
                id: data['id'],
                fullname: data['fullname'],
                age: data['age'],
                phone: data['phone'],
                sex: data['sex'],
            })
            return data;
        },
        enabled: !!id, 
    })

    useEffect(() => {
        if (formValue && !isEqual(formValue, customer)) {
            submitRef.current.disabled = false
        } else {
            submitRef.current.disabled = true
        }
    }, [formValue, customer])

    function isEqual(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
      
        if (keys1.length !== keys2.length) {
            return false;
        }
      
        for (let key of keys1) {
            if (String(obj1[key]) !== String(obj2[key])) {
                return false;
            }
        }
        return true;
    }

    const submitCustomer = async (values) => {
        const response = await fetch(`http://localhost:3001/customers/${id}`, {
            method: 'PATCH',
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
                refetch();
                setIsModalOpen(true)
                setTitleModal('Cập nhật thành công!')
            },
            onError: (error) => {
                console.error("Error submitting form:", error);
                setIsModalOpen(true)
                setTitleModal('Cập nhật thất bại!')
            },
        })
    }
    return (
        <div>
            <Sidebar item_active={'1'}></Sidebar>
            <div className='ml-96 mr-16 py-16'>
                <div className='flex items-center gap-x-3 text-3xl'>
                    <p className=''>Khách hàng</p>
                    <p className=''>/</p>
                    <p className='text-sky-500'>Cập nhật</p>
                </div>
                <div className='mt-16'>
                    <CustomerForm form={form} onFinishForm={onFinishForm} formValue={formValue} setFormValue={setFormValue} submitRef={submitRef}></CustomerForm>
                </div>
                <Modal 
                    closable={false} 
                    className='text-center' 
                    title={titleModal} 
                    open={isModalOpen} 
                    onOk={() => setIsModalOpen(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                >
                </Modal>
            </div>
        </div>
    );
};

export default CustomerEdit;