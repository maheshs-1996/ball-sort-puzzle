import React from 'react'
import { connect } from 'react-redux'
import CustomButton from '../../components/CustomButton/button-component'

import './favourite-page-styles.css'
import CardList from '../../components/CardList/cardlist-component'

const Favourites = ({favourites, history}) => {
    if (favourites && favourites.length) {
        return (
            <div className="favourites">
                <h2>Favourites</h2>
                <CustomButton route='/' buttonText="Back to home" />
                <CardList list={favourites} />
            </div>
        )
    }
    else{
        history.push('/')
    }
    return null
}

const mapStateToProps = state => ({
    favourites: state.favourites
})

export default connect(mapStateToProps)(Favourites)
