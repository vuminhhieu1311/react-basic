import React from 'react';
import '../../App.css';
import { CaretDownOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons';

import { Dropdown, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Header = ({openSidebar, toggleSidebar}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const items = [
        {
          key: '1',
          label: t('setting'),
          icon: <SettingOutlined />,
        },
    ];
    const handleDropdownClick = ({ key }) => {
        if (key === '1') {
            navigate('/settings')
        }
    };
    return (
        <div className={`fixed top-0 right-0 h-12 p-4 shadow-md bg-white header z-50 flex items-center justify-between ${openSidebar ? 'w-[calc(100%-16rem)]' : 'w-[calc(100%-4rem)]'}`}>
            <MenuOutlined 
                className='cursor-pointer' 
                onClick={() => {toggleSidebar()}}
            />
            <Dropdown
                menu={{
                    items,
                    onClick: handleDropdownClick
                }}
            >
                <div className='cursor-pointer'>
                    <Space>
                        {t('account')}
                        <CaretDownOutlined />
                    </Space>
                </div>
            </Dropdown>
        </div>
    );
};

export default Header;
