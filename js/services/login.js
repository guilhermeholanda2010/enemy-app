myApp.service("LoginService", function ($http) {
	const login = data => {
		return $http.post(`${baseUrl}/login/`, data)
	};

	return {
		login
	}
});
