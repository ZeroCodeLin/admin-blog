import request from '../utils/request';

export async function getEssayList(params) {
    return request('/api/blog/lists',{
        method: 'POST',
        body: params,
    });
  }