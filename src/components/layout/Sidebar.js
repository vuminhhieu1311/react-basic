import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const Sidebar = ({open, item_active }) => {
    const { t } = useTranslation();
    return (
        <div className={`sidebar fixed top-0 bottom-0 left-0 text-xl py-5 shadow-md z-50 ${open ? 'w-64' : 'w-16'}`}>
            <div className='pl-7 mb-7 text-3xl font-bold min-h-9'>{open ? t('manager') : ''}</div>
            <Menu
                defaultSelectedKeys={[item_active]}
                defaultOpenKeys={['sub1']}
                mode="inline"
                className='w-full text-xl font-semibold bg-transparent'
            >
                <Menu.Item key="1" className={`sidebar-item ${open ? '' : 'p-0 text-center'}`}>
                    {open ? (
                        <Link to="/customers">{ t('customer') }</Link>
                    ) : (
                        <Link to="/customers" title='Khách hàng'><UserOutlined /></Link>
                    )}
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default Sidebar;
