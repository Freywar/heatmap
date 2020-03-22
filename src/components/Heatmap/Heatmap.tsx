import * as React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { loadActivity, moveHeatmapRange } from 'actions';
import { AppState } from 'reducers';
import { Status, interpolate } from 'utils';
import './Heatmap.less';

const PALETTE = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

interface Props {
    from: AppState['ui']['heatmap']['from'];
    to: AppState['ui']['heatmap']['to'];
    weeks: AppState['ui']['heatmap']['weeks'];
    activity: AppState['data']['activity'];
    loadActivity: typeof loadActivity;
    moveHeatmapRange: typeof moveHeatmapRange;
}

const Heatmap: React.FunctionComponent<Props> = ({ from, to, weeks, activity, loadActivity, moveHeatmapRange }) => {
    if (activity.status === Status.INITIAL || activity.status !== Status.PENDING && (from < (activity.from || -Infinity) || (activity.to || Infinity) < to)) {
        loadActivity(from, to);
    }

    const
        days: Day[] = ([] as Day[]).concat(...weeks),
        { min, max, total } = days.reduce((r, day) => {
            const actions = activity.actionsByDay[+day]?.actions || 0;
            r.min = Math.min(r.min, actions);
            r.max = Math.max(r.max, actions);
            r.total += actions;
            return r;
        }, { min: 0, max: 0, total: 0 });

    return (
        <div className="heatmap control">
            <div className="heatmap_details">
                <div className="heatmap_details_total">
                    <FormattedMessage id="heatmap.total" defaultMessage="Total actions during period: {total}" values={{ total }}/>
                </div>

                <div className="heatmap_details_legend">
                    <div className="heatmap_details_legend_label"><FormattedMessage id="heatmap.less" defaultMessage="Less"/></div>
                    {PALETTE.map((color) => <div key={color} className="heatmap_details_legend_item" style={{ backgroundColor: color }}/>)}
                    <div className="heatmap_details_legend_label"><FormattedMessage id="heatmap.more" defaultMessage="More"/></div>
                </div>
            </div>

            <table className="heatmap_grid"><tbody>
                <tr>
                    <td />
                    {weeks.map((days) => {
                        const day = days.find((day) => day.getDate() === 1);
                        return day ?
                            <td key={+day} className="heatmap_grid_month">
                                <div className="heatmap_grid_month_label"><FormattedDate month="short" value={day}/></div>
                            </td> :
                            <td key={+days[0]} className="heatmap_grid_placeholder" />;
                    })}
                </tr>

                {
                    weeks[0].map((firstDay, dayIndex) =>
                        <tr key={dayIndex}>
                            {
                                dayIndex % 2 ?
                                    <td key={+firstDay} className="heatmap_grid_day">
                                        <div className="heatmap_grid_day_label"><FormattedDate weekday="short" value={firstDay}/></div>
                                    </td> :
                                    <td key={+firstDay} className="heatmap_grid_day_placeholder"/>
                            }
                            {weeks.map((days) =>
                                <td
                                    key={+days[dayIndex]} className="heatmap_grid_item"
                                    style={{ backgroundColor: interpolate(min, max, PALETTE, activity.actionsByDay[+days[dayIndex]]?.actions || 0) }}>
                                    <div className="heatmap_grid_item_tooltip control">
                                        <FormattedMessage
                                            id="heatmap.actions"
                                            defaultMessage="{count} actions on {date}"
                                            values={{
                                                date: <FormattedDate value={+days[dayIndex]}/>,
                                                count: activity.actionsByDay[+days[dayIndex]]?.actions || 0,
                                            }}/>
                                    </div>
                                </td>,
                            )}
                        </tr>,
                    )}


                <tr>
                    <td/>
                    <td className="heatmap_grid_controls" colSpan={weeks.length}>
                        <button className="heatmap_grid_controls_prev link" onClick={() => moveHeatmapRange(-28)}>
                            <FormattedMessage id="heatmap.prev" defaultMessage="← Prev"/>
                        </button>
                        <button className="heatmap_grid_controls_next link" onClick={() => moveHeatmapRange(28)}>
                            <FormattedMessage id="heatmap.next" defaultMessage="Next →"/>
                        </button>
                    </td>
                </tr>
            </tbody></table>
        </div>
    );
};

export default connect(
    (state: AppState) => ({ ...state.ui.heatmap, activity: state.data.activity }),
    (dispatch: Dispatch) => bindActionCreators({ loadActivity, moveHeatmapRange }, dispatch),
)(Heatmap);
