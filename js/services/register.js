myApp.service("RegisterService", function ($http) {
	const register = data => {
		return $http.post(`${baseUrl}/users/`, data);
	};

	return {
		register
	}
});