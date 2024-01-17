import React from 'react'





function Star({ rating = 0, index = 0, color = '#d7e725' }) {
  function getStaClassName(rating, index) {
    const NO_STAR = 'fas fa-star';
    const HALF_STAR = 'fas fa-star-half-alt';
    const FULL_STAR = 'far fa-star';
    return (Math.ceil(rating) < index) ? FULL_STAR : ((Math.ceil(rating) === index && ((rating * 10) % 2) === 1) ? HALF_STAR : NO_STAR);
  }

  function getColor(rating, index, color) {
    return (Math.ceil(rating) >= index) ? color : '';
  }

  return (
    <>
      <span>
        <i style={{ color: color }} className={getStaClassName(rating, index)}></i>
      </span>
      {/*
      <div>index: {index}</div>
      <div>floor: {Math.ceil(rating)}</div>
      <div>floor: {(Math.ceil(rating) === index) ? 'OK' : 'ERR'}</div>
      <div>floor: {((rating * 10) % 2)}</div>
      <div>floor: {(((rating * 10) % 2) === 1) ? 'OK' : 'ERR'}</div>
      */}
    </>
  )
}

export default Star