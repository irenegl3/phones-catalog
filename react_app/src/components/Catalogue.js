import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, CardDeck, Modal } from 'react-bootstrap';
import Info from './Info';
import FormCreate from './FormCreate';

class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.handleSelected = this.handleSelected.bind(this);
    this.createPhone = this.createPhone.bind(this);
  }

  handleSelected(phone, modal) {
    this.props.handleSelected(phone, modal);
  }

  displayText(text) {
    let limit = 200;
    if (text.length <= limit) {
      return text;
    } else {
      return text.substring(0, limit) + " ...";
    }
  }

  createPhone(paramsToUpdate){
    this.props.handleChangeOfState(null,paramsToUpdate);
  }

  render() {
    // Get more info requested
    let modal;
    if (this.props.info) {
      modal = <Info
        phone={this.props.selected}
        handleClose={this.handleSelected}
      >
      </Info>
    } else if (this.props.form){
      modal =<FormCreate 
       handleClose={this.handleSelected}
       createPhone={this.createPhone}
      ></FormCreate>
    }

    let length = this.props.phones.length;

    return (
      <div className={"catalogue"}>
        <div className={"catalogue-header"}>
          <h1>Phone catalogue</h1>
          <div className={"line-title"}></div>
          <p>Know more about our phones!</p>
        </div>
        <Container>
          <Row>
            <CardDeck>
              {this.props.phones.map((phone, index) => (
                <div className={"wrapper"}>
                <Col xs={8} sm={6} md={4} lg={3} className="col-personalized" key={index}>
                  <Card >
                    <Row className={"card-img-personalized"} >
                      <Card.Img src={phone.imageFileName} className={"phone-img"} />
                    </Row>
                    <Row className={"card-body-personalized"}>
                      <Card.Body>
                        <Card.Title>{phone.name}</Card.Title>
                        <div className={"line-card"}>
                        </div>
                        <Card.Subtitle>{phone.manufacturer}</Card.Subtitle>
                        <br></br>
                        <Card.Text>
                          {this.displayText(phone.description)}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className={"card-footer-personalized"}>
                        <Button variant="link" onClick={() => this.handleSelected(phone, true)}>{'>'} More info</Button>
                      </Card.Footer>
                    </Row>
                  </Card>
                </Col>
                {(index+1 === length) && 
                <Col xs={8} sm={6} md={4} lg={3} className="col-personalized" key={index+1}>
                  <Card >
                    <Row className={"card-img-personalized"} >
                      <Card.Img src={"template.png"} className={"phone-img"} />
                    </Row>
                    <Row className={"card-body-personalized"}>
                      <Card.Body>
                        <Card.Title>Add a new phone</Card.Title>
                        <div className={"line-card"}>
                        </div>
                        <br></br>
                        <Card.Text>
                          Click here to add a new phone into the catalogue.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className={"card-footer-personalized"}>
                        <Button variant="outline-primary" className={"btn-add"} size="lg" onClick={() => this.props.showForm()}>Add phone</Button>
                      </Card.Footer>
                    </Row>
                  </Card>
                </Col>
              }
             </div> 
              ))}
            </CardDeck>
          </Row>
        </Container>
        {modal}
      </div>
    );
  }
}

export default Catalogue;