import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

class FormCreate extends Component {
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
        paramsToUpdate.description = this.description.value;
        paramsToUpdate.name = this.name.value;
        paramsToUpdate.manufacturer = this.manufacturer.value;
        paramsToUpdate.color = this.color.value;
        paramsToUpdate.screen = this.screen.value;
        paramsToUpdate.price = this.price.value;
        paramsToUpdate.processor = this.processor.value;
        paramsToUpdate.ram = this.ram.value;
        paramsToUpdate.imageFileName = this.image.value;
        this.props.createPhone(paramsToUpdate);
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
                            Create a new phone
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Name</Form.Label>
                                <Col sm="10">
                                    <Form.Control required type="text" ref={textarea => this.name = textarea} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3">Manufacturer</Form.Label>
                                <Col sm="9">
                                    <Form.Control required type="text" ref={textarea => this.manufacturer = textarea} />
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description:</Form.Label>
                                <Form.Control required as="textarea" rows="5" ref={textarea => this.description = textarea} onChange={this.charsCounter} />
                                <Form.Text muted>
                                    {1234 - this.state.counter} characters left
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Color</Form.Label>
                                <Col sm="10">
                                    <Form.Control required type="text" ref={textarea => this.color = textarea} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Price</Form.Label>
                                <Col sm="8">
                                    <Form.Control required type="text" ref={textarea => this.price = textarea} />
                                </Col>
                                <Form.Label column sm="2">€</Form.Label>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Image</Form.Label>
                                <Col sm="10">
                                    <Form.Control required type="text" ref={textarea => this.image = textarea} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Screen</Form.Label>
                                <Col sm="10">
                                    <Form.Control required type="text" ref={textarea => this.screen = textarea} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Processor</Form.Label>
                                <Col sm="10">
                                    <Form.Control required type="text" ref={textarea => this.processor = textarea} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Ram</Form.Label>
                                <Col sm="8">
                                    <Form.Control required type="text" ref={textarea => this.ram = textarea} />
                                </Col>
                                <Form.Label column sm="2">GB</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="outline-success" type="submit"  onClick={this.handleSubmit}>Create</Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body >
                </Modal >
            </div >
        );
    }
}

export default FormCreate;