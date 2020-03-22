import { action } from '../utils';

export const setHeatmapRange = (from: Day, to: Day) => action('heatmap/SET_RANGE', { from, to });

export const moveHeatmapRange = (days: number) => action('heatmap/ADJUST_RANGE', { days });

export type HeatmapAction = ReturnType<typeof setHeatmapRange>;
