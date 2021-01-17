const INITIAL_STATE = {
    searchString: '',
    results: [],
    favourites: []
}

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_COLLECTIONS':
            return {
                ...state,
                results: action.payload
            }
        case 'ADD_TO_FAVOURITES': {
            let { favourites, results } = state
            let item = action.payload
            let isAlreadyExists = favourites.find(fav => fav.id === item.id)
            if (!isAlreadyExists) {
                favourites.push(item)
                results = results.map((result) => {
                    if (result.id === item.id) {
                        result['is_fav'] = true
                    }
                    return result
                })
            }
            return {
                ...state,
                results,
                favourites
            }
        }
        case 'REMOVE_FROM_FAVOURITES': {
            let { favourites, results } = state
            let item = action.payload
            let updatedFavs = favourites.filter(fav => fav.id !== item.id)
            results = results.map((result) => {
                if (result.id === item.id) {
                    delete result['is_fav']
                }
                return result
            })
            return {
                ...state,
                favourites: updatedFavs,
                results
            }
        }
        case 'HANDLE_ON_CHANGE':
            let e = action.payload
            return {
                ...state,
                [e.target.name]: e.target.value

            }
        default: return state
    }
}

export default rootReducer