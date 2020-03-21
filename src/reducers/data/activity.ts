import { ActivityAction } from 'actions';
import * as API from 'api';
import { Status, immutableAssign, assertNever } from 'util';

interface ActivityState {
    actions: API.DayActivity[];
    from?: Date;
    to?: Date;
    status: Status;
}

export default function (state: ActivityState = { actions: [], status: Status.INITIAL }, action: ActivityAction) {
    switch (action.type) {
        case 'activity/LOAD':
            switch (action.payload.status) {
                case Status.PENDING: return { ...state, status: Status.PENDING };
                case Status.SUCCEEDED:
                    // TODO in a real app it would be better to keep all the data and manage loaded and unloaded parts with something like `{ ranges: { from: Date; to: Date; status:Status }[] }` to avoid re-requesting data
                    // but here I'll use the lazy approach - one range, if the old one can be merged with the new one - do it, if not - dump it

                    const
                        sfrom = state.from || -Infinity,
                        sto = state.to || Infinity,
                        afrom = action.payload.from || -Infinity,
                        ato = action.payload.to || Infinity;

                    if (state.status != Status.INITIAL && afrom <= sfrom && sfrom <= ato && sto > ato) {
                        return immutableAssign(state, {
                            from: action.payload.from,
                            actions: [...action.payload.response, ...state.actions.filter(({ day }) => day > ato)]
                        });
                    }
                    if (state.status != Status.INITIAL && sfrom < afrom && afrom <= sto && sto <= ato) {
                        return immutableAssign(state, {
                            to: action.payload.to,
                            actions: [...state.actions.filter(({ day }) => day < ato), ...action.payload.response]
                        });
                    }
            
                    return immutableAssign(state, {
                        from: action.payload.from,
                        to: action.payload.to,
                        actions: action.payload.response
                    });
            

                case Status.FAILED: return { actions: [], status: Status.FAILED };

                default: assertNever(action.payload); return state;
            }

        default:
            return state;
    }
}