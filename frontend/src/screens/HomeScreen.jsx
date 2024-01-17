import React, { useEffect } from 'react'
import { Col, Container, Row, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";

import { listProductAction } from "../actions/listProductAction";

import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';


function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.products);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProductAction());
    }, [dispatch])

    return (
        <Container>
            <h1>Latest Products</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : <Row>
                        {products.map(product => (
                            <Col className='p-3' key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }

        </Container>
    )
}

export default HomeScreen