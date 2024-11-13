
const initialState = {
    pets: [],
    selectedPet: null,
    loading: true,
    error: null
}

const petReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_PETS_SUCCES':
            return {...state, pets: action.payload, loading: false};
        case 'FETCH_PETS_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'FETCH_PET_SUCCESS':
            return { ...state, selectedPet: action.payload, loading: false };
        case 'ADD_PET':
            return { ...state, pets: [...state.pets, action.payload] };
        case 'UPDATE_PET':
            return {
                ...state,
                pets: state.pets.map(app =>
                    app.id === action.payload.id ? action.payload : app
                ),
            };
        case 'DELETE_PET':
            return {
                ...state,
                pets: state.pets.filter(app => app.id !== action.payload),
            };
        default:
            return state;

    }

}

export { initialState, petReducer }
