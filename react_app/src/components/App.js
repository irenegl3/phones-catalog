
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
    this.createPhone = this.createPhone.bind(this);
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

  handleSelected(phone, info) {
    this.setState({
      selected: phone,
      info: info
    })
  }

  createPhone(){
    this.setState({
      form: true
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
        handleSelected={this.handleSelected}
        createPhone={this.createPhone}
      />
    }

    return (
      <div>
        {/* <div className={"nav-personalized"}> */}
          {/* <NavCatalogue></NavCatalogue> */}
        {/* { </div> */}
        {/* <div className={"menu"}> */}
          {/* <Menu></Menu> */}
        {/* </div> */} 
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