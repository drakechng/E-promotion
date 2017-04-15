// reducers allow you to 'slice' off a part of the single state object which
// lets you think about the domain in a smaller picture. You could use one
// reducer in a small app like this but in large apps this reducer could be
// several hundred lines. See store.jsx to see how these reducers get 'combined'
// into one single app state. We'll use two reducers, one for transient state
// that the UI uses (selected id,name) and one for data (coming from Mongo)
const initialInterfaceState = {
  navDrawerOpen: false,
  snackbarOpen: false,

};

// helper to *copy* old state and merge new data with it

// these reducers *must* be pure to use time-travel dev-tools
// never directly mutate the `state` param, use merge instead

export default function userInterface(state = initialInterfaceState, action) {
    // console.log("reducers.userInterface  action:", {state, action});

  switch (action.type) {
    case 'TOGGLE_DRAWER_STATE':
      return {
        ...state,
        navDrawerOpen: !state.navDrawerOpen,
      };
    case 'CLOSE_SNACKBAR_STATE':
      return {
        ...state,
        snackbarOpen: false,
      };
    case 'OPEN_SNACKBAR_STATE':
      return {
        ...state,
        snackbarOpen: true,
      };
    default:
      return state;
  }
}

