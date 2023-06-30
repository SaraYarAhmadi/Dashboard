import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { adminsdetails } from '../../../adminsdetails'
import { FaInstagram } from "react-icons/fa";
import { TbBrandTelegram } from "react-icons/tb";
import { FiTwitter } from "react-icons/fi";
import SectionTitle from '../Features/SectionTitle/SectionTitle';
import './AdminsInfo.css'

export default function AdminsInfo() {
    const [allAdminsInfo, setAllAdminsInfo] = useState(adminsdetails)

    return (
        <div>
            <SectionTitle title={"پشتیبانی"} />

            <CardGroup className='AdminsInfo' >
                {
                    allAdminsInfo.map(adminsInfo => {
                        const random = Math.random();
                        const isOnline = random > 0.5;

                        return (
                            <Card key={adminsInfo.id} className='admin-cart-item mx-md-2'>
                                <div className='adminsImg w-80'>
                                    <Card.Img className='w-100 h-100' variant="top" src={adminsInfo.img} />
                                </div>

                                <Card.Body className='text-center'>
                                    <Card.Title >{adminsInfo.title}</Card.Title>
                                    <Card.Text >{adminsInfo.firstName}-{adminsInfo.lastName}</Card.Text>
                                </Card.Body>
                                <Card.Footer className='cardIcons'>
                                    <a href="https://www.instagram.com/sara/" target="_blank" >
                                        <FaInstagram />
                                    </a>
                                    <p className={isOnline ? "text-success" : "text-danger"} > {isOnline ? "آنلاین" : "آفلاین"} </p>
                                    <a href="https://www.instagram.com/sara/" target="_blank" >
                                        <TbBrandTelegram />
                                    </a>

                                </Card.Footer>
                            </Card>
                        )
                    }
                    )
                }
            </CardGroup>
        </div>
    );
}
