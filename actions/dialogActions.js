export const showDialog = props => {
    return {
        type: 'SHOW_DIALOG',
        payload: props,
    };
};

export const hideDialog = () => {
    return {
        type: 'HIDE_DIALOG',
    };
};
