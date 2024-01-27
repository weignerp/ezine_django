import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [shippingForm, setShippingForm] = useState(shippingAddress);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ ...shippingForm }));
    //console.log(shippingForm);
    navigate("/payment");
  };

  const onChangeFormField = (e) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <CheckoutSteps step1 step2 />
      <Form className='py-3' onSubmit={submitHandler}>
        <Form.Group controlId='name' className='py-2'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' name='name' required placeholder='Enter name' value={shippingForm.name} onChange={onChangeFormField} />
        </Form.Group>
        <Form.Group controlId='address' className='py-2'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            name='address'
            required
            placeholder='Enter address'
            value={shippingForm.address}
            onChange={onChangeFormField}
          />
        </Form.Group>
        <Form.Group controlId='city' className='py-2'>
          <Form.Label>City</Form.Label>
          <Form.Control type='text' name='city' required placeholder='Enter city' value={shippingForm.city} onChange={onChangeFormField} />
        </Form.Group>
        <Form.Group controlId='postalCode' className='py-2'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            name='postalCode'
            required
            placeholder='Enter postal code'
            value={shippingForm.postalCode}
            onChange={onChangeFormField}
          />
        </Form.Group>
        <Form.Group controlId='country' className='py-2'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            name='country'
            required
            placeholder='Enter country'
            value={shippingForm.country}
            onChange={onChangeFormField}
          />
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

export default ShippingScreen;
