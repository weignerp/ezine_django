import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
        <Card className='m-1 p-2 rounded h-100'>
            {/*<Card.Header className='py-2'>{product.category}</Card.Header>*/}
            <Link to={'product/' + product._id} >
                <Card.Img src={product.image} />
            </Link>
            <Card.Body>
                <Link to={'product/' + product._id + '/smile'} >
                    <Card.Title><strong>{product.name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    {/* <div>{product.description}{product.brand}</div> */}
                    <Rating rating={product.rating} text={`from ${product.numReviews} reviews.`} color='#f8e825' />
                </Card.Text>
                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card >
    );
}

export default Product