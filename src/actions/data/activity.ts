import { ThunkAction } from 'redux-thunk';
import * as API from 'api';
import { Status } from 'utils';
import { action } from '../utils';

type LoadActivityAction =
    { type: 'activity/LOAD'; payload: { from?: Day; to?: Day; status: Status.PENDING } } |
    { type: 'activity/LOAD'; payload: { from?: Day; to?: Day; status: Status.SUCCEEDED; response: API.DayActivity[] } } |
    { type: 'activity/LOAD'; payload: { from?: Day; to?: Day; status: Status.FAILED; error: string } };

export const loadActivity = (from?: Day, to?: Day): ThunkAction<Promise<void>, {}, {}, LoadActivityAction> =>
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
