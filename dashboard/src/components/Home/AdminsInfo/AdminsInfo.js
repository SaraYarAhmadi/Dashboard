import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import adminsdetails from '../../../adminsdetails'
import { FaInstagram } from "react-icons/fa";
import { TbBrandTelegram } from "react-icons/tb";
import { FiTwitter } from "react-icons/fi";
import './AdminsInfo.css'

export default function AdminsInfo() {
    const [allAdminsInfo, setAllAdminsInfo] = useState(adminsdetails)

    return (
        <div>

            <CardGroup className='AdminsInfo' >
                {
                    allAdminsInfo.map(adminsInfo => (
                        <Card key={adminsInfo.id}>
                            <div className='adminsImg w-100'>
                                <Card.Img className='w-100 h-100' variant="top" src={adminsInfo.img} />
                            </div>
                            
                            <Card.Body className='text-center'>
                                <Card.Title >{adminsInfo.title}</Card.Title>
                                <Card.Text >{adminsInfo.firstName}-{adminsInfo.lastName}</Card.Text>

                               
                            </Card.Body>
                            <Card.Footer className='cardIcons'>
                                <FaInstagram/>
                                <TbBrandTelegram/>
                                <FiTwitter/>
                            </Card.Footer>
                        </Card>
                    ))
                }


            </CardGroup></div>
    )
}
