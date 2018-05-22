import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  componentDidMount() {
    axios
      .all([
        axios.get(
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.033554,-78.507980&radius=8000&type=restaurant&key=AIzaSyBBn6R_mpamSyY_yx4jWrG3945nWqbY3rs"
        ),
        axios.get(
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=CrQCIwEAADxRn3F-XkSjnY2FlWos1jBuVolQujPkVLJBw3ONrBK42tyoXSeCP4Zi8uifeGzSHkTCZl8fOMniGy7N_hJHOKg16TSPc8xnRhAOZzPG2-eYYfyjEwyNUDoNvcTyTS_pui74N1X9yXUN2Qf_yOxY4V4ZLOfiEYPBkZUxcIjOJ4_c3QDnz0rtgQV7EaNa_7-nrCa6nQ-Uy5Q_RjV2Y2pfxjGPT0-OcmsySGuc4yskJR1F1BNqyrhXYHr-aQGEn4nHaUh4BLsqZoKIsOvirEf7KOSJigetFFofmMiKxnj6JgjTTC9oq7sfNFa0UfU-sFIWf7BEttoNYKRHKLsDruXxCrWPfzCHHE72lhEJ-iKW7lD4GPUVEy27PAu-VMJXdm68M4yVFBj0_mFb5LrikJv7_k0SEDyJWAbNBHdZwZdo7e6TFK0aFNACjPZZyGpG2edAZVdOIFzFzk-X&key=AIzaSyBBn6R_mpamSyY_yx4jWrG3945nWqbY3rs"
        ),
        axios.get(
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=CtQDwwEAACDtVwkSkyIFw-44HRx2W_8zDMdhHObvFz5LtpNmK-S5nvLsf5XJYUZBKTCW5su5c6EnYYma09wvU-weOuRL-tSEouBu4bseQ0wSWupXCAU0Va0ldwzGRH4wpwgzXlELsCqL4X_jI8JcK1-biWa3P3q2Qs-3qm-tCQ04hODJ9ko03nxyfBHOnBEQvbePDykykduxcb1jCZjuqhA0Qk5TjrIVzqqcD0WwiMEwXdls51AUgxGcG8a0veJy4OOvNNVhyPB7cFXNQci8m056bxLsMQdzgke13zXgaiqtSdzNaFYpmdbEU92LVXoQM2lwZzg5qNbaL39ACBOEhCwPXLz-SAxNNfux6AkPlSVrIW7tMaETwXsyPrcLettwWP08ABYPgNd5iaVRXS1N0j44dLiDEJVMOAucIkiDBop4fzszAOv79usAJYqJp0IkYH4wfFNlNmpgU0kLIOMDuOiSSptqMvdZtqMToCFvssDWcQGFtsxaAVIMA8d63W74diIhGzzRwaNwnBEhaWRwiZlRXPDMO20dBsBuxVuYF9ic5Pxru0EEgXh7Sl4KXMYN3-4RRxKccs6J17dEUpUL3x1_A4HL3VN758_4P3Fj7OHphd4cxeOKEhCHfishnpjAl7qqDnrLKcZpGhQZgyPQSF0q1CXR14LeCB3x2bdxiQ&key=AIzaSyBBn6R_mpamSyY_yx4jWrG3945nWqbY3rs"
        )
      ])
      .then(
        axios.spread((response, response2, response3) => {
          console.log(response);
          let restaurants = response.data.results.concat(
            response2.data.results.concat(response3.data.results)
          );

          this.setState({
            restaurants: restaurants
          });
        })
      )
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <ul>
        {this.state.restaurants.map(restaurant => (
          <li>
            Name: {restaurant.name}, Price: {restaurant.price_level}, Rating:{" "}
            {restaurant.rating}
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
