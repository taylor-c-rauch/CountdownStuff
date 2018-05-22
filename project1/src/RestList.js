//RestList.js
import React from "react";
import TodoComponent from "./RestComponent";
import axios from "axios";

class RestList extends React.Component {
  componentDidMount() {
    axios
      .get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.033554,-78.507980&radius=8000&type=restaurant&key=AIzaSyBBn6R_mpamSyY_yx4jWrG3945nWqbY3rs"
      )
      .then(response => {
        console.log(response.data);
      });
  }
  render() {
    return listOfRestThatWeAreGoingToBuildWithMap;
  }
}

export default RestList;
