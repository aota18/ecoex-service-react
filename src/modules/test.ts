
import { createPromiseThunk, handleAsyncActions, reducerUtils} from '../lib/asyncUtils';


import * as TestAPI from '../lib/api/test';


/* Action Types */

const GET_ONE_TEST = 'order/GET_ONE_TEST';
const GET_ONE_TEST_SUCCESS = 'order/GET_ONE_TEST_SUCCESS';
const GET_ONE_TEST_ERROR = 'order/GET_ONE_TEST_ERROR';




/* Action Creator */

export const getOneTest = createPromiseThunk(GET_ONE_TEST, TestAPI.getOneTest);




/* Set initial State */ 

const initialState = {
    getOneTest : reducerUtils.initial(),

};

export default function orders(state = initialState, action) {
    switch(action.type) {
        case GET_ONE_TEST:
        case GET_ONE_TEST_SUCCESS:
        case GET_ONE_TEST_ERROR:
            return handleAsyncActions(GET_ONE_TEST, 'getOneTest')(state, action);
       
        default:
            return state;
    }
}