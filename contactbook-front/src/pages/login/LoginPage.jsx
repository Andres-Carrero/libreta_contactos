import React, { useEffect, useState } from 'react';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Form, Row, Col, Image } from 'antd';
import { startLogin } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import "../../styles/login.scss";

export const LoginPage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch(startLogin(values)).then((response) => {});
    }

    const onFinishFailed = () => {
        
    }
    return (
        <div className='LoginContainter'>
            <div className='LoginImg'>
                .
            </div>
            <div className='LoginForm'>
                <Form
                    name="basic"
                    labelCol={{ span: 14 }}
                    wrapperCol={{ span: 23 }}
                    layout="vertical"
                    className={"animate__animated animate__fadeIn"}
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    preserve={false}
                >
              
                        <Row>
                            <Col span={24} className='LoginFormat'>
                                <h1>Iniciar Sesión</h1>
                            </Col>
                            <Col span={24} className='LoginFormat'>
                                <Form.Item label="Email" name="email" className='LoginInput'>
                                    <Input allowClear={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={24} className='LoginFormat'>
                                <Form.Item label="Contraseña" name="password"   className='LoginInput'>
                                    <Input.Password  iconRender={(passwordVisible) => (passwordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                                </Form.Item>
                            </Col>
                            <Col span={24} className='LoginFormat'>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Iniciar Sesión</Button>
                                </Form.Item>
                            </Col>
                        </Row>

                        
                       
           
                </Form>
                
            </div>
        </div>
    );
};