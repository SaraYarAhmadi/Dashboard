import React from 'react'

export default function SearchBoxItem({ id,index, img, title, price, }) {
    return (
        <li key={id} className='d-flex justify-content-around align-items-center text-dark mb-2 '>
            <span> { index + 1 } </span>
            <div className="img-holder ">
                <img className='w-100 h-100' src={img} alt={title} />
            </div>
            <span> {title} </span>
            <span> {price} </span>
        </li>
    )
}