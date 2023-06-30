import React from "react";
import './SectionTitle.css';

export default function SectionTitle({ title }) {
  return (
    <div className=" section-header my-3 mx-auto">
      <div className=" section-header__right">
        <span className="section-header__title title">{title}</span>
      </div>
    </div>
  );
}
