import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  const steps = [
    { step: step1, link: "/login", label: "Sign In" },
    { step: step2, link: "/shipping", label: "Shipping" },
    { step: step3, link: "/payment", label: "Payment" },
    { step: step4, link: "/placeorder", label: "Place Order" },
  ];

  return (
    <Nav className='justify-content-center mb-4'>
      {steps.map((step, index) => (
        <Nav.Item key={index}>
          {step.step ? (
            <Nav.Link as={Link} to={step.link}>
              {step.label}
            </Nav.Link>
          ) : (
            <Nav.Link disabled>{step.label}</Nav.Link>
          )}
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default CheckoutSteps;
