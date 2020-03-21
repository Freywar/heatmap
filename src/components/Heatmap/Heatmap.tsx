import * as React from 'react';
import {FormattedMessage, FormattedDate} from 'react-intl';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { loadActivity, moveHeatmapRange } from 'actions';
import { AppState } from 'reducers';
import { Status ,interpolate} from 'utils';
import './Heatmap.less';

const PALETTE = ['#ebedf0','#c6e48b','#7bc96f','#239a3b','#196127'];

interface Props {
    from: AppState['ui']['heatmap']['from'];
    to: AppState['ui']['heatmap']['to'];
    weeks: AppState['ui']['heatmap']['weeks'];
    activity: AppState['data']['activity'];
    loadActivity: typeof loadActivity;
}

const Heatmap: React.FunctionComponent<Props> = ({ from, to, weeks, activity, loadActivity }) => {
    if (activity.status === Status.INITIAL || (activity.from || -Infinity) > from || (activity.to || Infinity) < to) {
        loadActivity(from, to);
    }

    const 
        days: Day[] = ([] as Day[]).concat(...weeks),
        {min,max, total} = days.reduce((r, day)=>{
            const actions =  activity.actionsByDay[+day]?.actions || 0;
            r.min = Math.min(r.min, actions);
            r.max = Math.max(r.max, actions);
            r.total +=actions;
            return r;
        }, {min:0, max:0, total:0});

    return (
        <div className="heatmap">
            <div className="heatmap_total">
                <FormattedMessage id="heatmap.total" defaultMessage="Total actions: {total}" values={{total }}/>
            </div>

            <div className="heatmap_months">
                {days.filter(day => day.getDate() === 0).map(day => <div key={+day} className="heatmap_months_month"><FormattedDate value={day}/></div>)}
            </div>

            <div className="heatmap_days">
                {weeks[0].map(day => <div key={+day} className="heatmap_days_day"><FormattedDate value={day}/></div>)}
            </div>

            <div className="heatmap_grid">
                {weeks.map(days => 
                    <div key={+days[0]} className="heatmap_grid_week">
                        {days.map(day =>
                            <div key={+day} className="heatmap_grid_item" style={{backgroundColor:interpolate(min, max, PALETTE, activity.actionsByDay[+day]?.actions||0)}}>
                                <div className="heatmap_grid_item_tooltip">
                                    <FormattedDate value={day}/>
                                    <FormattedMessage id="heatmap.actions" defaultMessage="Actions: {count}" values={{ count:activity.actionsByDay[+day]?.actions||0 }}/>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="heatmap_controls">
                <button onClick={()=>moveHeatmapRange(-28)}><FormattedMessage id="heatmap.prev" defaultMessage="← Prev"/></button>
                <button onClick={()=>moveHeatmapRange(28)}><FormattedMessage id="heatmap.next" defaultMessage="Next →"/></button>
            </div>

            <div className="heatmap_legend">
                <FormattedMessage  id="heatmap.less" defaultMessage="Less"/>
                {PALETTE.map(color=><div key="color" className="heatmap_legend_item" style={{backgroundColor:color}}/>)}
                <FormattedMessage  id="heatmap.less" defaultMessage="More"/>
            </div>
        </div>
    );
};

export default connect(
    (state: AppState) => ({ ...state.ui.heatmap, activity: state.data.activity }),
    (dispatch: Dispatch)=>bindActionCreators({ loadActivity }, dispatch)
)(Heatmap);
