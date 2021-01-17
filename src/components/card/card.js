import React from 'react'
import './card.css'

const Card = ({ item, removeFromFavourites, addToFavourites }) => {
    const { name, imageUrl, is_fav } = item
    const className = is_fav ? 'card fav' : 'card'
    return (
        <div className={className}>
            <img src={imageUrl} alt={name} class="image" />
            <span className="name">{name}</span>
            {
                is_fav ? (<button className="add" onClick={() => removeFromFavourites(item)}>Remove from Favs</button>) : (<button class="add" onClick={() => addToFavourites(item)}>Add to Favs</button>)
            }
        </div>
    )
}

export default Card
