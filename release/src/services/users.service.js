import axios from 'axios';

// const baseURL = 'https://release-nucba.herokuapp.com/api/user';
const baseURL = 'http://localhost:3100/api/user';

export const getAllUsers = () => {
    return axios.get(`${baseURL}`);
}

export const createUser = ({ firstName, lastName, age, email, password }) => {
    return axios.post(`${baseURL}`, {firstName, lastName, age, email, password});
}

export const getUserById = ({ id }) => {
    return axios.get(`${baseURL}/${id}`);
}

export const enableUser = ({ id }) => {
    return axios.get(`${baseURL}/enable/${id}`);
}

export const disableUser = ({ id }) => {
    return axios.delete(`${baseURL}/${id}`);
}