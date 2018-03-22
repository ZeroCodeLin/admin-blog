import request from '../utils/request';

export async function userDetail() {
    return request('/api/users/detail');
}