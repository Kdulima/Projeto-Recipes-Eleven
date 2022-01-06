import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <Container as="footer" fluid data-testid="footer" className="footer pb-2 pt-2">
      <Row className="align-items-center">
        <Col className="text-center">
          <Link src={ drinkIcon } to="/bebidas" data-testid="drinks-bottom-btn">
            <img src={ drinkIcon } alt="drinks logo" />
          </Link>
        </Col>
        <Col className="text-center">
          <Link src={ exploreIcon } to="/explorar" data-testid="explore-bottom-btn">
            <img src={ exploreIcon } alt="explore icon" />
          </Link>
        </Col>
        <Col className="text-center">
          <Link src={ mealIcon } to="/comidas" data-testid="food-bottom-btn">
            <img src={ mealIcon } alt="meal icon" />
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
