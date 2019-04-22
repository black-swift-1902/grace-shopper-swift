import React from 'react'
import {Link} from 'react-router-dom'

const SingleBookCard = props => {
    const {book} = props
          return <Link to={`/books/${book.id}`}>
              <div className="card column">
                <h1 className="card-header">{book.title}</h1>
                <figure className="card-image image is-128x128">
                  <img src={book.imgUrl} />
                </figure>
                <hr />
                <h4 className="card-content">Price: {(book.price/100).toFixed(2)}</h4>
              </div>
            </Link>
}

export default SingleBookCard