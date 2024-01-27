import React, { useState, useEffect } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder, resetOrder } from "../actions/orderAction";
import { URL_ORDER, URL_PAYMENT, URL_SHIPPING } from "../constants/localConstants";

function PlaceOrderScreen() {
  const navigate = useNavigate();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;
  const dispatch = useDispatch();

  if (!shippingAddress) {
    console.log("shippingAddress not set");
    navigate(URL_SHIPPING);
  }
  if (!paymentMethod) {
    console.log("paymentMethod not set");
    navigate(URL_PAYMENT);
  }

  const placeOrder = () => {
    console.log("placeOrder called");
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: lCart.itemsPrice,
        taxPrice: lCart.taxPrice,
        shippingPrice: lCart.shippingPrice,
        totalPrice: lCart.totalPrice,
      })
    );
  };

  const TAX = 0.21;
  const lCart = {
    itemsPrice: cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
    taxPrice: cart.cartItems.reduce((acc, item) => acc + item.qty * item.price * TAX, 0),
    shippingPrice: cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) < 1000 ? 15 : 0,
    totalPrice:
      cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) +
      cart.cartItems.reduce((acc, item) => acc + item.qty * item.price * TAX, 0) +
      15,
  };

  useEffect(() => {
    //console.log(`success = ${success}, orderid = ${order._id}`);
    if (success) {
      console.log(`success = ${success}, orderid = ${order._id}`);
      dispatch(resetOrder());
      navigate(`${URL_ORDER}/${order._id}`);
    }
  }, [success, navigate]);

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
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <div>
                <strong>Address:</strong>
                &nbsp;{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
              </div>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <div>
                <strong>Method:</strong>
                &nbsp;{paymentMethod}
              </div>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant={"info"}>
                  Your cart is empty <Link to='/'>Go Back</Link>
                </Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, ix) => (
                    <ListGroup.Item key={ix}>
                      <Row>
                        <Col xs={12} sm={2} md={3}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                          <Link to={`/products/${item.product}`}>
                            <strong>{item.name}</strong>
                          </Link>
                        </Col>
                        <Col xs={12} sm={4} md={3}>
                          <small>
                            {item.qty} x {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price)} ={" "}
                            <strong>
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.qty * item.price)}
                            </strong>
                          </small>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <h2>Order Summary</h2>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Total Items:</Col>
                <Col>{cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items Price:</Col>
                <Col>
                  <strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(lCart.itemsPrice)}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(lCart.shippingPrice)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(lCart.taxPrice)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total price</Col>
                <Col>
                  <strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(lCart.totalPrice)}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            {error && (
              <ListGroup.Item>
                {" "}
                <Message variant='danger'>{error}</Message>{" "}
              </ListGroup.Item>
            )}
            {success && (
              <ListGroup.Item>
                <Message variant='success'>Order Placed</Message>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button type='button' className='btn-block' onClick={placeOrder} disabled={cart.cartItems.length === 0}>
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
