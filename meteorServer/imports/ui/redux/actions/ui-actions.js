export function toggleDrawer() {
  return (dispatch) => {
    dispatch({
      type: 'TOGGLE_DRAWER_STATE',
    });
  };
}
export function openSnackBar() {
  return (dispatch) => {
    dispatch({
      type: 'OPEN_SNACKBAR_STATE',
    });
  };
}
export function closeSnackBar() {
  return (dispatch) => {
    dispatch({
      type: 'CLOSE_SNACKBAR_STATE',
    });
  };
}
