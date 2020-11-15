import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, CardDeck, Modal, Alert } from 'react-bootstrap';
import Info from './Info';
import FormCreate from './FormCreate';
import FormUpdate from './FormUpdate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.createPhone = this.createPhone.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.deletePhoneConfirmation = this.deletePhoneConfirmation.bind(this);
    this.deletePhone = this.deletePhone.bind(this);
    this.handleCloseConfirmation = this.handleCloseConfirmation.bind(this);
  }

  handleClick(phone, service) {
    this.props.handleClick(phone, service);
  }

  handleCloseConfirmation(){
    this.props.handleClick();
  }

  displayText(text) {
    let limit = 200;
    if (text.length <= limit) {
      return text;
    } else {
      return text.substring(0, limit) + " ...";
    }
  }

  createPhone(paramsToUpdate) {
    this.props.handleChangeOfState(null, paramsToUpdate);
  }

  updatePhone(phoneId, paramsToUpdate) {
    this.props.handleChangeOfState(phoneId, paramsToUpdate);
  }

  deletePhone(phoneId) {
    this.props.deletePhone(phoneId);
  }

  deletePhoneConfirmation() {
    this.props.deletePhoneConfirmed(this.props.selected);
  }

  render() {
    let modal;
    if (this.props.info) {
      modal = <Info
        phone={this.props.selected}
        handleClose={this.handleClick}
      ></Info>
    } else if (this.props.formCreate) {
      modal = <FormCreate
        handleClose={this.handleClick}
        createPhone={this.createPhone}
      ></FormCreate>
    } else if (this.props.formUpdate) {
      modal = <FormUpdate
        phone={this.props.selected}
        handleClose={this.handleClick}
        updatePhone={this.updatePhone}
      ></FormUpdate>
    }

    let alert;
     if (this.props.confirm) {
      alert = <Modal show={true} onHide={this.handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>
            Confirm your action please
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You are about to delete a phone. Are you sure?
        </p>
        </Modal.Body >
        <Modal.Footer> <Button onClick={() => this.deletePhoneConfirmation()} variant="outline-success">
          Yes, I'm sure.
          </Button></Modal.Footer>
      </Modal >
     }
    let length = this.props.phones.length;
    let catalogue;
    if (length == 0) {
      catalogue = <Container>
        <Row>
          <Col xs={8} sm={6} md={4} lg={3} className="col-personalized" key={-1}>
            <Card >
              <Row className={"card-img-personalized"} >
                <Card.Img src={"add.png"} className={"phone-img"} />
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
                  <Button variant="outline-primary" className={"btn-add"} size="lg" onClick={() => this.props.handleClick(null, 'create')}>Add phone</Button>
                </Card.Footer>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
        ;
    } else {
      catalogue = <Container>
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
                        <Button variant="link" onClick={() => this.handleClick(phone, 'info')}>{'>'} More info</Button>
                        <Button variant="link" onClick={() => this.handleClick(phone, 'update')}><FontAwesomeIcon icon={faEdit} /></Button>
                        <Button variant="link" onClick={() => this.deletePhone(phone.id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                      </Card.Footer>
                    </Row>
                  </Card>
                </Col>
                {(index + 1 === length) &&
                  <Col xs={8} sm={6} md={4} lg={3} className="col-personalized" key={index + 1}>
                    <Card >
                      <Row className={"card-img-personalized"} >
                        <Card.Img src={"add.png"} className={"phone-img"} />
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
                          <Button variant="outline-primary" className={"btn-add"} size="lg" onClick={() => this.props.handleClick(null, 'create')}>Add phone</Button>
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
    }

    return (
      <div className={"catalogue"}>
        <div className={"catalogue-header"}>
          <h1>Phone catalogue</h1>
          <div className={"line-title"}></div>
          <p>Know more about our phones!</p>
        </div>
        {catalogue}
        {modal}
        {alert}
      </div>
    );
  }
}

export default Catalogue;