import { Button, Form, Input, Radio } from 'antd';
import React from 'react';

const CustomerForm = ({form, onFinishForm, formValue, setFormValue, submitRef}) => {
    return (
        <div className='shadow-md bg-gray-50 p-8 rounded-sm'>
            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinishForm}
                >
                <Form.Item 
                    label="Tên" name={"fullname"}
                    rules={[{ required: true, message: 'Please input your fullname!' }]}
                >
                    <Input 
                        placeholder="Nhập tên..." 
                        className='text-xl'
                        onChange={(e) => formValue ? setFormValue({ ...formValue, fullname: e.target.value }) : ''}
                    />
                </Form.Item>
                <Form.Item 
                    label="Tuổi" 
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
                    ]}
                >
                    <Input 
                        placeholder="Nhập tuổi..."
                        className='text-xl' 
                        onChange={(e) => formValue ? setFormValue({ ...formValue, age: e.target.value }) : ''}
                    />
                </Form.Item>
                <Form.Item 
                    label="Giới tính" 
                    className='text-xl' 
                    name={"sex"}
                >
                <Radio.Group 
                    onChange={(e) => formValue ? setFormValue({ ...formValue, sex: e.target.value }) : ''}
                    defaultValue={"male"}
                >
                    <Radio.Button value="male">Nam</Radio.Button>
                    <Radio.Button value="female">Nữ</Radio.Button>
                </Radio.Group>
                </Form.Item>
                <Form.Item 
                    label="Số điện thoại" 
                    name={"phone"} 
                    rules={[{ required: true, message: 'Please input your phone!' }]}
                >
                    <Input 
                        placeholder="Nhập số điện thoại..." 
                        className='text-xl' 
                        onChange={(e) => formValue ? setFormValue({ ...formValue, phone: e.target.value }) : ''}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" ref={submitRef}>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CustomerForm;