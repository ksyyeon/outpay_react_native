const initialState = {
    isVisible: false,
    titleDisplay: 'flex',
    title: '',
    content: '',
    cancelDisplay: 'flex',
};

export default DialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_DIALOG':
            console.log('show dialog called', action.payload.dialogProps);
            return action.payload.dialogProps;
        case 'HIDE_DIALOG':
            console.log('hide dialog called');
            return state;
        default:
            return state;
    }
};
