import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ServerInternalError from './ServerInternalError';

export default function Error() {
	return (
		<Switch>
			<Route path="/error/500" component={ServerInternalError} />
		</Switch>
	);
}
