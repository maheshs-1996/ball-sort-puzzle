import React from 'react'
import { connect } from 'react-redux'

import './searchbox-styles.css'
import { handleOnChange } from '../../redux/actions'

const Searchbox = ({searchString, handleOnChange, placeholder,name}) => (
    <input type="search" autoComplete="off" className="search" name={name} onChange={handleOnChange} value={searchString} placeholder={placeholder} />
)

const mapStateToProps = state => ({
    searchString: state.searchString
})

const mapDispatchToProps = dispatch => ({
    handleOnChange: event => dispatch(handleOnChange(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(Searchbox)
