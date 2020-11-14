
import React, { Component } from 'react';
import axios from 'axios';
import Catalogue from './Catalogue';
// import NavCatalogue from './Nav';
// import Menu from './Menu';

let urljoin = require('url-join');
const service = process.env.SERVICE || 'http://localhost:3001';
const apiBaseUrl = process.env.NODE_ENV === "development" ? urljoin(service) : window.location.href


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phones: [],
      loading: null,
      selected: null,
      info: null,
      form: null
    };
    this.handleSelected = this.handleSelected.bind(this);
    this.handleChangeOfState = this.handleChangeOfState.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    axios.get(urljoin(apiBaseUrl, "/phones"))
      .then((response) => {
        this.setState({
          loading: null,
          phones: response.data
        })
      })
      .catch((error) => {
        this.setState({
          loading: null
        })
        alert(`Erros when connecting to the server. ${error.response && error.response.data ?
          error.response.data.error || '' : ''}`)
      })
  }

  showForm() {
    console.log("show formn");
    this.setState({
      form: true
    })
  }

  handleSelected(phone, modal) {
    this.setState({
      selected: phone,
      info: modal,
      form: modal
    })
  }

  handleChangeOfState(id, paramsToUpdate) {
    console.log(id, paramsToUpdate);
    let newPhones = this.state.phones.slice();
    let formData = new FormData();
    this.setState({
      loading: true,
      selected: null,
      form:null
    });
    let aux;
    let phoneId = ""; //ver que tipo es

    // If id, update existing phone
    if (id) {
      console.log('update');
      //phone tiene que existir, el seleccionado
      phoneId = id;
      // aux = id;
      // phone = newPhones[id];
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
        let res = response.data;
        // phone already exists
        console.log("respuesta:", res);
        if (res === null) {
          this.setState({
            loading: null,
            form: null
          })
          alert('The phone you are trying to insert already exists.');
        }
        else {
          if (!id) {
            newPhones.push(res);
          } else { // update
            // newPhones[aux].estadoPeticion = response.data.estadoPeticion || response.data[1][0].estadoPeticion;

          }
          this.setState({
            phones: newPhones,
            loading: null,
            form: null
          })
        }
      })
      .catch((error) => {
        this.setState({
          loading: null,
          form: null
        });
        alert(`Error en la conexión con el servidor. ${error}`);
        console.log(error);
      })
  }


  render() {
    let catalogue;
    if (this.state.loading === true) {
      catalogue = "Loading...";
    }
    else {
      catalogue = <Catalogue
        phones={this.state.phones}
        selected={this.state.selected}
        info={this.state.info}
        form={this.state.form}
        showForm={this.showForm}
        handleSelected={this.handleSelected}
        handleChangeOfState={this.handleChangeOfState}
      />
    }

    return (
      <div>
        <div >
          {catalogue}
        </div>
        <div className={"footer"}>
          <p>Irene García López</p>
          <p>November 2020</p>
        </div>
      </div>
    );
  }
}

export default App;