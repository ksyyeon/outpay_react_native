import types from './types';

export const showDialog = dialogProps => {
    return {
        type: types.SHOW_DIALOG,
        payload: dialogProps,
    };
};

export const hideDialog = () => {
    return {
        type: types.HIDE_DIALOG,
    };
};
