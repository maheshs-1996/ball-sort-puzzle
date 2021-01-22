import React from 'react'
import { connect } from 'react-redux'

import CardList from '../../components/CardList/cardlist-component'
import CustomButton from '../../components/CustomButton/button-component'
import Searchbox from '../../components/Searchbox/searchbox-component'
import './home-page-styles.css'
import Loader from '../../components/Loader/loader-component'

const HomePage = ({ searchString, results, favourites, isFetching }) => {
    if(isFetching) return <Loader/>
    else{
        const filteredResults = results.filter((result) => result.name.toLowerCase().includes(searchString))
        return (
            <div className="homepage">
                <h1>My Collection</h1>
                <Searchbox placeholder="Search for any Item" name="searchString" />
                {
                    favourites.length ? <CustomButton route='/favourites' buttonText="Go to Favourites" /> : null
                }
                {
                    searchString ? filteredResults.length ? <h2>Search Results</h2> : <h2>No results found</h2> : null
                }
                <CardList list={filteredResults} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    searchString: state.searchString,
    results: state.results,
    favourites: state.favourites,
    isFetching : state.isFetching
})

export default connect(mapStateToProps)(HomePage)
