import React from 'react'
import './button.css'
import { Link } from 'react-router-dom'

const CustomButton = ({ buttonText, route }) => (
    <Link className="fav-btn" to={route}>{buttonText}</Link>
)

export default CustomButton
