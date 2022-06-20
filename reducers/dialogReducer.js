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
            console.log('show dialog called');
            return {
                dialogProps: action.payload,
            };
        case 'HIDE_DIALOG':
            console.log('hide dialog called');
            return state;
        default:
            return state;
    }
};
