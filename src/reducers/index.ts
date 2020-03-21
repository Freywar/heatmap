import { combineReducers } from 'redux';

import activity, {ActivityState} from './data/activity';
import heatmap, {HeatmapState} from './ui/heatmap';

export interface AppState{
    data: {activity: ActivityState};
    ui: {heatmap: HeatmapState};
}

export default combineReducers({ data: combineReducers({ activity }), ui: combineReducers({ heatmap }) });