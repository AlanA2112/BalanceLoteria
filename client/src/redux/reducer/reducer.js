import { ADD_RESUMEN, DELETE, GET_ALL, UPDATE_RESUMEN } from "../actions/actionsTypes";

const initialState = {
    listaResumenes: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RESUMEN:
            return {
                ...state,
                listaResumenes: [...state.listaResumenes, action.payload] // Agregar nuevo resumen a la lista
            };
        case UPDATE_RESUMEN:
            console.log(action.payload.data)
            return {
                ...state,
                listaResumenes: state.listaResumenes.map((resumen) =>
                    resumen.id === action.payload.data.id ? action.payload.data : resumen
                ),
            };
        case DELETE:
            return {
                ...state,
                listaResumenes: state.listaResumenes.filter(item => item.id !== action.payload) // Filtrar el eliminado
            };
        case GET_ALL:
            return {
                ...state,
                listaResumenes: action.payload // Reemplazar lista con los nuevos datos del servidor
            };
        default:
            return state;
    }
}

export default rootReducer;
