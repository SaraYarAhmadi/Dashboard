import React from "react";
import { BsBasket3 } from "react-icons/bs";
import { ImUsers } from "react-icons/im";
import { SiGoogleanalytics } from "react-icons/si";


import "./Features.css";

export default function Features({ isDark }) {
  return (
    <div className={`features`}>
      <div className="featureItem">
        <div className="featureIconHolder">
          <span className="featureTitle">سفارش جدید</span>
          <BsBasket3 className="featureIcon" />
        </div>

        <div className="featureContainer">
          <span className="featureMoney">851</span>
        </div>
      </div>
      <div className="featureItem">
        <div className="featureIconHolder">
          <span className="featureTitle">
            کاربران جدید</span>
          <ImUsers className="featureIcon" />
        </div>
        <div className="featureContainer">

          <span className="featureMoney">1452</span>
        </div>
      </div>
      <div className="featureItem">
        <div className="featureIconHolder">
          <span className="featureTitle">بازدید جدید</span>
          <SiGoogleanalytics className="featureIcon" />
        </div>
        <div className="featureContainer">
          <span className="featureMoney">2521</span>

        </div>
      </div>
    </div>
  );
}
