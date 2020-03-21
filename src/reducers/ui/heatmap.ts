import { HeatmapAction } from 'actions';
import { immutableAssign } from 'utils';

export interface HeatmapState { from: Day; to: Day; weeks: Day[][] }

const
    NOW = new Date(),
    DEFAULT_FROM: Day = new Date('2000-01-00T00:00:00.000Z') ,
    DEFAULT_TO: Day = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());

function weeks(from: Day, to: Day): Day[][]{
    const
        current: Day= new Date(from),
        last: Day = new Date(to);

    let week: Day[] = [];

    const result = [week];
    
    current.setDate(current.getDate() - current.getDay());
    last.setDate(current.getDate() - current.getDay() + 7 - 1);
    
    while (current <= last) {
        if (current.getDay() === 0){
            week = [];
            result.push(week);
        }
        week.push( new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return result;
}

export default function (state: HeatmapState = { from: DEFAULT_FROM, to: DEFAULT_TO, weeks: weeks(DEFAULT_FROM, DEFAULT_TO) }, action: HeatmapAction): HeatmapState {
    switch (action.type) {
        case 'heatmap/SET_RANGE':
            return immutableAssign(state, { from: action.payload.from, to: action.payload.to, weeks:weeks(action.payload.from, action.payload.to) });

        default:
            return state;
    }
}