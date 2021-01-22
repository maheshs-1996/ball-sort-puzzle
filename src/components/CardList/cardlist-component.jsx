import React from 'react'
import './cardlist-styles.css'
import Card from '../card/card'

const CardList = ({ list }) => (
    <div className="card-list">
        {
            list.map((item, index, ...otherProps) => (
                <Card key={index} item={item} {...otherProps} />
            ))
        }
    </div>
)

export default CardList
