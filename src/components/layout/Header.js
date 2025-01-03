import React from 'react';
import '../../App.css';
import { CaretDownOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons';

import { Button, Dropdown, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../react-query/hooks/logout';

const Header = ({openSidebar, toggleSidebar}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const items = [
        {
            key: '1',
            label: t('setting'),
            icon: <SettingOutlined />,
        },
        {
            key: '2',
            label: 'Đăng xuất',
        },
    ];

    const logoutMutation = useLogout()
    const handleDropdownClick = ({ key }) => {
        switch (key) {
            case '1':
                navigate('/settings')
                break;
            case '2':
                document.body.style.cursor = 'progress';
                logoutMutation.mutate([], {
                    onSuccess: (data) => {
                        if (data.status_code === 200) {
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('expires_at')
                            localStorage.removeItem('refresh_token')
                            localStorage.removeItem('rt_expires_at')
                            navigate('/login')
                        } 
                    },
                    onSettled: () => {
                        document.body.style.cursor = 'default';
                    }
                })
                
                break;
            default:
                break;
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
