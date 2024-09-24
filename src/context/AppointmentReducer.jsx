
const initialState = {
    appointments: [],
    selectedAppointment: null,
    loading: true,
    error: null,
};
  
const appointmentReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_APPOINTMENTS_SUCCESS':
            return { ...state, appointments: action.payload, loading: false };
        case 'FETCH_APPOINTMENTS_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'FETCH_APPOINTMENT_SUCCESS':
            return { ...state, selectedAppointment: action.payload, loading: false };
        case 'ADD_APPOINTMENT':
            return { ...state, appointments: [...state.appointments, action.payload] };
        case 'UPDATE_APPOINTMENT':
            return {
                ...state,
                appointments: state.appointments.map(app =>
                    app.id === action.payload.id ? action.payload : app
                ),
            };
        case 'DELETE_APPOINTMENT':
            return {
                ...state,
                appointments: state.appointments.filter(app => app.id !== action.payload),
            };
        default:
            return state;
    }
};
  
export { appointmentReducer, initialState };

