import axios from 'axios';

const addr = '/testAddr';

export const getOneTest = (testId) => axios.get(addr, testId);