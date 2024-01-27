import React from 'react'
import { Container, Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { clearCartItems } from '../actions/cartActions';
import { logout } from '../actions/userActions';

function Header() {

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { userInfo } = userLogin;

    const navDropdownUserTitle = (userInfo && userInfo.name) || (userInfo && userInfo.email);

    return (

        <header>
            <Navbar expand="lg" bg='dark' variant='dark' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Pro Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'></i>Cart
                                    {cartItems.length > 0 && (
                                        <>
                                            <Badge bg="primary" pill>
                                                {cartItems.length}
                                            </Badge>
                                            <span className="visually-hidden">items in cart</span>
                                        </>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={navDropdownUserTitle} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={onClickLogout()}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link ><i className='fas fa-user'></i>Login</Nav.Link>
                                </LinkContainer>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>

    );

    function onClickLogout() {
        return () => {
            dispatch(logout());
            dispatch(clearCartItems());
        };
    }
}

export default Header