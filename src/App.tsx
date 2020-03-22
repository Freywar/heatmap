
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import Heatmap from 'components/Heatmap/Heatmap';
import store from 'store';
import 'common.less';
import 'App.less';

render(
    <Provider store={store}>
        <IntlProvider locale="en">
            <Heatmap />
        </IntlProvider>
    </Provider>,
    document.getElementById('app'),
);
