import React from 'react';
import Admin from '../admin/Admin';
import { Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import '../../App.css';

const BookList = () => {
    const { data: books } = useQuery({
        queryKey: ['books'], 
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/books');
            return response.json();
        },
        staleTime: 10000
    })
    
      // Các cột của bảng
    const columns = [
        {
          title: 'Tiêu đề',
          dataIndex: 'title',
          key: 'name',
        },
        {
          title: 'Tác giả',
          dataIndex: 'author',
          key: 'author',
        },
        {
          title: 'Giá (VNĐ)',
          dataIndex: 'price',
          key: 'price',
        },
        
      ];
    return (
        <div>
            <Admin item_active={'3'}></Admin>
            <div className='ml-96 py-16'>
                <div className='flex items-center gap-x-3 text-3xl'>
                    <p className=''>Sách đọc</p>
                    <p className=''>/</p>
                    <p className='text-sky-500'>Danh sách</p>
                </div>
                <div className='mt-16'>
                    <Table 
                        dataSource={books} 
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

export default BookList;