import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class Info extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Modal show={true} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.phone.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            <li><b>Manufacturer: </b>{this.props.phone.manufacturer}</li>
                            <li><b>Description: </b>{this.props.phone.description}</li>
                            <li><b>Color: </b>{this.props.phone.color}</li>
                            <li><b>Screen: </b>{this.props.phone.screen}</li>
                            <li><b>Processor: </b>{this.props.phone.processor}</li>
                            <li><b>RAM: </b>{this.props.phone.ram}</li>
                            <li><b>Price: </b>{this.props.phone.price} €</li>
                        </ul>
                    </Modal.Body>
                </Modal >
            </div>
        );
    }
}

export default Info;