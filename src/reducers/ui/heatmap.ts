import { HeatmapAction } from 'actions';
import { immutableAssign } from 'util';

interface HeatmapState { from: Date; to: Date }

const
    NOW = new Date(),
    YEAR_AGO = new Date(NOW.getFullYear() - 1, NOW.getMonth(), NOW.getDay());

export default function (state: HeatmapState = { from: YEAR_AGO, to: NOW }, action: HeatmapAction): HeatmapState {
    switch (action.type) {
        case 'heatmap/SET_RANGE':
            return immutableAssign(state, { from: action.payload.from, to: action.payload.to });

        default:
            return state;
    }
}