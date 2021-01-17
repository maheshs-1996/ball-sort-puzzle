import React, { Component } from 'react'
import './App.css'

export default class App extends Component {

  state = {
    searchString: '',
    results: [],
    favourites: []
  }

  componentDidMount() {
    fetch("https://api.npoint.io/5bcf29685fbbde4056b6")
      .then(response => response.json())
      .then(resp => {
        this.setState({
          results: resp
        })
      })
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addToFavourites = (item) => {
    let { favourites, results } = this.state
    let isAlreadyExists = favourites.find(fav => fav.id === item.id)
    if (isAlreadyExists) {

    }
    else {
      favourites.push(item)
    }
    results = results.map((result) => {
      if (result.id === item.id) {
        result['is_fav'] = true
      }
      return result
    })
    this.setState({
      results,
      favourites
    })
  }

  removeFromFavourites = (item) => {
    let { favourites, results } = this.state
    let updatedFavs = favourites.filter(fav => fav.id !== item.id)
    results = results.map((result) => {
      if (result.id === item.id) {
        delete result['is_fav']
      }
      return result
    })
    this.setState({
      favourites: updatedFavs,
      results
    })
  }

  render() {
    const { searchString, favourites, results } = this.state
    let filteredResults = results.filter((result) => result.name.toLowerCase().includes(searchString))
    return (
      <div className="app-container">
        <h1>My Collection</h1>
        <input type="search" className="search" name="searchString" onChange={this.handleOnChange} value={searchString} placeholder="Search for any Item" />
        <div className="results-container">
          <div className="results">
            {
              searchString ? filteredResults.length ? <h2>Search Results</h2> : <h2>No results found</h2> : null
            }
            {
              // ref to clear
              filteredResults.map((item, index) => {
                const { name, imageUrl, is_fav } = item
                const className = is_fav ? 'card fav' : 'card'
                return (
                  <div className={className} key={index}>
                    <img src={imageUrl} alt={name} class="image" />
                    <span className="name">{name}</span>
                    {
                      is_fav ? (<button className="add" onClick={() => this.removeFromFavourites(item)}>Remove from Favs</button>) : (<button class="add" onClick={() => this.addToFavourites(item)}>Add to Favs</button>)
                    }
                  </div>
                )
              })
            }
          </div>
          {
            favourites.length ? (
              <div className="favourites">
                <h2>Favourites</h2>
                {
                  favourites.map((item, index) => (
                    <div className="card fav" key={index}>
                      <img src={item.imageUrl} alt={item.name} class="image" />
                      <span className="name">{item.name}</span>
                      <button className="add" onClick={() => this.removeFromFavourites(item)}>Remove from Favs</button>
                    </div>
                  ))
                }
              </div>
            ) : null
          }
        </div>
      </div>
    )
  }
}

