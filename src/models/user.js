import { userDetail, updateUser, login } from '../services/user';
import { showNotification } from '../utils/message'

export default {
    namespace: 'user',

    state: {
        userInfo:{},
        status: undefined,
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
        *update({ payload }, { call, put }) {
            const response = yield call(updateUser, payload);
            if(response.status == 'success'){
                showNotification('修改信息成功')
            }else{
                showNotification('修改信息失败', response.msg, 'error')
            }
        },
        *login({ payload }, { call, put }) {
            const response = yield call(login, payload);
            // yield put({
            //   type: 'changeLoginStatus',
            //   payload: response,
            // });
            if (response.status === 'success') {
              reloadAuthorized();
              yield put(routerRedux.push('/'));
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
