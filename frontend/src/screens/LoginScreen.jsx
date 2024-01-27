import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import FormContainer from '../components/FormContainer'

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const queryParams = new URLSearchParams(location.search);

  const redirect = queryParams.get("redirect");

  useEffect(() => {
    // console.log(`Redirect: ${redirect}`);
    if (userInfo) {
      redirect ? navigate(`/${redirect}`) : navigate("/");
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='username' className='py-2'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Enter username' onChange={onChangeUsername()}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='py-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter password' onChange={onChangePassword()}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='py-2'>
          Sign in
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );

  function onChangeUsername() {
    return (e) => setUsername(e.target.value);
  }

  function onChangePassword() {
    return (e) => setPassword(e.target.value);
  }
}

export default LoginScreen;
