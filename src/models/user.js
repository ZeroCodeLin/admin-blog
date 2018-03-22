import { query as queryUsers, queryCurrent, userDetail } from '../services/user';

export default {
    namespace: 'user',

    state: {
        userInfo:{}
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(userDetail);
            if(response.status == 'success'){
                yield put({
                    type: 'save',
                    payload: response.data,
                });
            }else{
                location.href = '#/user/login'
            }
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                userInfo: action.payload
            };
        },
    },
};
