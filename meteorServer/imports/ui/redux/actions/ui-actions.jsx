export function toggleDrawer() {
    return (dispatch, getState) => {
        dispatch ({
            type: 'TOGGLE_DRAWER_STATE'
        });
    }
}
