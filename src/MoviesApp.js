import React from "react";
import axios from "axios";
import "./App.css";

class MoviesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filterData: [],
      searchElement: ""
    };
  }

  async componentDidMount() {
    console.clear();
    let result = await axios.get(
      "https://www.omdbapi.com/?apikey=45f0782a&s=war"
    );
    this.setState({
      data: result.data.Search,
      filterData: result.data.Search
    });
  }

  Search = async data => {
    console.log(data);
    let search = await axios.get(
      `https://www.omdbapi.com/?apikey=45f0782a&s=${data === "" ? "war" : data}`
    );
    this.setState({ filterData: search.data.Search, searchElement: data });
    console.log("after fetching the data");
  };

  render() {
    let data = this.state.filterData;

    return (
      <div className="body--wrapper">
        <h1>Movie App</h1>
        <div className="section-body">
          <div className="searchBar--wrapper">
            <input
              type="text"
              className="searchBar"
              placeholder="Search For Movie Title ……"
              onChange={e => this.Search(e.target.value)}
            />
            <i className="fa fa-search search-icon"></i>
          </div>
          {data !== undefined && (
            <div>
              <h2 className="movie-heading">Movies</h2>
              <br />
              <div className="moviePosters--wrapper">
                {data.map(i => (
                  <div className="poster--pack" key={i.imdbID} title={i.Title}>
                    <div className="poster--img--wrapper">
                      <img className="poster--img" src={i.Poster} alt="img" />
                    </div>
                    <div className="poster--name">
                      <p className="title">{i.Title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data === undefined && (
            <div className="error--wrapper">
              <span className="error404">{this.state.searchElement} </span>
              Not Found!
            </div>
          )}
          <div className="main-footer">
            <footer>© 2022 Sachin Kudande</footer>
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesApp;