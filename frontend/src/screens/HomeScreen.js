import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Product from '../components/Product';
import axios from 'axios';

function HomeScreen() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        console.log('use effcet is triggered')
        async function fetchProducts() {
            const { data } = await axios.get('/api/products/')
            setProducts(data)
        }
        fetchProducts()
    }, [])
    return (
        <Container>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col className='p-3' key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default HomeScreen