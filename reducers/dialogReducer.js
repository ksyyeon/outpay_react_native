const initialState = {
    calledBy: '',
    entryScreen: '',
    content: '',
    js: '',
};

export default DialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_DIALOG':
            console.log('show dialog', action.payload);
            console.log('show dialog called by', action.payload.calledBy);
            return action.payload;
        case 'HIDE_DIALOG':
            console.log('hide dialog called');
            return state;
        default:
            return state;
    }
};
