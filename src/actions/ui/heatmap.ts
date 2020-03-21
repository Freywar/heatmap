import { action } from '../util';

export const setHeatmapRange = (from: Date, to: Date) => action('heatmap/SET_RANGE', { from, to });

export type HeatmapAction = ReturnType<typeof setHeatmapRange>;
