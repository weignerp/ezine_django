import React, { useEffect, useState } from 'react'
import { Row, Col, Image, ListGroup, Button, Card, InputGroup, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating, { } from "../components/Rating";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getProductAction } from '../actions/getProductAction';

function ProductScreen() {
    const [qty, setQty] = useState(1);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, product } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getProductAction(id));
    }, [dispatch, id])

    const addToCartHandler = () => {
        // console.log(`Add to Cart, id: ${id}, qty: ${qty}`);
        navigate(`/cart/${id}?qty=${qty}`);
    }

    return (
        <div className='p-0'>
            <Link to='/' className='btn btn-light p-2'>Go Back</Link>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                        <Col sm={12} md={6} lg={4} xl={4}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col sm={12} md={6} lg={8} xl={8}>
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
                                <ListGroup.Item>

                                    <ListGroup variant='flush'>
                                        <ListGroup.Item className='fs-4'>
                                            <Row>
                                                <Col sm={3} md={3} lg={3}>Price:</Col>
                                                <Col sm={9} md={9} lg={9}><strong>${product.price}</strong></Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item className='fs-5'>
                                            <Row>
                                                <Col sm={3} md={3} lg={3} className='pt-2'>Status:</Col>
                                                <Col sm={3} md={3} lg={3} className='pt-2'>{product.countInStock > 0 ? `Instock (${product.countInStock} pcs)` : 'Out of Stock'}</Col>
                                                {product.countInStock > 0 && (
                                                    <Col>
                                                        <InputGroup size="sm">
                                                            <Button
                                                                onClick={() => {
                                                                    if (qty > 1) {
                                                                        setQty(+qty - 1)
                                                                    }
                                                                }}
                                                                disabled={qty === 1}
                                                                className='rounded'
                                                                variant="primary"
                                                            ><i className='fas fa-minus'></i></Button>
                                                            <Form.Select
                                                                name="qty"
                                                                value={qty}
                                                                className="-custom-select"
                                                                onChange={(e) => setQty(+e.target.value)}>
                                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                            <Button
                                                                onClick={() => {
                                                                    if (qty < product.countInStock) {
                                                                        setQty(+qty + 1)
                                                                    }
                                                                }}
                                                                disabled={qty === product.countInStock}
                                                                className='rounded'
                                                                variant="primary"
                                                            ><i className='fas fa-plus'></i></Button>
                                                        </InputGroup>
                                                    </Col>
                                                )}
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-grid">
                                                <Button className='btn-block' type='button'
                                                    onClick={addToCartHandler}
                                                    disabled={product.countInStock === 0 ? true : false} ><i className='fas fa-shopping-cart px-1'></i>Add to Chart</Button>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>

                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row >
            }
        </div >
    )
}

export default ProductScreen