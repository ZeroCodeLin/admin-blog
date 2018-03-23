import request from '../utils/request';

export async function getEssayList(params) {
    return request('/api/essay/lists',{
        method: 'POST',
        body: params,
    });
}

export async function writeEssay(params) {
    return request('/api/essay/write',{
        method: 'POST',
        body:params
    })
}
