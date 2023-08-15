import React, { Component } from "react";
import Users from '../data/Users';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      suggestions: [],
      selectedUser: null,
    };
  }

  handleSearchChange = (event) => {
    const { value } = event.target;
    const suggestions = this.getFilteredSuggestions(value);
    this.setState({ searchQuery: value, suggestions });
  };

  handleSuggestionClick = (user) => {
    this.setState({ selectedUser: user, suggestions: [], searchQuery: user.name });
  };

  getFilteredSuggestions = (query) => {
    return Users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  handleSearch = () => {
    
    const { selectedUser, searchQuery } = this.state;
    
    if (selectedUser) {
    alert(`Selected user: ${selectedUser.name}`);
    } else {
      alert(`Search for: ${searchQuery}`);
    }
  };

  renderSuggestions = () => {
    const { suggestions, searchQuery } = this.state;
    if (suggestions.length === 0 || searchQuery === "") return null;

    return (
      <ul className="suggestions">
        {suggestions.map((user) => (
          <li key={user.id} onClick={() => this.handleSuggestionClick(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { searchQuery, selectedUser } = this.state;

    return (
      <header className="header">
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={this.handleSearchChange}
            placeholder="Search for users"
          />
          
          {this.renderSuggestions()}
          <button className="search-button" onClick={this.handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          
        </div>
        <div>
        <button className="profile-text">Profile</button>
        </div>
      </header>
    );
  }
}

export default Header;


