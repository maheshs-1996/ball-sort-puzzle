export const fetchCollections = (resp) => ({
    type:'FETCH_COLLECTIONS',
    payload : resp
})

export const addToFavourites = item => ({
    type:'ADD_TO_FAVOURITES',
    payload : item
})

export const removeFromFavourites = item => ({
    type:'REMOVE_FROM_FAVOURITES',
    payload : item
})

export const handleOnChange = event => ({
    type:'HANDLE_ON_CHANGE',
    payload : event
})