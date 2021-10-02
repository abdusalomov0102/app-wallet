import axios from "axios";
import {DELETE_WALLET, GET_ERRORS, GET_WALLET, GET_WALLETS} from "./types";

export const createWallet = (newWallet, history) => async dispatch => {
    await axios.post("/wallet", newWallet)
        .then((res) => {
            history.push("/dashboard");
        }).catch((err) => {
            dispatch({type: GET_ERRORS, payload: err.response.data})
        });
};

export const updateWallet = (id, updateWallet, history) => async dispatch => {
    await axios.put(`/wallet/${id}`, updateWallet)
        .then((res) => {
            history.push("/dashboard");
        }).catch((err) => {
            dispatch({type: GET_ERRORS, payload: err.response.data})
        });
};

export const getWallet = () => async dispatch => {
    await axios.get("/wallet")
        .then((res) => {
            dispatch({type: GET_WALLETS, payload: res.data});
        });
};

export const deleteWallet = (id) => async dispatch => {
    await axios.delete(`/wallet/${id}`)
        .then((res) => {
            dispatch({type: DELETE_WALLET, payload: id});
        });
};

export const getWalletById = (id) => async dispatch => {
    await axios.get(`/wallet/${id}`)
        .then((res) => {
            dispatch({type: GET_WALLET, payload: res.data});
        });
};

//Transactions

export const createTransaction = (newTransaction, history, walletId) => async dispatch => {
    await axios.post(`/transaction/${walletId}`, newTransaction)
        .then((res) => {
            history.push(`/transactions/${walletId}`);
        }).catch((err) => {
            dispatch({type: GET_ERRORS, payload: err.response.data})
        });
};