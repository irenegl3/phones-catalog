
import React, { Component } from 'react';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import Catalogue from './Catalogue';
import { Modal } from 'react-bootstrap';
let urljoin = require('url-join');
const service = process.env.SERVICE || 'http://localhost:3001';
const apiBaseUrl = process.env.NODE_ENV === "development" ? urljoin(service) : window.location.href


class App extends Component {

  state = {
    phones: [],
    loading: null
  };

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

  render() {
    let catalogue;
    if (this.state.loading == true) {
      catalogue = "Loading...";
    }
    else {
      catalogue = <Catalogue
        phones={this.state.phones}
      />
    }

    return (
      <div>
        <div >
          <LoadingOverlay
            active={this.state.loading}
            spinner
            text='Loading...'
          >
            {catalogue}
          </LoadingOverlay>
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