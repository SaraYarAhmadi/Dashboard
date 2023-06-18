import React from "react";
import Col from "react-bootstrap/Col";

export default function FeaturesItem({ title, icon, count, bgColor }) {
    return (
        <Col xs={12} md={4} className="mb-3">
            <div className="featureItem" style={{ backgroundColor: bgColor }}>
                <div className="featureIconHolder">
                    <span className="featureTitle"> {title} </span>
                    {icon}
                </div>
                <div className="featureContainer">
                    <span className="featureMoney"> {count} </span>
                </div>
            </div>
        </Col>
    );
}
