import React from "react";
import ReactDOM from "react-dom";
import Venue from "./Venue";
import SearchBar from "./SearchBar";
import DropDown from "./DropDown";
import axios from "axios";


class VenueGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      venues: [],

      searchTextKeyword:'',
      searchTextLocation:''
      };

      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
     // handle both of the <select> UI elements
     const target = event.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     this.setState({
       [name]: value
     });
   }


  componentDidUpdate() {
    axios
      .get("https://api.foursquare.com/v2/venues/search?client_id=L4Q0VI0VMCD1RRFADVREU0HURTDHOCRSUM1UW4HWFDPOV2VT&client_secret=G3KTF0QWWASE45KKPVXXGIOBHZ2SSLB25KADUVGOSKSFG2CR&v=20180323&limit=10&query=" + this.state.searchTextKeyword + "&near=" + this.state.searchTextLocation + "&radius=500")
      .then(response => {
        // GET request was successful, store the users in state
        console.log(response.data.response.venues);
        this.setState({ venues: response.data.response.venues });
      })
      .catch(err => {
        // GET failed, log the error
        console.log(err);
      });
  }

  render() {
    const venueList = this.state.venues.map(v => {
      return v.categories !== undefined ?
      <Venue
        key={v.id}
        id={v.id}
        image={v.categories[0]}
        name={v.name}
        address={v.location.address}
        street={v.location.crossStreet}
        city={v.location.city}
        country={v.location.cc}
      />
      :
      <Venue
        key={v.id}
        name={v.name}
        address={v.location.address}
        street={v.location.crossStreet}
        city={v.location.city}
        country={v.location.cc}
      />
    });

    return (
      <div className="columns is-vcentered ">
              <div className="column is-one-third">
                <div className="static">
                <p className="subtitle"> Conditionals </p>
                  <SearchBar name="searchTextKeyword" label="Keyword" value={this.state.searchTextKeyword} handleChange={this.handleChange} placeholder={"e.g. Chicken"} />
                  <SearchBar name="searchTextLocation" label="Location" value={this.state.searchTextLocation} handleChange={this.handleChange} placeholder={"e.g. Dublin"} />
                  <DropDown options={[500,1000,1500]} name="radius" handleChange={this.handleChange} label="distance (m)" selected={this.state.radius} />
                </div>
              </div>
              <div className="column is-two-thirds">
              <div className="columns is-vcentered is-multiline">
              {venueList}</div>
              </div>
          </div>
        );
  }
}

ReactDOM.render(<VenueGrid />, document.getElementById("root"));
