import {createStoreHook} from 'react-redux';
import reducers from '../reducers';

export default initStore = () => {
    const store = createStoreHook(reducers);

    return store;
};
