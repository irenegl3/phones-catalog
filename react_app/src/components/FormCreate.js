import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

class FormCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            paramsToUpdate: {},
            invalidname: true,
            invalidmanufacturer: true,
            invalidcolor: true,
            invaliddescription: true,
            invalidscreen: true,
            invalidimage: true,
            invalidprocessor: true,
            invalidram: true,
            invalidprice: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.charsCounter = this.charsCounter.bind(this);
        this.name = React.createRef();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        const value = evt.target.value;
        // invalid states
        let state = {};
        state[evt.target.name] = "invalid" + evt.target.name;
        // params to update state
        let paramsToUpdate = this.state.paramsToUpdate;
        paramsToUpdate[evt.target.name] = value;
        // update states
        this.setState({
            [state[evt.target.name]]: false,
            paramsToUpdate: paramsToUpdate
        });
        //if price or ram are a negative number: invalid
        if (evt.target.name === "ram" || evt.target.name === "price") {
            if (parseInt(value) < 0) {
                this.setState({
                    [state[evt.target.name]]: true
                });
            }
        }
        // If empty field: invalid
        if (value.length === 0) {
            this.setState({
                [state[evt.target.name]]: true
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (Object.keys(this.state.paramsToUpdate).length === 9) {
            this.props.createPhone(this.state.paramsToUpdate);
        }
        else {
            alert("You have to fill every field");
        }
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
                                    <Form.Control type="text" name="name" isInvalid={this.state.invalidname} onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3">Manufacturer</Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" name="manufacturer" isInvalid={this.state.invalidmanufacturer} onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description:</Form.Label>
                                <Form.Control rows="5" isInvalid={this.state.invaliddescription} name="description" onChange={this.charsCounter, this.handleChange} />
                                <Form.Text muted>
                                    {1234 - this.state.counter} characters left
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Color</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" name="color" isInvalid={this.state.invalidcolor} onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Price</Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" name="price" isInvalid={this.state.invalidprice} min="0" onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid">Must be a positive number</Form.Control.Feedback>
                                </Col>
                                <Form.Label column sm="2">€</Form.Label>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Image</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" name="image" isInvalid={this.state.invalidimage} onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Screen</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" name="screen" isInvalid={this.state.invalidscreen} onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Processor</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" name="processor" isInvalid={this.state.invalidprocessor} onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Ram</Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" isInvalid={this.state.invalidram} min="0" name="ram" onChange={this.handleChange} />
                                    <Form.Control.Feedback type="invalid">Must be a positive number</Form.Control.Feedback>
                                </Col>
                                <Form.Label column sm="2">GB</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="outline-success" type="submit" onClick={this.handleSubmit}>Create</Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body >
                </Modal >
            </div >
        );
    }
}

export default FormCreate;