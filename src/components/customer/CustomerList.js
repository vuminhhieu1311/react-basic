import React from 'react';
import { Button, Pagination, Table } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import '../../App.css';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const CustomerList = () => {
    const navigate = useNavigate();
    const searchQuery = new URLSearchParams(useLocation().search);
    var page = searchQuery.get('page');
    const { data: customers, refetch } = useQuery({
        queryKey: ['customers', page], 
        queryFn: async () => {
            if (!page) {
                page = 1
            }
            const response = await fetch(`http://localhost:3001/customers?_page=${page}`);
            return response.json();
        },
        staleTime: 10000,
        keepPreviousData: true
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

    const handlePageChange = (page) => {
        navigate(`/customers?page=${page}`);
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
            <Sidebar item_active={'1'}></Sidebar>
            <div className='ml-96 py-16'>
                <div className='flex items-center gap-x-3 text-3xl'>
                    <p className=''>Khách hàng</p>
                    <p className=''>/</p>
                    <p className='text-sky-500'>Danh sách</p>
                </div>
                <div className='mt-16'>
                    <Table 
                        dataSource={customers ? customers.data : ''} 
                        columns={columns} 
                        pagination={false} 
                    />
                    <div className='mt-4'>
                        <Pagination
                            current={page}    // Trang hiện tại
                            pageSize={10}      // Số lượng bản ghi mỗi trang
                            total={customers ? customers.items : ''}       // Tổng số bản ghi
                            showSizeChanger={false}
                            onChange={handlePageChange} // Hàm gọi khi thay đổi trang
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerList;