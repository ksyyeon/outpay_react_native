export const showDialog = dialogProps => {
    return {
        type: 'SHOW_DIALOG',
        payload: dialogProps,
    };
};

export const hideDialog = () => {
    return {
        type: 'HIDE_DIALOG',
    };
};
