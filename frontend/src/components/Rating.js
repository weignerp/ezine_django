import React from 'react'
import Star from './Star';

function Rating({ rating = 0, text = '', color = '#d7e725' }) {
    const a = [1, 2, 3, 4, 5];
    return (
        <div className='my-3 rating'>
            {a.map((x) => (
                <Star key={x} rating={rating} index={x} color={color} />
            ))}
            <span>{rating} {text && text}</span>
        </div>
    );
}

export default Rating