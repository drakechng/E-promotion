export function toggleDrawer() {
    return (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_DRAWER_STATE'
        });
    }
}
export function openSnackBar() {
    return (dispatch, getState) => {
        dispatch({
            type: 'OPEN_SNACKBAR_STATE'
        });
    }
}
export function closeSnackBar() {
    return (dispatch, getState) => {
        dispatch({
            type: 'CLOSE_SNACKBAR_STATE'
        });
    }
}
