import React from 'react';
import Layout from '../layout/Layout';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import Cookies from 'js-cookie';

const Setting = () => {
    const {t, i18n} = useTranslation()
    const handleLanguageChange = (value) => {
        i18n.changeLanguage(value)
        Cookies.set('language', value, { expires: 30 });
    }
    return (
        <div>
            <Layout>
                <div className='flex items-center gap-x-3 text-3xl'>
                    <p className=''>{t("setting")}</p>
                </div>
                <div className='mt-8'>
                    <div className='flex gap-x-3 items-center'>
                        <div className='font-bold'>{t('language')}:</div>
                        <Select
                            defaultValue={i18n.language}
                            style={{
                                width: 120,
                            }}
                            onChange={handleLanguageChange}
                            options={[
                                {
                                    value: 'en',
                                    label: t('en'),
                                },
                                {
                                    value: 'vi',
                                    label: t('vi'),
                                }
                            ]}
                        />
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Setting;
