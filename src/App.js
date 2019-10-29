import React, { useContext } from 'react';

import { PathContext } from './store/Context';

import Routes from './Routes'

export default () => {
	const [, setPath] = useContext(PathContext)
	return (
		<div>
			<button onClick={() => {
				setPath('/')
			}}>1</button>
			<button onClick={() => {
				setPath('/about')
			}}>2</button>
			<button onClick={() => {
				setPath('/ASD')
			}}>3</button>
			<Routes />
		</div>

	);
}