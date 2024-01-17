import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUserProfile, resetUserProfile } from '../actions/userActions'
import Message from '../components/Message';
import Loader from '../components/Loader';

function ProfileScreen() {

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

    function handleChange() {
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

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
        else {
            if (!user || !user.username || user.username !== userInfo.username || success) {
                dispatch(resetUserProfile());
                dispatch(getUserDetails(userInfo._id));
            }
            else {
                setForm({
                    firstname: user.first_name,
                    lastname: user.last_name,
                    email: user.email,
                    username: user.username
                })
            }
        }
    }, [dispatch, userInfo, user, navigate, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        setMessage(null);
        if (form?.password != null && form?.confirmPassword !== form?.password) {
            setMessage('Passwords do not match!');
            return;
        }
        dispatch(updateUserProfile({ id: user._id, firstname: form?.firstname, lastname: form?.lastname, email: form?.email, username: form?.username, password: form?.password }));
        // console.log({ firstname, lastname, email, username, password });
    }

    return (
        <Row>
            <Col sm={12} md={6}>
                <FormContainer>
                    <h2>User Profile</h2>
                    {loading && <Loader />}
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='firstname' className='py-2'>
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control
                                type='text'
                                name='firstname'
                                placeholder='Enter firstname'
                                onChange={handleChange()}
                                value={form?.firstname}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='lastname' className='py-2'>
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                name='lastname'
                                placeholder='Enter lastname'
                                onChange={handleChange()}
                                value={form?.lastname}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email' className='py-2'>
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text>@</InputGroup.Text>
                                <Form.Control
                                    required
                                    type='email'
                                    name='email'
                                    placeholder='Enter email'
                                    onChange={handleChange()}
                                    value={form?.email}
                                ></Form.Control>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId='username' className='py-2'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                name='username'
                                placeholder='Enter username'
                                onChange={handleChange()}
                                value={form?.username}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password' className='py-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name='password'
                                type='password'
                                placeholder='Enter password'
                                onChange={handleChange()}
                                value={form?.password}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword' className='py-2'>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                name='confirmPassword'
                                type='password'
                                placeholder='Confirm password'
                                onChange={handleChange()}
                                value={form?.confirmPassword}
                            ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' className='py-2'>
                            Update
                        </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                            Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                        </Col>
                    </Row>
                </FormContainer>
            </Col>
            <Col sm={12} md={6}>
                <h2>Orders</h2>
            </Col>
        </Row>
    )

    /* function onChangeLastname() {
        return (e) => setLastname(e.target.value);
    }
    function onChangeFirstname() {
        return (e) => setFirstname(e.target.value);
    }
    function onChangeUsername() {
        return (e) => setUsername(e.target.value);
    }
    function onChangeEmail() {
        return (e) => setEmail(e.target.value);
    }

    function onChangePassword() {
        return (e) => setPassword(e.target.value);
    }

    function onChangeConfirmPassword() {
        return (e) => setConfirmPassword(e.target.value);
    } */
}

export default ProfileScreen