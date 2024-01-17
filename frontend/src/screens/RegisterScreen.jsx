import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import Message from '../components/Message';
import Loader from '../components/Loader';

function RegisterScreen() {
    /* const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState(''); */

    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        email: ''
    });

    function onChangeFormField() {
        return (e) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    const [message, setMessage] = useState('');
    const { redirect } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            redirect ? navigate(redirect) : navigate('/login');
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (form.password == null || form.confirmPassword !== form.password) {
            setMessage('Passwords do not match!');
            return;
        }
        dispatch(register({ firstname: form?.firstname, lastname: form?.lastname, email: form?.email, username: form?.username, password: form?.password }));
    }

    return (
        <FormContainer>
            <h1>Register Form</h1>
            {loading && <Loader />}
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstname' className='py-2'>
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter firstname'
                        onChange={onChangeFormField()}
                        value={form.firstname}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='lastname' className='py-2'>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter lastname'
                        onChange={onChangeFormField()}
                        value={form.lastname}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='py-2'>
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter email'
                            onChange={onChangeFormField()}
                            value={form.email}
                        ></Form.Control>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId='username' className='py-2'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter username'
                        onChange={onChangeFormField()}
                        value={form.username}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='py-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter password'
                        onChange={onChangeFormField()}
                        value={form.password}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='py-2'>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm password'
                        onChange={onChangeFormField()}
                        value={form.confirmPassword}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='py-2'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen