import { Button, Col, DatePicker, Drawer, Form, Input, Modal, Radio, Row, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateCustomer, useUpdateCustomer } from '../../react-query/hooks/request';
import dayjs from 'dayjs';

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
        let info = null
        if (!updateInfo) {
            info = createInfo
            if (submitRef.current) {
                submitRef.current.disabled = false
            }
        } else {
            info = updateInfo
            setFormValue({
                id: updateInfo ? updateInfo.id : null,
                fullname: updateInfo ? updateInfo.fullname : null,
                birthdate: updateInfo ? updateInfo.birthdate : null,
                phone: updateInfo ? updateInfo.phone : null,
                sex: updateInfo ? String(updateInfo.sex) || '0' : '0',
                created_at: updateInfo ? updateInfo.created_at : null,
                updated_at: updateInfo ? updateInfo.updated_at : null,
            })
        }
        form.setFieldsValue({
            fullname: info ? info.fullname : null,
            birthdate: info ? dayjs(info.birthdate, 'YYYY-MM-DD') : null,
            phone: info ? info.phone : null,
            sex: info ? String(info.sex || '0') : '0',
        });
    }, [updateInfo])

    const createaMutation = useCreateCustomer()
    const updateMutation = useUpdateCustomer()

    const onFinishForm = (values) => {
        values.birthdate = values.birthdate.format("YYYY-MM-DD") 
        setLoadingButton(true)
        if (!updateInfo) {
            createaMutation.mutate(values, {
                onSuccess: (data) => {
                    setCreateInfo(null)
                    form.setFieldsValue({
                        fullname: '',
                        birthdate: '',
                        phone: '',
                        sex: 0,
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
                        birthdate: '',
                        phone: '',
                        sex: 0,
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

    const handleDateChange = (date, dateString) => {
        if (!updateInfo) {
            setCreateInfo({...createInfo, birthdate: dateString})
        } else {
            setFormValue({ ...formValue, birthdate: dateString })
        }
    };

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
                        sex: '0',
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
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item 
                                label={t('gender')}
                                className='text-sm font-bold leading-5' 
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
                                    <Radio.Button value="0" className='font-normal'>{t('male')}</Radio.Button>
                                    <Radio.Button value="1" className='font-normal'>{t('female')}</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item 
                                label={t('birthdate')}
                                name={'birthdate'}
                                className='font-bold leading-5'
                                rules={[
                                    { required: true, message: 'Vui lòng chọn ngày!' }
                                ]}
                            >
                                <DatePicker
                                    className='font-normal' 
                                    onChange={handleDateChange}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    
                    <Form.Item 
                        label={t('phone')}
                        name={"phone"} 
                        rules={[
                            { required: true, message: 'Please input your phone!' },
                            {
                                validator: (_, value) =>
                                    value && /^[0-9]+$/.test(value)
                                    ? Promise.resolve()
                                    : Promise.reject(new Error("Phone number is invalid")),
                            },
                            { min: 10, message: 'Minimum 10 characters allowed.' },
                            { max: 15, message: 'Maximum 15 characters allowed.' }
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
