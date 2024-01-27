import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen() {
  const paymentMethods = [
    { label: "PayPal or Credit Card", id: "PayPal", value: "PayPal" },
    { label: "Google Pay", id: "GooglePay", value: "GooglePay" },
    { label: "Apple Pay", id: "ApplePay", value: "ApplePay" },
    { label: "Bank Transfer", id: "BankTransfer", value: "BankTransfer" },
    { label: "Cash on Delivery", id: "CashOnDelivery", value: "CashOnDelivery" },
  ];
  const cart = useSelector((state) => state.cart);
  const { paymentMethod, shippingAddress } = cart;

  const [payment, setPaymentMethod] = useState(paymentMethod);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    // console.log(payment);
    navigate("/placeorder");
  };

  const onChangeFormField = (e) => {
    setPaymentMethod(e.target.value);
  };

  if (!shippingAddress) {
    navigate("/shipping");
  }

  return (
    <FormContainer>
      <h1>PaymentScreen</h1>
      <CheckoutSteps step1 step2 step3 />

      <Form className='py-3' onSubmit={submitHandler}>
        <Form.Group controlId='legend' className='py-2'>
          <Form.Label>Payment Method</Form.Label>
          {paymentMethods.map((method) => (
            <Col key={method.id}>
              <Form.Check
                type='radio'
                label={method.label}
                id={method.id}
                name='paymentMethod'
                value={method.value}
                checked={payment === method.value}
                onChange={onChangeFormField}
              />
            </Col>
          ))}
        </Form.Group>
        <Form.Group controlId='button' variant='primary' className='py-2'>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
