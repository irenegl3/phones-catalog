import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

class FormUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.charsCounter = this.charsCounter.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let paramsToUpdate = {};
        if (this.description.value) {
            paramsToUpdate.description = this.description.value;
        }
        if (this.name.value) {
            paramsToUpdate.name = this.name.value;
        }
        if (this.manufacturer.value) {
            paramsToUpdate.manufacturer = this.manufacturer.value;
        }
        if (this.color.value) {
            paramsToUpdate.color = this.color.value;
        }
        if (this.screen.value) {
            paramsToUpdate.screen = this.screen.value;
        }
        if (this.price.value) {
            paramsToUpdate.price = this.price.value;
        }
        if (this.processor.value) {
            paramsToUpdate.processor = this.processor.value;
        }
        if (this.ram.value) {
            paramsToUpdate.ram = this.ram.value;
        }
        if (this.image.value) {
            paramsToUpdate.imageFileName = this.image.value;
        }
        this.props.updatePhone(this.props.phone.id,paramsToUpdate);
    }

    charsCounter() {
        var counter = this.description.value.length;
        this.setState({
            counter: counter
        })
    }

    render() {
        return (
            <div>
                <Modal show={true} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Update the phone information
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Name</Form.Label>
                                <Col sm="10">
                                    <Form.Control required type="text" ref={textarea => this.name = textarea} placeholder={this.props.phone.name}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3">Manufacturer</Form.Label>
                                <Col sm="9">
                                    <Form.Control required type="text" ref={textarea => this.manufacturer = textarea} placeholder={this.props.phone.manufacturer}/>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description:</Form.Label>
                                <Form.Control required as="textarea" rows="5" ref={textarea => this.description = textarea} onChange={this.charsCounter} placeholder={this.props.phone.description}/>
                                <Form.Text muted>
                                    {1234 - this.state.counter} characters left
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Color</Form.Label>
                                <Col sm="10">
                                    <Form.Control required type="text" ref={textarea => this.color = textarea} placeholder={this.props.phone.color}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Price</Form.Label>
                                <Col sm="8">
                                    <Form.Control required type="text" ref={textarea => this.price = textarea} placeholder={this.props.phone.price}/>
                                </Col>
                                <Form.Label column sm="2">€</Form.Label>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Image</Form.Label>
                                <Col sm="10">
                                    <Form.Control required type="text" ref={textarea => this.image = textarea} placeholder={this.props.phone.imageFileName}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Screen</Form.Label>
                                <Col sm="10">
                                    <Form.Control required type="text" ref={textarea => this.screen = textarea} placeholder={this.props.phone.screen}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Processor</Form.Label>
                                <Col sm="10">
                                    <Form.Control required type="text" ref={textarea => this.processor = textarea} placeholder={this.props.phone.processor}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Ram</Form.Label>
                                <Col sm="8">
                                    <Form.Control required type="text" ref={textarea => this.ram = textarea} placeholder={this.props.phone.ram}/>
                                </Col>
                                <Form.Label column sm="2">GB</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit" onClick={this.handleSubmit}>Update</Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body >
                </Modal >
            </div >
        );
    }
}

export default FormUpdate;