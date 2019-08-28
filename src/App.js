import React, { useContext } from 'react';

import { PathContext } from './utils/Store';

import Routes from './utils/Routes'

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





/**
 *
 * Old
 *
 */
// import logo from './logo.svg';
// import './App.css';

// import HomePage from './components/home';

// function App() {
//   return (
//     <div className="App">
//       <HomePage />
//     </div>
//   );
// }

// export default App;
