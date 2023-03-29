import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Input, Checkbox, TreeSelect, message, Modal, Tabs } from 'antd';
import { LeftCircleOutlined, SaveOutlined, UsergroupAddOutlined, CloseOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import AuthServices from '../../../services/AuthServices';
import ContactServices from '../../../services/ContactServices';
import GroupService from '../../../services/GroupServices';
import { useSelector } from "react-redux";
import '../../../styles/containers.scss';


export const ContactsForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const stateLogin = useSelector((state) => state.auth);
    const { uuid } = useParams();
    const [favorite, setFavorite] = useState(false);
    const [dataTypes, setDataTypes] = useState([]);
    const [listPhones, setListPhones] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formGroup, setFormGroup] = useState(false);
    const [listGrups, setListGroups] = useState([]);

    const rules = [
        {
          required: true,
          message: "Esta información es obligatoria",
        },
        {
          whitespace: true,
          message: "Esta información es obligatoria",
        },
    ];

    useEffect(() => {
        getData();
        findGroups();
        if(uuid){
            findOne();
        }
    }, []);

   

    const findOne = () => {
        ContactServices.FindOne(uuid).then(async (res) => {
            console.log(res);

            form.setFieldsValue({
                name: res.contacts.name,
                favorite: res.contacts.favorite,
            });

            setFavorite(res.contacts.favorite);

            let arrayGroups = [];
            let arrayPhones = [];
            let jsonPhones = new Object();

            for (let i = 0; i < res.contacts.Phones.length; i++) {
                arrayPhones.push({
                    unique_id: res.contacts.Phones[i].unique_id,
                    type_id: res.contacts.Phones[i].type_id,
                    value: res.contacts.Phones[i].value,
                    type: res.contacts.Phones[i].TypePhone.title,
                    contact_id: res.contacts.Phones[i].contact_id,
                    state: res.contacts.Phones[i].state,
                    sync: true,
                    delete: false,
                    update: false
                });
                
                jsonPhones['treeSelect'+i] = res.contacts.Phones[i].TypePhone.title;
                jsonPhones['description'+i] = res.contacts.Phones[i].value;
            }

            setListPhones(arrayPhones);
            form.setFieldsValue(jsonPhones);

            for (let o = 0; o < res.contacts.groups.length; o++) {
                arrayGroups.push({
                    id: res.contacts.groups[o].id,
                    title: res.contacts.groups[o].title,
                    select: true,
                });
            }
            setListGroups(arrayGroups);
            
        })
    }

    const getData = () => {
        AuthServices.FindData(stateLogin.id).then(async (res) => {
            let arrayTypes = [];
            for (let i = 0; i < res.data.typesPhones.length; i++) {
                arrayTypes.push({
                    id:  res.data.typesPhones[i].id,
                    value: res.data.typesPhones[i].title,
                    title: res.data.typesPhones[i].title
                })
            }
            setDataTypes(arrayTypes);

            let arrayListPhones = [{
                unique_id: null,
                type_id: null,
                value: null,
                type: null,
                contact_id: null,
                state: 1,
                sync: false,
                delete: false,
                update: false
            }];

            setListPhones(arrayListPhones);
        })
    }

    const findGroups = () => {
        GroupService.FindAll({user_id: stateLogin.id}).then((res) => {
            let arrayGroups = [];
            setListGroups([]);
            for (let o = 0; o < res.groups.length; o++) {
                arrayGroups.push({
                    id: res.groups[o].id,
                    title: res.groups[o].title,
                    select: false,
                });
            }
            setListGroups(arrayGroups);
        })
    }

    const addItems = () => {
    
        setListPhones([{
            unique_id: null,
            type_id: null,
            value: null,
            type: null,
            contact_id: null,
            state: 1,
            sync: false,
            delete: false,
            update: false
        }, ...listPhones]);
    }

    const onChangeCheck = (e) => {
        setFavorite(e.target.checked);
    };

    const onChangeCheckGroups = (i, e) => {
        listGrups[i].select = e.target.checked;
        setListGroups(listGrups);
    };

    const openModalGroups = () => {
        setIsModalOpen(true);
    }

    const openFormGroup = () => {
        setFormGroup(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
 
    const saveFormGroup = () => {
        if(!form.getFieldValue('nameGroup')){
            message.error('Falta el nombre del grupo');
            return;
        }

        if(!form.getFieldValue('descriptionGroup')){
            message.error('Falta el nombre del grupo');
            return;
        }

        GroupService.Create({
            title: form.getFieldValue('nameGroup'),
            description: form.getFieldValue('descriptionGroup'),
            user_id: stateLogin.id
        }).then((res)=>{
            message.success('El grupo fue creado de forma correcta');
            findGroups();
            setFormGroup(false);
        })
       
    }


    const onFinish = (values) => {
        
        if(uuid){
            const params = {
                name: values.name, 
                favorite: favorite, 
                user_id: stateLogin.id, 
                state: 1,
                phones: [],
                groups: [],
            }

            ContactServices.Update(uuid, params).then((res) => {
                message.success('Se actualizo el contacto correctamente');
                navigate('/');
            })
        }else{
            let arrayPhones = [];
            let arrayGroups = [];

            for (let i = 0; i < listPhones.length; i++) {
                arrayPhones.push({
                    type: dataTypes.find((r) => (r.title == form.getFieldValue('treeSelect'+i))).id,
                    value: form.getFieldValue('description'+i)
                })
            }
    
            for (let o = 0; o < listGrups.length; o++) {
                if(listGrups[o].select){
                    arrayGroups.push(listGrups[o].id);
                }
            }
            
            const params = {
                name: values.name, 
                favorite: favorite, 
                user_id: stateLogin.id, 
                state: 1,
                phones: arrayPhones,
                groups: arrayGroups,
            }
    
            ContactServices.Create(params).then((res) => {
                message.success('Se guardo el contacto correctamente');
                navigate('/');
            })
        }
    }



    const onFinishFailed = () => {
        
    }

    const items = [
        {
          key: '1',
          label: `Información`,
          children: <>
            <Row>
                <Col span={12}>
                    <Form.Item label="Nombre" name="name" rules={rules}>
                        <Input className="input_form" allowClear={true}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label=" " name="favorite">
                        <Checkbox checked={favorite} onChange={onChangeCheck}>Favoritos</Checkbox>
                    </Form.Item>
                </Col> 
            </Row>
          </>,
        },
        {
            key: '2',
            label: `Campos`,
            children: <>
                {   
                listPhones.length > 0 ? 
                listPhones.map((item, i) => (
                    <Row key={i}>
                        <Col span={8}>
                            <Form.Item label="Tipo" name={'treeSelect'+i} rules={rules}>
                                <TreeSelect showSearch style={{ width: '100%' }} value={item.type} allowClear treeDefaultExpandAll treeData={dataTypes} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label='Descripción' name={'description'+i} rules={rules}>
                                <Input className="input_form" allowClear={true}/>
                            </Form.Item>
                        </Col>
                    </Row>
                )) : ''
                }
                <button type="button" class="btn btn-primary" onClick={()=> addItems()}  style={{ margin : '15px 0 15px 84%' }}><AppstoreAddOutlined className='iconButton' />Añadir otro campo</button>
            </>,
        },
        {
          key: '3',
          label: `Grupos`,
          children: <>
            <Row >
                {
                    listGrups.map((item, i) => {
                        if(item.select){
                            return <Col span={24}>{item.title}</Col>
                        }
                    })
                }
            </Row>
            <button type="button" class="btn btn-secondary" onClick={()=> openModalGroups()}  style={{ margin : '15px 0 15px 87%' }}><UsergroupAddOutlined className='iconButton' />Asociar grupo</button>
          </>,
        },
    ];
    return (
        <div className='container'><br /> 
        <div className='titleReturn'> 
            <button type="button" class="btn" onClick={()=> navigate('/')} ><LeftCircleOutlined className='iconsReturn' /></button>
            <div> {uuid ? 'Actualizar Contacto' : 'Crear Nuevo Contacto'} </div>
        </div> 
           

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
                <Tabs defaultActiveKey="1" items={items} />

                <Row>
                    <Col span={24}>
                        <button type="submit" class="btn btn-success" style={{ margin : '0px 0 0px 90%' }}><SaveOutlined className='iconButton' />Guardar</button>
                    </Col>
                </Row>
                
                
                
                <Modal visible={isModalOpen} closable={false} width={800} centered title={"Mis Grupos"} footer={null}>
                    {
                        formGroup ? 
                        <Row >
                            <Col span={10}>
                                <Form.Item label="Nombre" name="nameGroup">
                                    <Input className="input_form" allowClear={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item label="Descripción" name="descriptionGroup">
                                    <Input className="input_form" allowClear={true}/>
                                </Form.Item>
                            </Col> 
                            <Col span={4}>
                                <Form.Item label=" " name="buttonSaveGroup">
                                    <button type="button" class="btn btn-primary"onClick={()=> saveFormGroup()}><SaveOutlined className='iconButton' />Guardar</button>
                                </Form.Item>
                            </Col>
                        </Row> : ''
                    }
                    {
                        !formGroup ? 
                        <Row style={{height: '150px', overflowY: 'scroll'}}>
                            {listGrups.map((item, i) => (
                                <Col span={24} style={{height: '30px'}}>
                                    <Form.Item label=" " name={'check'+i}>
                                        <Checkbox onChange={(e) => onChangeCheckGroups(i, e)}>{item.title}</Checkbox>
                                    </Form.Item>
                                </Col>
                            ))}
                            
                        </Row> : 'No hay grupos asociados'
                    }
                    <br />
                    <br />
                    <div style={{display: 'flex'}}>
                    {
                        !formGroup ? 
                        <button type="button" class="btn btn-success"onClick={()=> openFormGroup()} style={{ margin : '0px 0 0px 0px' }}><UsergroupAddOutlined className='iconButton' />Crear</button> : ''
                    }
                        <button type="button" class="btn btn-primary"onClick={()=> closeModal()} style={{ margin : !formGroup ? `0px 0 0px 75%` : `0px 0 0px 85%`}}><CloseOutlined className='iconButton' />Cerrar</button>
                    </div>
                    


                    
                </Modal>
                

                
            </Form>
            <br /><br />
           
        </div>
    );
};