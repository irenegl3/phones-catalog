import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

class Catalogue extends Component {

  render() {
    return (
      <div>
        <h1>Phone catalogue</h1>
          <Container f>
            <Row>
              {this.props.phones.map((phone, index) => (
                <Col xs={8} sm={6} md={4} className="phone">
                  <Card>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                      <Card.Title>{phone.name}</Card.Title>
                      <Card.Text>
                        {phone.description}
                      </Card.Text>
                      <Button variant="primary">More info</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
      </div>
    );
  }
}

export default Catalogue;