import { combineReducers } from 'redux';

import activity from './data/activity';
import heatmap from './ui/heatmap';

export default combineReducers({ data: combineReducers({ activity }), ui: combineReducers({ heatmap }) });