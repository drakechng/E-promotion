export function setImageUrl() {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_IMAGEURL',
    });
  };
}
