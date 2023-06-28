import React, { memo, useState, useEffect } from 'react'

const CountEffector = memo(({ count }) => {
    const [newCount, setNewCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNewCount((prevcount) => {
                if (prevcount === count) {
                    clearInterval(interval)

                    return prevcount;
                }
                return prevcount + 1;
            })

        }, 0.5);



        return () => clearInterval(interval)

    }, [])

    return (
        <span> {newCount} </span>
    )
})

export default CountEffector