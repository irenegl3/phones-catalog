
import React, { Component } from 'react';
import axios from 'axios';
import Catalogue from './Catalogue';
import { Spinner, Alert } from 'react-bootstrap';

let urljoin = require('url-join');
const service = 'http://localhost:3002'; //server port
const apiBaseUrl = urljoin(service);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phones: [],
      loading: null,
      selected: null,
      info: null,
      formCreate: null,
      formUpdate: null,
      delete: false,
      error: false,
      confirm: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeOfState = this.handleChangeOfState.bind(this);
    this.deletePhone = this.deletePhone.bind(this);
    this.deletePhoneConfirmed = this.deletePhoneConfirmed.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    axios.get(urljoin(apiBaseUrl, "/phones"))
      .then((response) => {
        // setTimeout(() => { //to check the loading spinner
        this.setState({
          loading: null,
          phones: response.data
        })
        //  }, 1000);
      })
      .catch((error) => {
        this.setState({
          loading: null,
          error: true
        })

        //alert(`Error when connecting to the server. ${error.response && error.response.data ?
        // error.response.data.error || '' : ''}`)
        console.log(error);
      })

  }

  handleClick(phone, service) {
    switch (service) {
      case 'create':
        this.setState({
          formCreate: true
        });
        break;
      case 'info':
        this.setState({
          selected: phone,
          info: true
        });
        break;
      case 'update':
        this.setState({
          selected: phone,
          formUpdate: true
        });
        break;
      default:
        this.setState({
          formCreate: null,
          formUpdate: null,
          info: null,
          confirm: null
        });
        break;
    }
  }

  deletePhone(id) {
    this.setState({
      selected: id,
      confirm: true
    });
  }

  deletePhoneConfirmed(id) {
    let newPhones = this.state.phones.slice();
    let formData = new FormData();
    this.setState({
      loading: true,
      selected: null,
      confirm: null
    });
    let aux;
    for (let i = 0; i < newPhones.length; i++) {
      if (newPhones[i].id === id) {
        aux = i;
        break;
      }
    }
    axios.delete(urljoin(apiBaseUrl, "/phones/", id.toString()))
      .then((response) => {
        let res = {};
        res = response.data;
        newPhones.splice(aux, 1);
        this.setState({
          phones: newPhones,
          loading: null
        })
      })
      .catch((error) => {
        this.setState({
          loading: null,
          error: true
        });
        //alert(`Error when connecting to server. ${error}`);
        console.log(error);
      })
  }

  handleChangeOfState(id, paramsToUpdate) {
    let newPhones = this.state.phones.slice();
    let formData = new FormData();
    this.setState({
      loading: true,
      selected: null,
      formCreate: null,
      formUpdate: null
    });
    let aux;
    let phoneId = ""; //ver que tipo es

    // If id, update existing phone
    if (id) {
      phoneId = id;
      for (let i = 0; i < newPhones.length; i++) {
        if (newPhones[i].id === id) {
          aux = i;
          break;
        }
      }
    }
    // If id is null, create new phone 
    else {
      aux = newPhones.length;
      paramsToUpdate.countPhones = newPhones.length;
    }
    formData.append("body", JSON.stringify({ phoneId: phoneId, paramsToUpdate: paramsToUpdate }));
    axios.post(urljoin(apiBaseUrl, "/phones"), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        let res = {};
        res = response.data;
        // phone already exists
        if (res === null) {
          this.setState({
            loading: null
          })
          alert('The phone you are trying to insert already exists.');
        }
        else {
          if (!id) {
            newPhones.push(res);
          } else { // update
            newPhones[aux].id = res[1][0].id;
            newPhones[aux].name = res[1][0].name;
            newPhones[aux].manufacturer = res[1][0].manufacturer;
            newPhones[aux].description = res[1][0].description;
            newPhones[aux].color = res[1][0].color;
            newPhones[aux].screen = res[1][0].screen;
            newPhones[aux].processor = res[1][0].processor;
            newPhones[aux].imageFileName = res[1][0].imageFileName;
            newPhones[aux].ram = res[1][0].ram;
            newPhones[aux].price = res[1][0].price;
          }
          this.setState({
            phones: newPhones,
            loading: null
          })
        }
      })
      .catch((error) => {
        this.setState({
          loading: null,
          error: true
        });
        //alert(`Error when connecting to server. ${error}`);
        console.log(error);
      })
  }


  render() {
    let catalogue;
    if (this.state.loading === true) {
      catalogue =
        <div className={"spinner"}><Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner></div>
    }
    else if (!this.state.error) {
      catalogue = <div >
        <Catalogue
          phones={this.state.phones}
          selected={this.state.selected}
          info={this.state.info}
          formCreate={this.state.formCreate}
          formUpdate={this.state.formUpdate}
          handleClick={this.handleClick}
          handleChangeOfState={this.handleChangeOfState}
          deletePhone={this.deletePhone}
          deletePhoneConfirmed={this.deletePhoneConfirmed}
          confirm={this.state.confirm}
        />
        <div className={"footer"}>
          <p>Irene García López</p>
          <p>November 2020</p>
        </div>
      </div>
    }

    return (
      <div>
        {this.state.error && <Alert variant="danger" >
          <Alert.Heading>Oh snap, there has been an error!</Alert.Heading>
          <p>
            Error connecting to the server. Try again later.
          </p>
        </Alert>}
        {catalogue}
      </div>
    );
  }
}

export default App;