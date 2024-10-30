import React, {useState, useEffect} from "react";
import moment from 'moment'
import {Link, useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import { Table, Button } from 'antd';

import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import View from "../../../components/Admin/View/View";
import {ContactsApi, Licenses} from "../../../api/index";
import {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons'

import {findGetParameter} from "../../../assets/scripts";

export default function Contacts(props){
    const {t} = useTranslation()
    const {locale} = props
    const id = findGetParameter('id')
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState([0])
    const [dataContacts, setDataContacts] = useState([])

    useEffect(()=>{
        getLicenses()
    }, [])


    const getLicenses = ()=>{

        ContactsApi.getAll({page: 0})
            .then(result=>{
                setTotal(result.data.page.totalElements)
                setSize(result.data.page.size)
                if(result.data.content.length && result.data.content[0].id){
                    setDataContacts(result.data.content.map((item, index)=>{

                        return {
                            ...item,
                            id: item.id,
                            key: index,
                            createdAt: moment(item.createdAt).format('DD-MM-YYYY'),
                            address: item.address[locale]

                        }
                    }))
                }
            })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },

        {
            title: t('Main.text21'),
            dataIndex: 'cellphone'
        },
        {
            title: t('id.Main.text54'),
            dataIndex: 'address'
        },
        {
            title: 'Email',
            dataIndex: 'mail'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record)=>{
                return(
                    <>

                        <Button style={{marginRight: '15px'}} onClick={()=>navigate(`/admin/contacts?id=${record?.id}`)}><EyeOutlined /></Button>
                        <Button onClick={()=>navigate(`/admin/edit-contact/${record?.id}`)}><EditOutlined /></Button>
                        <Button style={{marginLeft: '15px'}} onClick={()=>ContactsDelete(record?.id)}><DeleteOutlined /></Button>
                    </>
                )
            }
        },
    ]

    const ContactsDelete = (id)=>{
        let access = window.confirm('Вы действительно хотите удалить запись?')
        if(access){
            ContactsApi.deleteContact(id)
                .then(()=>{
                    setDataContacts(dataContacts.filter(item=>item.id!==id))
                })
        }
    }

    const paginationChange = (page)=>{

    }

    const getById = (id)=>{
        return ContactsApi.getContact(id)
    }

    return(
        <NavBar {...{locale}}>
            <AdminHeader>
                {
                    id?(<Link to={`/admin/contacts`}>{t('admin.logo-button2')}</Link>)
                        :(<Button type='primary' onClick={()=>navigate(`/admin/new-contact`)}>{t('admin.contacts-1')}</Button>)
                }
            </AdminHeader>
            {
                id?(<View {...props} apiGet={getById}/>):(<Table
                    columns={columns}
                    dataSource={dataContacts}
                    style={{marginTop: '30px', padding: '0px 20px'}}
                    pagination={{ showSizeChanger: false, pageSize: size, total: total, current: findGetParameter('page')?Number(findGetParameter('page')):1, onChange: paginationChange, hideOnSinglePage: true }}
                />)
            }
        </NavBar>
    )
}
