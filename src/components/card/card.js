import React from 'react'
import { connect } from 'react-redux'
import { addToFavourites, removeFromFavourites } from '../../components/redux/actions'

import './card.css'

const Card = ({ item, removeFromFavourites, addToFavourites }) => {
    const { name, imageUrl, is_fav } = item
    const className = is_fav ? 'card fav' : 'card'
    return (
        <div className={className}>
            <img src={imageUrl} alt={name} className="image" />
            <span className="name">{name}</span>
            {
                is_fav ? (<button className="add" onClick={() => removeFromFavourites(item)}>Remove from Favs</button>) : (<button className="add" onClick={() => addToFavourites(item)}>Add to Favs</button>)
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addToFavourites: item => dispatch(addToFavourites(item)),
    removeFromFavourites: item => dispatch(removeFromFavourites(item))
})

export default connect(null,mapDispatchToProps)(Card)
