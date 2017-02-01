
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import user from './user';
import list from './shopList';

export default combineReducers({

  drawer,
  user,
  list,
  cardNavigation,

});
