import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ContactServices from '../../services/ContactServices';
import { useSelector } from "react-redux";
import '../../styles/containers.scss';
import { Card, Row, Col, Popconfirm, message } from 'antd';

export const DashboardPage = () => {
    const navigate = useNavigate();
    const stateLogin = useSelector((state) => state.auth);
    const [dataContact, setDataContact] = useState([]);

    useEffect(() => {
        findAllData();
    }, []);

    const findAllData = () => {
        ContactServices.FindAll(stateLogin.id).then((res)=> {
            setDataContact(res.contacts);
        })
    }

    const onUpdate = (item) => {
        navigate('/form/'+item.unique_id);
    }

    const onDelete = (item) => {
        ContactServices.Delete(item.unique_id).then(res => {
            message.success('Contacto Eliminado Correctamente');
            findAllData();
        })
    }

    const cancel = () => {
        
    }
    


    return (
        <div className='container'>
            <div className='title'> Mis Contactos </div>
            <button type="button" class="btn btn-primary" onClick={()=> navigate('/form')} style={{ margin : '15px 0 15px 88%' }}>Crear Contacto</button>

            <Row>
                {
                    dataContact.length > 0 ? 
                    dataContact.map((item, i) => (
                        <Card style={{marginRight: '15px', border: '1px solid'}} title={item.name} key={i} extra={<>
                            <button onClick={() => onUpdate(item)} type="button" class="btn btn-primary" style={{marginLeft: '15px', marginRight: '5px'}}><EditOutlined /></button>
                            <Popconfirm title="Seguro que desea eliminar este contacto?" onConfirm={() => onDelete(item)} onCancel={cancel} okText="Yes" cancelText="No">
                                <button type="button" class="btn btn-danger" ><DeleteOutlined /></button>
                            </Popconfirm></>}
                        >
                        {item.Phones.map((phone, o) => (
                            <p style={{lineHeight: '0.5'}}> <b>{phone.TypePhone.title}:</b> {phone.value} </p>
                        ))}
                      
                    </Card>
                    )) : 'No Tiene Contactos Registrados'
                       
                }
            </Row>
           
        </div>
    );
};