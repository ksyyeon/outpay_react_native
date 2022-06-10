const initialState = {
    isDialogVisible: false,
    titleDisplay: 'flex',
    title: '',
    content: '',
    cancelDisplay: 'flex',
    confirmClicked: () => {},
    cancelclicked: () => {},
};

export default DialogReducer = (state = initialState, action) => {
    switch (action.stype) {
        case types.SHOW_DIALOG:
            return {
                dialogProps: action.payload,
            };
        case types.HIDE_DIALOG:
            return state;
        default:
            return state;
    }
};
