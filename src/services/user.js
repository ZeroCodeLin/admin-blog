import request from '../utils/request';

export async function userDetail() {
    return request('/api/users/detail');
}

export async function updateUser(params) {
    return request('/api/users/update',{
        method: 'POST',
        body:params
    })
}

export async function login(params) {
    return request('/api/login',{
        method: 'POST',
        body: params
    })
}