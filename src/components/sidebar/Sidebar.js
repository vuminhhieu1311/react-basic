import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Sidebar = ({ item_active }) => {
    const { SubMenu } = Menu;
    return (
        <div className='fixed top-0 bottom-0 left-0 text-xl py-5 shadow-md w-80'>
            <div className='pl-7 mb-7 text-3xl font-bold text-sky-500'>Amin</div>
            <Menu
                defaultSelectedKeys={[item_active]}
                defaultOpenKeys={['sub1']}
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
                    <Menu.Item key="1">
                        <Link to="/customers">Danh sách</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/customers/create">Tạo mới</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
};

export default Sidebar;