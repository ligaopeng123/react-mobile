import React from 'react';
import {Route, Router, Switch, Link, Redirect} from 'react-router-dom';
import {History} from 'history';
import {Add, TodoList} from './pages';
import './App.less';

export interface IAppProps {
	history: History;
}

const App: React.SFC<IAppProps> = ({history}) => (
	<Router history={history}>
		<Switch>
			<Route exact={true} path="/list" component={TodoList}/>
			<Route exact={true} path="/upload" component={Add}/>
			<Redirect to={`/list`}/>
		</Switch>
	
	</Router>
);

export default App;