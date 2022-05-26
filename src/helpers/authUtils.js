// @flow
import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return false;
    }
    const decoded = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;
    console.log(localUser)
    if (localUser === null || localUser.token === null) {
        return false;
    } else {
        return true;
    }
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};

export { isUserAuthenticated, getLoggedInUser };
