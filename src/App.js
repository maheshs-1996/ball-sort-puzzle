import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { fetchCollectionsStart } from './redux/actions'
import HomePage from './pages/home/home-page'
import Favourites from './pages/favourites/favourites-page'
import './App.css'

class App extends Component {

  componentDidMount() {
    this.props.fetchCollectionsStart()
  }

  render() {
    return (
      <div className="app-container">
        <Route exact path='/' component={HomePage} />
        <Route path='/favourites' component={Favourites} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  favourites: state.favourites
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: (resp) => dispatch(fetchCollectionsStart(resp))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

