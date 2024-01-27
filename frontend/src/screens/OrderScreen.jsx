import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { getOrderDetails } from "../actions/orderAction";

import Loader from "../components/Loader";
import Message from "../components/Message";

function OrderScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  let my_order = { ...order };
  if (!loading && !error) {
    my_order = { ...order, itemsPrice: order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0) };
  }

  useEffect(() => {
    if (!order._id || (order._id && order._id !== Number(id))) {
      dispatch(getOrderDetails(id));
    }
  }, [id, dispatch, order._id]);

  return (
    <div className='p-0'>
      <h1>Order Details for Order #{order._id}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <div>
                  <strong>Name: </strong>&nbsp;{my_order.user.name}
                </div>
                <div>
                  <strong>Email: </strong> &nbsp;{my_order.user.email}
                </div>
                <div>
                  <strong>Address:</strong>
                  &nbsp;{my_order.shippingAddress.address}, {my_order.shippingAddress.city}, {my_order.shippingAddress.postalCode},{" "}
                  {my_order.shippingAddress.country}
                </div>
                {my_order.isDelivered ? (
                  <Message variant={"success"}>Paid on {my_order.deliveredAt}</Message>
                ) : (
                  <Message variant={"warning"}>Not Delivered</Message>
                )}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <div>
                  <strong>Method:</strong>
                  &nbsp;{my_order.paymentMethod}
                </div>
                {my_order.isPaid ? (
                  <Message variant={"success"}>Paid on {my_order.paidAt}</Message>
                ) : (
                  <Message variant={"warning"}>Not Paid</Message>
                )}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {my_order.orderItems.length === 0 ? (
                  <Message variant={"info"}>
                    Your cart is empty <Link to='/'>Go Back</Link>
                  </Message>
                ) : (
                  <ListGroup variant='flush'>
                    {my_order.orderItems.map((item, ix) => (
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
                  <Col>{my_order.orderItems.reduce((acc, item) => acc + item.qty, 0)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items Price:</Col>
                  <Col>
                    <strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(my_order.itemsPrice)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(my_order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(my_order.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total price</Col>
                  <Col>
                    <strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(my_order.totalPrice)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  {" "}
                  <Message variant='danger'>{error}</Message>{" "}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default OrderScreen;
