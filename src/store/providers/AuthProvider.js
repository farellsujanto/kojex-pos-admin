import React, { useState, useEffect } from 'react';

import { AuthContext } from '../Context';

// import { firebaseApp } from '../../utils/Firebase';

export default ({ children }) => {

    const [auth, setAuth] = useState(false);

    useEffect(() => {
		// const unsubscribeAuthListener = firebaseApp.auth().onAuthStateChanged((user) => {
		// 	if (user) {
		// 		setAuth(true);
		// 		console.log("LOGGED IN")
		// 	} else {
		// 		setAuth(false);
		// 		console.log("LOGGED OUT")
		// 	}
		// });
		// return () => unsubscribeAuthListener();
	}, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}
