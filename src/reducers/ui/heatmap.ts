import { HeatmapAction } from 'actions';
import { immutableAssign } from 'utils';

export interface HeatmapState { from: Day; to: Day; weeks: Day[][] }

const
    NOW = new Date(),
    DEFAULT_FROM: Day = new Date(NOW.getFullYear() - 1, NOW.getMonth(), NOW.getDate()),
    DEFAULT_TO: Day = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());

function weeks(from: Day, to: Day): Day[][] {
    const
        current: Day = new Date(from),
        last: Day = new Date(to);

    let week: Day[] = [];

    const result = [week];

    current.setDate(current.getDate() - current.getDay());
    last.setDate(last.getDate() - last.getDay() + 7 - 1);

    while (current <= last) {
        if (current.getDay() === 0 && week.length) {
            week = [];
            result.push(week);
        }
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return result;
}

const initial: HeatmapState = { from: DEFAULT_FROM, to: DEFAULT_TO, weeks: weeks(DEFAULT_FROM, DEFAULT_TO) };

export default function(state: HeatmapState = initial, action: HeatmapAction): HeatmapState {
    switch (action.type) {
        case 'heatmap/SET_RANGE':
            return immutableAssign(state, { from: action.payload.from, to: action.payload.to, weeks: weeks(action.payload.from, action.payload.to) });

        default:
            return state;
    }
}
