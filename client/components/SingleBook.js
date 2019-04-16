import React from 'react'

const SingleBook = props => {
  const {title, imgUrl, price, description} = props
  return (
    <div>
      <h2>{title}</h2>
      <img src={imgUrl} />
      <h4>{price}</h4>
      <p>{description}</p>
    </div>
  )
}

export default SingleBook