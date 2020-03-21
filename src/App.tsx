
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Heatmap from 'components/Heatmap/Heatmap';
import store from 'store';

render(
    <Provider store={store}><Heatmap /></Provider>,
    document.getElementById('app')
);