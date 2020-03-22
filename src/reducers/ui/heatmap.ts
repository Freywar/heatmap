import { HeatmapAction } from 'actions';
import { immutableAssign } from 'utils';

export interface HeatmapState { from: Day; to: Day; weeks: Day[][] }

const
    NOW = new Date(),
    DEFAULT_FROM: Day = new Date(NOW.getFullYear() - 1, NOW.getMonth(), NOW.getDate()),
    DEFAULT_TO: Day = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());

function normalize(from: Day, to: Day): HeatmapState {
    from = new Date(from),
    to = new Date( from < to ? to : from),

    from.setDate(from.getDate() - from.getDay());
    to.setDate(to.getDate() - to.getDay() + (to.getDay() !== 6 ? 7 - 1 : 0));

    let week: Day[] = [];
    const
        current: Day = new Date(from),
        weeks = [week];

    while (current <= to) {
        if (current.getDay() === 0 && week.length) {
            week = [];
            weeks.push(week);
        }
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return { from, to, weeks };
}

export default function(state: HeatmapState = normalize(DEFAULT_FROM, DEFAULT_TO), action: HeatmapAction): HeatmapState {
    switch (action.type) {
        case 'heatmap/SET_RANGE':
            return immutableAssign(state, normalize(action.payload.from, action.payload.to) );

        case 'heatmap/ADJUST_RANGE':
            const from = new Date(state.from), to = new Date(state.to);
            from.setDate(from.getDate() + action.payload.days);
            to.setDate(to.getDate() + action.payload.days);

            return immutableAssign(state, normalize(from, to));

        default:
            return state;
    }
}
