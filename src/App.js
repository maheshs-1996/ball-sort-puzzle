import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchCollectionsStart, handleOnChange } from './redux/actions'
import Card from './components/card/card'
import './App.css'

class App extends Component {

  componentDidMount() {
    this.props.fetchCollectionsStart()
  }

  handleOnChange = (e) => {
    this.props.handleOnChange(e)
  }

  render() {
    const { searchString, favourites, results } = this.props
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
                <Card key={index} item={item} {...this.props} />
              ))
            }
          </div>
          {
            favourites.length ? (
              <div className="favourites">
                <h2>Favourites</h2>
                {
                  favourites.map((item, index) => (
                    <Card key={index} item={item} {...this.props} />
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

const mapStateToProps = state => ({
  searchString: state.searchString,
  results: state.results,
  favourites: state.favourites
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: (resp) => dispatch(fetchCollectionsStart(resp)),
  handleOnChange: event => dispatch(handleOnChange(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

