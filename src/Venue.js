import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";


// Component to represent a single User 'Card' (note: this is a class component so can use state)
// Classes used below are from Bulma, see index.html above
class Venue extends React.Component {
  constructor(props) {
    super(props);

    // Setup the state data
    this.state = {
      likes: 0,
      photos:""
    };

    // This binding is necessary to make `this` work in the onclick callback

    this.handleClick = this.handleClick.bind(this);
  }

  // Event handler for the button
  handleClick() {
    // Increment the likes property stored in state
    this.setState(prevState => ({
      likes: prevState.likes + 1

    }));
  }

  componentDidMount() {

    axios
      .get("https://api.foursquare.com/v2/venues/" + this.props.id + "/photos?client_id=L4Q0VI0VMCD1RRFADVREU0HURTDHOCRSUM1UW4HWFDPOV2VT&client_secret=G3KTF0QWWASE45KKPVXXGIOBHZ2SSLB25KADUVGOSKSFG2CR&v=20180323")
      .then(response => {

        let prefix = response.data.response.photos.items[0].prefix;
        prefix =  prefix.substring(0, prefix.length - 1);
        let suffix = response.data.response.photos.items[0].suffix;

        this.setState({ photos: prefix + suffix});
        console.log(this.state.photos);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    let test;
    if (this.state.photos !== undefined) {
      test = this.state.photos;

    } else {
      test = "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";
    }
    return (
      <div className="column is-6">
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img alt="Profile" src={test} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.props.name}</p>
                <p className="subtitle">{this.props.address}</p>
                  <p className="subtitle">{this.props.street}</p>
                  <p className="subtitle">{this.props.city}</p>
                  <p className="subtitle">{this.props.country}</p>
                <h1>Likes: {this.state.likes}</h1>
                <button type="button" onClick={this.handleClick}>
                  Like this user
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Allow this to be imported by another JS file
export default Venue;
