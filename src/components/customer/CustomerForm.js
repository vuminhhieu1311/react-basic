import { Button, Drawer, Form, Input, Modal, Radio, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateCustomer, useUpdateCustomer } from '../../react-query/hooks/request';

const CustomerForm = ({
    onClose, 
    open, 
    createInfo, 
    setCreateInfo,
    refetch,
    updateInfo,
}) => {
    const {t} = useTranslation()
    const [form] = Form.useForm();
    const [formValue, setFormValue] = useState(null)
    const [loadingButton, setLoadingButton] = useState(false)
    const submitRef = useRef(null)

    useEffect(() => {
        if (!updateInfo) {
            form.setFieldsValue({
                fullname: createInfo ? createInfo.fullname : null,
                age: createInfo ? createInfo.age : null,
                phone: createInfo ? createInfo.phone : null,
                sex: createInfo ? createInfo.sex || 'male' : 'male',
            })
            if (submitRef.current) {
                submitRef.current.disabled = false
            }
        } else {
            form.setFieldsValue({
                fullname: updateInfo ? updateInfo.fullname : null,
                age: updateInfo ? updateInfo.age : null,
                phone: updateInfo ? updateInfo.phone : null,
                sex: updateInfo ? updateInfo.sex : 'male',
            });
            setFormValue({
                id: updateInfo ? updateInfo.id : null,
                fullname: updateInfo ? updateInfo.fullname : null,
                age: updateInfo ? updateInfo.age : null,
                phone: updateInfo ? updateInfo.phone : null,
                sex: updateInfo ? updateInfo.sex || 'male' : 'male',
                updated_at: updateInfo ? updateInfo.updated_at : null,
            })
        }
    }, [updateInfo])

    const createaMutation = useCreateCustomer()
    const updateMutation = useUpdateCustomer()

    const onFinishForm = (values) => {
        values.updated_at = new Date().toISOString()
        setLoadingButton(true)
        if (!updateInfo) {
            createaMutation.mutate(values, {
                onSuccess: (data) => {
                    setCreateInfo(null)
                    form.setFieldsValue({
                        fullname: '',
                        age: '',
                        phone: '',
                        sex: 'male',
                    })
                    onClose()
                    refetch()
                },
                onError: (error) => {
                    Modal.error({
                        title: 'Có lỗi xảy ra!',
                        content: 'Vui lòng thử lại sau',
                    })
                },  
                onSettled: () => {
                    setLoadingButton(false)
                }
            })
        } else {
            updateMutation.mutate({id: updateInfo.id, data: values}, {
                onSuccess: (data) => {
                    form.setFieldsValue({
                        fullname: '',
                        age: '',
                        phone: '',
                        sex: 'male',
                    })
                    onClose()
                    refetch()
                },
                onError: (error) => {
                    Modal.error({
                        title: 'Có lỗi xảy ra!',
                        content: 'Vui lòng thử lại sau',
                    })
                },  
                onSettled: () => {
                    setLoadingButton(false)
                }
            })
        }
    }

    // Kiểm tra người dùng có update thông tin khách hàng không
    useEffect(() => {
        if (updateInfo) {
            if (updateInfo && formValue && !isEqual(formValue, updateInfo)) {
                if (submitRef.current) {
                    submitRef.current.disabled = false
                }
            } else {
                if (submitRef.current) {
                    submitRef.current.disabled = true
                }
            }
        }
    }, [formValue, updateInfo])

    function isEqual(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
      
        if (keys1.length !== keys2.length) {
            return false;
        }
      
        for (let key of keys1) {
            if (String(obj1[key]) !== String(obj2[key])) {
                return false;
            }
        }
        return true;
    }

    return (
        <div>
            <Drawer 
                title={!updateInfo ? t('create') : t('update')} 
                onClose={onClose} 
                open={open}
                width={400}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" ref={submitRef}
                            onClick={() => {form.submit()}}
                            loading={loadingButton}
                            iconPosition="end"
                        >
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form
                    layout={'vertical'}
                    form={form}
                    onFinish={onFinishForm}
                    initialValues={{
                        sex: 'male',
                    }}
                >
                    <Form.Item 
                        label={t('fullname')} name={"fullname"}
                        rules={[
                            { required: true, message: 'Please input your fullname!' },
                            { max: 50, message: 'Maximum 50 characters allowed.' }
                        ]}
                        className='font-bold'
                    >
                        <Input 
                            placeholder={t('placeholder', {feature: t('fullname').toLowerCase()})}
                            className='text-sm py-2 font-normal'
                            onChange={(e) => {
                                if (!updateInfo) {
                                    setCreateInfo({...createInfo, fullname: e.target.value})
                                } else {
                                    setFormValue({ ...formValue, fullname: e.target.value })
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item 
                        label={t('gender')}
                        className='text-sm font-bold' 
                        name={"sex"}
                    >
                        <Radio.Group 
                            onChange={(e) => {
                                if (!updateInfo) {
                                    setCreateInfo({...createInfo, sex: e.target.value})
                                } else {
                                    setFormValue({ ...formValue, sex: e.target.value })
                                }
                            }}
                        >
                            <Radio.Button value="male" className='font-normal'>{t('male')}</Radio.Button>
                            <Radio.Button value="female" className='font-normal'>{t('female')}</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item 
                        label={t('age')}
                        name={'age'}
                        rules={[
                            { required: true, message: 'Please input your age!' },
                            {
                                validator: (_, value) => {
                                if (!value || Number.isInteger(Number(value))) {
                                    return Promise.resolve();
                                }
                                    return Promise.reject("Please enter a valid integer!");
                                },
                            },
                            {
                                validator: (_, value) => {
                                if (parseInt(value) >= 0 && parseInt(value) <= 120) {
                                    return Promise.resolve();
                                }
                                    return Promise.reject("Age must be between 0 and 120!");
                                },
                            },
                        ]}
                        className='font-bold'
                    >
                        <Input 
                            placeholder={t('placeholder', {feature: t('age').toLowerCase()})}
                            className='text-sm py-2 font-normal' 
                            onChange={(e) => {
                                if (!updateInfo) {
                                    setCreateInfo({...createInfo, age: e.target.value})
                                } else {
                                    setFormValue({ ...formValue, age: e.target.value })
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item 
                        label={t('phone')}
                        name={"phone"} 
                        rules={[
                            { required: true, message: 'Please input your phone!' },
                            { max: 20, message: 'Maximum 20 characters allowed.' }
                        ]}
                        className='font-bold'
                    >
                        <Input 
                            placeholder={t('placeholder', {feature: t('phone').toLowerCase()})}
                            className='text-sm py-2 font-normal' 
                            onChange={(e) => {
                                if (!updateInfo) {
                                    setCreateInfo({...createInfo, phone: e.target.value})
                                } else {
                                    setFormValue({ ...formValue, phone: e.target.value })
                                }
                            }}
                        />
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default CustomerForm;
