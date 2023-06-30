import React from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip
} from 'recharts'

import './Chart.css'

export default function Chart({ title, data, dataKey, grid }) {
    return (
        <>
            <SectionTitle title={"گزارش ماهانه"} />

            <div className="chart my-5">
                <h3 className='chartTitle'>{title}</h3>
                <ResponsiveContainer aspect={4}>
                    <LineChart data={data}>
                        <XAxis dataKey="name" stroke='#0bd' />
                        <Line type="monotone" dataKey={dataKey} stroke='#6660bd' />
                        <Tooltip />
                        {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="10" />}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}
