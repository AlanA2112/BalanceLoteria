import axios from "axios";
import { ADD_RESUMEN, DELETE, GET_ALL } from "./actionsTypes";

const URL = "https://balance-production-13b3.up.railway.app/resumen";

export const addResumen = (resumen) => async dispatch => {
    try {
        console.log(resumen)
        await axios.post(`${URL}/add`, resumen);

        // Después de agregar, obtener los datos actualizados
        dispatch(getAll());
    } catch (e) {
        console.log(e);
    }
};


export const getAll = () => async dispatch => {
    try {
        const { data } = await axios.get(`${URL}/getAll`);
        return dispatch({ type: GET_ALL, payload: data })
    } catch (e) {
        console.log(e);
    }
};

export const deleteById = (id) => async dispatch => {
    try {
        await axios.delete(`${URL}/delete?id=${id}`);

        // Envía la acción para eliminar del estado global
        dispatch({ type: DELETE, payload: id });
    } catch (e) {
        console.log(e);
    }
};
