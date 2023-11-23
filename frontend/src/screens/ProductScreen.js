import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Button, Card, ButtonGroup } from 'react-bootstrap'
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating, { } from "../components/Rating";
import axios from 'axios';

function ProductScreen() {
    const { id, smile } = useParams();
    const navigation = useNavigate();
    /*const product = products.find((p) => p._id === id);*/
    const [product, setProduct] = useState([])
    useEffect(() => {
        console.log('use effcet is triggered with id:' + id)
        async function fetchProduct() {
            const { data } = await axios.get(`/api/product/${id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [id])


    return (
        <div className='p-0'>
            <Link to='/' className='btn btn-light p-2'>Go Back</Link>
            <Row>
                <Col md={6} lg={6} xl={5}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3} lg={3} xl={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product.rating} text={`from ${product.numReviews} reviews.`} color={'#d7e725'} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Price: ${product.price}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description:</strong> {product.description}
                        </ListGroup.Item>
                    </ListGroup></Col>
                <Col md={3} lg={3} xl={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='fs-4'>
                                <Row>
                                    <Col sm={3} md={6} lg={5}>Price:</Col>
                                    <Col sm={9} md={6} lg={7}><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className='fs-5'>
                                <Row>
                                    <Col sm={3} md={6} lg={5}>Status:</Col>
                                    <Col sm={9} md={6} lg={7}>{product.countInStock > 0 ? `Instock (${product.countInStock} pcs)` : 'Out of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button className='btn-block' type='botton' disabled={product.countInStock === 0 ? true : false} ><i className='fas fa-shopping-cart px-1'></i>Add to Chart</Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen