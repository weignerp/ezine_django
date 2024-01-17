import React, { useState, useEffect } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  return (
    <div>
      <Row>
        <Col>
          <h1>Place Order</h1>
          <CheckoutSteps step1 step2 step3 step4 />
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush' key={1}>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant='flush' key={2}>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <h2>Order Summary</h2>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
