
const initialState = {
    petOwners: [],
    selectedPetOwner: null,
    loading: true,
    error: null
}

const petOwnerReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_PETOWNERS_SUCCES':
            return {...state, petOwners: action.payload, loading: false};
        case 'FETCH_PETOWNERS_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'FETCH_PETOWNER_SUCCESS':
            return { ...state, selectedPetOwner: action.payload, loading: false };
        case 'ADD_PETOWNER':
            return { ...state, petOwners: [...state.petOwners, action.payload] };
        case 'UPDATE_PETOWNER':
            return {
                ...state,
                petOwners: state.petOwners.map(app =>
                    app.id === action.payload.id ? action.payload : app
                ),
            };
        case 'DELETE_PETOWNER':
            return {
                ...state,
                petOwners: state.petOwners.filter(app => app.id !== action.payload),
            };
        default:
            return state;

    }

}

export { initialState, petOwnerReducer }