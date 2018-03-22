import { getEssayList } from '../services/essay';
import { message } from 'antd';

export default {
    namespace: 'essay',

    state: {
        essayList: [],
        loading: false,
        pagination: {
            pageSize: 1,
            page: 1,
        },
    },

    effects: {
        *fetchList({ payload }, { call, put }) {
            // yield put({
            //     type: 'changeLoading',
            //     payload: true,
            // });
            const response = yield call(getEssayList, payload);
            yield put({
                type: 'getList',
                payload: { ...response, pagination: payload },
            });
            // yield put({
            //     type: 'changeLoading',
            //     payload: false,
            // });
        }
    },

    reducers: {
        getList(state, action) {

            return {
                ...state,
                essayList: action.payload.data,
                pagination: { ...action.payload.pagination, total: action.payload.total }
            }
        },
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload,
            };
        },
    },
};
