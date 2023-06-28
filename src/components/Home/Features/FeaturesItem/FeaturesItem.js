import React from "react";
import Col from "react-bootstrap/Col";
import CountEffector from '../../../common/CountEffector/CountEffector'

export default function FeaturesItem({ title, icon, count, bgColor }) {
    


    return (
        <Col xs={12} md={4} className="mb-3">
            {
                console.log('featureItem-reRender')
            }
            <div className="featureItem" style={{ backgroundColor: bgColor }}>
                <div className="featureIconHolder">
                    <span className="featureTitle"> {title} </span>
                    {icon}
                </div>
                <div className="featureContainer">
                    <CountEffector count={count}/>
                </div>
            </div>
        </Col>
    );
}
