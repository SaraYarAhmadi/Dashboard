import React from "react";
import { BsBasket3 } from "react-icons/bs";
import { ImUsers } from "react-icons/im";
import { SiGoogleanalytics } from "react-icons/si";
import FeaturesItem from './FeaturesItem/FeaturesItem';
import Row from "react-bootstrap/Row";
import "./Features.css";
import SectionTitle from "./SectionTitle/SectionTitle";

const featuresItemData = [
  {
    id: 1,
    title: 'سفارش جدید',
    count: 103,
    icon: <BsBasket3 className="featureIcon" />,
    bgColor: '#00adb5',
  },
  {
    id: 2,
    title: 'کاربران جدید',
    count: 402,
    icon: <ImUsers className="featureIcon" />,
    bgColor: '#F7CD46',
  },
  {
    id: 3,
    title: 'بازدید جدید',
    count: 655,
    icon: <SiGoogleanalytics className="featureIcon" />,
    bgColor: '#D76F30',
  },
];

export default function Features() {



  return (
    <>
      <SectionTitle title="داشبورد"/>

      <div className='features my-5'>
        <Row className="w-100 mx-auto">
          {
            featuresItemData.map(featureItem => (
              <FeaturesItem key={featureItem.id} {...featureItem} />
            ))
          }
        </Row>


      </div>
    </>
  );
}
