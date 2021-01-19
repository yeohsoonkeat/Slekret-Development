import React from 'react';
import { Route, Switch } from 'react-router-dom';
import InvalidToken from './InvalidToken';
import ServerInternalError from './ServerInternalError';

export default function Error() {
	return (
		<Switch>
			<Route path="/error/500" component={ServerInternalError} />
			<Route path="/error/token-expired" component={InvalidToken} />
		</Switch>
	);
}
