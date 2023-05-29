import axios from "axios";

export const GET_ALL_MOTOS = "GET_ALL_MOTOS"
export const GET_MOTOS_BY_NAME = "GET_MOTOS_BY_NAME"
export const GET_MOTO_BY_ID = "GET_MOTO_BY_ID"
export const CHANGE_FILTER_CATEGORY = "CHANGE_FILTER_CATEGORY"
export const CHANGE_FILTER_BRAND = "CHANGE_FILTER_BRAND"
export const ORDER_ASC = "ORDER_ASC"
export const ORDER_DESC = "ORDER_DESC"
export const SET_ACTIVE_SEARCH = "SET_ACTIVE_SEARCH"
export const ADD_ITEM_TO_CART ='ADD_ITEM_TO_CART';
export const DELETE_ITEM_FROM_CART ='DELETE_ITEM_FROM_CART';
export const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY';

export const fetchData = (dispatch) => {
    axios.get(`${process.env.REACT_APP_HOST_NAME}/motorcycles`)
    .then(d => dispatch(getAllMotos(d.data)))
    .catch(err => console.log(err))
}

const getAllMotos = (motos) => {
    return {
        type: GET_ALL_MOTOS,
        payload: motos
    }
}

const getMotosByName = (motos) => {
    return{
        type: GET_MOTOS_BY_NAME,
        payload: motos
    }
}

const setActiveSearch = (value) => {
    return {
        type: SET_ACTIVE_SEARCH,
        payload: value
    }
}

export const fetchDataByName = (dispatch,value) => {
    axios.get(`${process.env.REACT_APP_HOST_NAME}/motorcycles?name=${value}`)
    .then(d => {
        dispatch(getMotosByName(d.data));
        dispatch(setActiveSearch(value));
    })
    .catch(err => console.log(err))
}

export const postMotorcycle = async (data) => {
    return await axios.post(`${process.env.REACT_APP_HOST_NAME}/motorcycles`, data)
}

export const getMotoById = (id) => {
}

export const changeFilterCategory = (category) => {
    return {
        type: CHANGE_FILTER_CATEGORY,
        payload: category
    }
}

export const orderAscending =  (value) => {
return {
        type: ORDER_ASC,
        payload: value
    }
}


export const orderDescending =  (value) => {
    return {
            type: ORDER_DESC,
            payload: value
        }
    }

export const changeFilterBrand = (brand) => {
    return {
        type: CHANGE_FILTER_BRAND,
        payload: brand
    }
}

export const addItemToCart = (data) => {
    return function(dispatch) {

        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: data,
          })
    }
}

export const deleteItemFromCart = (data) => {
    return function(dispatch) {

        dispatch({
            type: DELETE_ITEM_FROM_CART,
            payload: data,
          })
    }
}

export const updateCartItemQuantity = (data) => {
    return function(dispatch) {

        dispatch({
            type: UPDATE_CART_ITEM_QUANTITY,
            payload: data,
          })
    }
}

