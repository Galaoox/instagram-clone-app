//import { API_LOGIN } from "../../config/const";
import { SET_SESSION, CLEAR_SESION } from "../ActionTypes";

export const login = ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                title: "pruebas",
                body: "pruebas body",
                userId: 1,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .then((json: any) => {
                // SI todo sale bien guardamos el user y el token en el localstore
                // TODO: INVESTIGAR QUE ES EL DISPATCH
                /**
                 * EL dispacth buscara por el type que pasamos el reducer que corresponda con el
                 * y ejecutara el reduccer de session
                 */
                // TODO CAMBIAR ESTO
                console.log(json);
                dispatch({
                    type: SET_SESSION,
                    user: json,
                    token: json.id,
                });
                return resolve(json.data);
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    return reject(err.response.data);
                } else {
                    //console.log(err);
                    return reject({
                        error: true,
                        message: "Ocurrio un error intentalo mas tarde.",
                    });
                }
            });
    });
};

export const clear = () => (dispatch: any, getState: any) => {
    dispatch({
        type: CLEAR_SESION,
    });
};
