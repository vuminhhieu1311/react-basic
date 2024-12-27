import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, Pagination, Popconfirm, Skeleton, Table } from 'antd';
import '../../App.css';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

import Layout from '../layout/Layout';
import { useTranslation } from 'react-i18next';
import CustomerForm from './CustomerForm';
import { useCustomersPaginate, useDeleteCustomer } from '../../react-query/hooks/request';
import { getCustomer } from '../../api/getCustomer';
import { Input } from 'antd';
const { Search } = Input;

const CustomerList = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [createInfo, setCreateInfo] = useState(null)
    const [updateInfo, setUpdateInfo] = useState(null)

    const navigate = useNavigate();
    const searchQuery = new URLSearchParams(useLocation().search);
    var page = searchQuery.get('page');
    var search = searchQuery.get('search');
    if (!page) {
        page = 1
    }
    if (!search) {
        search = ''
    }

    const { data: customers, refetch, isError, isLoading } = useCustomersPaginate(search, page)
    useEffect(() => {
        if (isError) {
            Modal.error({
                title: 'Có lỗi xảy ra!',
                content: 'Vui lòng thử lại sau',
            });
        }
    }, [isError]);
    const mutation = useDeleteCustomer()

    const handleDeleteCustomer = (id) => {
        return new Promise((resolve) => {
            mutation.mutate(id, {
                onSuccess: (data) => {
                    refetch();
                },
                onError: (error) => {
                    Modal.error({
                        title: 'Có lỗi xảy ra!',
                        content: 'Vui lòng thử lại sau',
                    })
                },
                onSettled: () => {
                    resolve(null)
                }
            })
        });
    }

    const handlePageChange = (page) => {
        navigate(`/customers?${search !== '' ? 'search='+ search + '&' : ''}page=${page}`);
    }

    const columns = useMemo(() => [
        {
            title: t('fullname'),
            dataIndex: 'fullname',
            key: 'name',
            render: (text, record) => record.loading ? (
                <Skeleton active paragraph={false} />
            ) : (<span>{text}</span>),
        },
        {
            title: t('birthdate'),
            dataIndex: 'birthdate',
            key: 'birthdate',
            render: (text, record) => record.loading ? (
                <Skeleton active paragraph={false} />
            ) : (<span>{text}</span>),
        },
        {
            title: t('gender'),
            dataIndex: 'sex',
            key: 'sex',
            render: (text, record) => record.loading ? (
                <Skeleton active paragraph={false} />
            ) : (<span>{t(text === 0 ? 'male' : 'female')}</span>),
        },
        {
            title: t('phone'),
            dataIndex: 'phone',
            key: 'phone',
            render: (text, record) => record.loading ? (
                <Skeleton active paragraph={false} />
            ) : (<span>{text}</span>),
        },
        {
            title: t('manager'),
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => 
                record.loading ? (
                    <div className='flex gap-x-4'>
                        <Skeleton active paragraph={false} />
                        <Skeleton active paragraph={false} />
                    </div>
                ) : (
                    <div className='flex gap-x-4'>
                        <Button 
                            type="primary" 
                            onClick={async () => {
                                try {
                                    const customer = await getCustomer(text)
                                    setUpdateInfo(customer.data)
                                    setOpen(true);
                                } catch (e) {
                                    Modal.error({
                                        title: 'Lỗi',
                                        content: 'Lỗi lấy thông tin người dùng. Vui lòng thử lại sau!'
                                    })
                                }
                            } 
                        }><EditOutlined /></Button>
                        <Popconfirm
                            title="Are you sure you want to delete this item?"
                            onConfirm={() => handleDeleteCustomer(text)}
                        >
                            <Button type="primary" danger><DeleteOutlined /></Button>
                        </Popconfirm>
                    </div>
                ),
        }
    ], []) ;

    const onClose = () => {
        setOpen(false);
    };

    const onSearch = (value, _e, info) => {
        navigate(`/customers${value !== '' ? '?search='+ value : ''}`);
    } 
    
    return (
        <div>
            
            <Layout item_active={'1'}>
                <div className='flex items-center gap-x-3 text-3xl'>
                    <p className=''>{t("customer")}</p>
                    <p className=''>/</p>
                    <p className='text-sky-500'>{t("list")}</p>
                </div>
                <div className='mt-8'>
                    <div className=''>
                        <Search 
                            placeholder="Input name, phone number..." 
                            className='w-80 text-sm' 
                            onSearch={onSearch} 
                            enterButton 
                            defaultValue={search}
                        />
                    </div>
                    <div className='text-end my-4'>
                        <Button 
                            type="primary" 
                            className='py-5' 
                            onClick={() => {
                                setUpdateInfo(null)
                                setOpen(true);
                            }} 
                            icon={<PlusOutlined />}
                        >
                            {t('create')}
                        </Button>
                    </div>
                    <Table 
                        dataSource={isLoading ? Array(10).fill({ loading: true }) : (isError ? null : customers.data.customers.data)} 
                        columns={columns} 
                        pagination={false} 
                        scroll={{ x: 650 }}
                    />
                    <div className='mt-4'>
                        <Pagination
                            current={page}    
                            pageSize={10}
                            total={customers ? customers.data.customers.total : ''}
                            showSizeChanger={false}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </Layout>
            <CustomerForm 
                onClose={onClose} 
                open={open} 
                createInfo={createInfo}
                setCreateInfo={setCreateInfo}
                refetch={refetch}
                updateInfo={updateInfo}
            ></CustomerForm>
        </div>
    );
};

export default CustomerList;
