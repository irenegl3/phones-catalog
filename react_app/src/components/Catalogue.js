import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, CardDeck } from 'react-bootstrap';

class Catalogue extends Component {
  state = { showAll: false }
  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });
  
  displayText(text){
    let limit = 200;
    let showAll = this.state;
    if (text.length <= limit) {
      return text;
    } else {
      return text.substring(0,limit)+" ...";
    }
  }

  render() {
    
    return (
      <div className={"catalogue"}>
          <div className={"catalogue-header"}>
            <h1 >Phone catalogue</h1>
            <p>Know more about our phones!</p>
          </div>
          <Container>
            <Row>
              <CardDeck>
                {this.props.phones.map((phone, index) => (
                  <Col xs={8} sm={6} md={4} lg={3} className="phone-col">
                    <Card >
                    <Row className={"card-img-personalized"} >
                      <Card.Img src={phone.imageFileName} className={"phone-img"}/>
                      </Row>
                      <Row className={"card-body"}>
                      <Card.Body>
                        <Card.Title>{phone.name}</Card.Title>
                        <Card.Subtitle>{phone.manufacturer}</Card.Subtitle>
                        <br></br>
                        <Card.Text>
                          {this.displayText(phone.description)}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className={"card-footer-personalized"}>
                      <Button variant="link">{'>'} More info</Button>
                      </Card.Footer>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </CardDeck>
            </Row>
          </Container>
        </div>
    );
  }
}

export default Catalogue;