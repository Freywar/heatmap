import { ThunkAction } from 'redux-thunk';
import * as API from 'api';
import { Status } from 'util';
import { action } from '../util';

type LoadActivityAction =
    { type: 'activity/LOAD'; payload: { from?: Date; to?: Date; status: Status.PENDING } } |
    { type: 'activity/LOAD'; payload: { from?: Date; to?: Date; status: Status.SUCCEEDED; response: API.DayActivity[] } } |
    { type: 'activity/LOAD'; payload: { from?: Date; to?: Date; status: Status.FAILED; error: string } };

export const loadActivity = (from?: Date, to?: Date): ThunkAction<Promise<void>, {}, {}, LoadActivityAction> => 
    async (dispatch) => {
        dispatch(action('activity/LOAD', { from, to, status: Status.PENDING }));

        try {
            dispatch(action('activity/LOAD', {
                from, to, status: Status.SUCCEEDED, response: await API.loadActivity(from, to),
            }));
        } catch (error) {
            dispatch(action('activity/LOAD', {
                from, to, status: Status.FAILED, error,
            }));
        }
    };

export type ActivityAction = LoadActivityAction;
