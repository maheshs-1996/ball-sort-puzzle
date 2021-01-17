import React, { Component } from 'react'
import Card from './components/card/card'
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
    const { addToFavourites, removeFromFavourites, state } = this
    const { searchString, favourites, results } = state
    const filteredResults = results.filter((result) => result.name.toLowerCase().includes(searchString))
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
              filteredResults.map((item, index) => (
                <Card key={index} item={item} addToFavourites={addToFavourites} removeFromFavourites={removeFromFavourites} />
              ))
            }
          </div>
          {
            favourites.length ? (
              <div className="favourites">
                <h2>Favourites</h2>
                {
                  favourites.map((item, index) => (
                    <Card key={index} item={item} addToFavourites={addToFavourites} removeFromFavourites={removeFromFavourites} />
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

