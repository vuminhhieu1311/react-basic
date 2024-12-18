import React from 'react';
import Admin from '../admin/Admin';
import { Button, Table } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import '../../App.css';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CustomerList = () => {
    const { data: customers, refetch } = useQuery({
        queryKey: ['customers'], 
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/customers');
            return response.json();
        },
        staleTime: 10000
    })
    
    const deleteCustomer = async (id) => {
        const response = await fetch(`http://localhost:3001/customers/${id}`, {
            method: 'DELETE',
        });
        return response.json()
    }
    const mutation = useMutation({mutationFn: deleteCustomer})

    const handleDeleteCustomer = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            mutation.mutate(id, {
                onSuccess: (data) => {
                    refetch();
                    alert('Xóa thành công!')
                },
                onError: (error) => {
                    alert('Xóa thất bại!')
                },
            })
        }
        
    }

    const columns = [
        {
          title: 'Tên',
          dataIndex: 'fullname',
          key: 'name',
        },
        {
          title: 'Tuổi',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Giới tính',
          dataIndex: 'sex',
          key: 'sex',
          render: (text) => <span>{text === 'male' ? 'Nam' : 'Nữ'}</span>,
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
            title: 'Giới tính',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <div className='flex gap-x-4'>
                <Link to={`/customers/${text}/edit`}>
                    <Button type="primary"><EditOutlined /></Button>
                </Link>
                <Button type="primary" danger onClick={() => handleDeleteCustomer(text)}><DeleteOutlined /></Button>
            </div>,
        }
      ];
    return (
        <div>
            <Admin item_active={'1'}></Admin>
            <div className='ml-96 py-16'>
                <div className='flex items-center gap-x-3 text-3xl'>
                    <p className=''>Khách hàng</p>
                    <p className=''>/</p>
                    <p className='text-sky-500'>Danh sách</p>
                </div>
                <div className='mt-16'>
                    <Table 
                        dataSource={customers} 
                        columns={columns} 
                        className='' 
                        pagination={{
                            pageSize: 10,
                            style: { fontSize: '20px' }, // Chỉnh cỡ chữ của phân trang
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerList;