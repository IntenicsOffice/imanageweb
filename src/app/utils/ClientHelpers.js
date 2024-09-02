import Cookies from 'js-cookie';

const getCookie = (name) => {
	return Cookies.get(name);
};

const setCookie = (name, value, days) => {
	return Cookies.set(name, value, { expires: days });
};

const deleteCookie = (name) => {
	return Cookies.remove(name)
};

export { getCookie, setCookie, deleteCookie }
