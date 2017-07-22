import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './state/reducers';
import {setAuthorisationToken} from './utils/AuthService';
import {setCurrentUser} from './state/actions/authAction';
import ReduxToastr from 'react-redux-toastr';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import registerServiceWorker from './registerServiceWorker';
import { loadAllTenants } from './state/actions/tenantAction'

const app = document.getElementById('root');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combinedReducers, composeEnhancers(applyMiddleware(thunk,loadingBarMiddleware()))
);
//store.dispatch(loadAllTenants());
if(localStorage.rs_token){
    setAuthorisationToken(localStorage.getItem('rs_token'));
    store.dispatch(setCurrentUser(JSON.parse(localStorage.getItem('user'))));
}


ReactDOM.render(
    <Provider store={store} >
        <div>
            <App/>
            <ReduxToastr
                timeOut={5000}
                newestOnTop={true}
                preventDuplicates
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"/>
        </div>
    </Provider>, app);

registerServiceWorker();
