myApp.service("PostService", function ($http) {
	const list = (page, userId = '') => {
		return $http.get(`${baseUrl}/posts/?${userId}page=${page}`);
	};

	const create = (data) => {
		return $http.post(`${baseUrl}/posts/`, data);
	}

	const find = (id) => {
		return $http.get(`${baseUrl}/posts/${id}`);
	}

	const update = (data) => {
		return $http.put(`${baseUrl}/posts/${data.id}`, data)
	}

	const remove = (id) => {
		return $http.delete(`${baseUrl}/posts/${id}`);
	}

	const like = (id) => {
		return $http.post(`${baseUrl}/posts/${id}/like`);
	}

	const dislike = (id) => {
		return $http.put(`${baseUrl}/posts/${id}/dislike`);
	}

	return {
		list, create, find, update, remove, like, dislike
	}
});
