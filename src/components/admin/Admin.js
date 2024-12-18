import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Admin = ({ item_active }) => {
    const { SubMenu } = Menu;
    return (
        <div className='fixed top-0 bottom-0 left-0 text-xl py-5 shadow-md w-80'>
            <div className='pl-7 mb-7 text-3xl font-bold text-sky-500'>Amin</div>
            <Menu
                defaultSelectedKeys={[item_active]}
                defaultOpenKeys={[item_active === '1' || item_active === '2' ? 'sub1' : 'sub2']}
                mode="inline"
                className='w-full text-2xl font-semibold'
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <span>Khách hàng</span>
                        </span>
                    }
                >
                    <Menu.Item key="1" className={ item_active === 1 ? 'ant-menu-item-selected' : ''}>
                        <Link to="/customers">Danh sách</Link>
                    </Menu.Item>
                    <Menu.Item key="2" className={ item_active === 2 ? 'ant-menu-item-selected' : ''}>
                        <Link to="/customers/create">Tạo mới</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                        <span>Sách</span>
                        </span>
                    }
                >
                    <Menu.Item key="3" className={ item_active === 3 ? 'ant-menu-item-selected' : ''}>                        
                        <Link to="/books">Danh sách</Link>
                    </Menu.Item>
                    <Menu.Item key="4" className={ item_active === 4 ? 'ant-menu-item-selected' : ''}>Tạo mới</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
};

export default Admin;