myApp.controller('HomeController', function ($scope, $rootScope, $state, PostService, AlertMessage) {
	$scope.posts = [];
	$scope.loading = true;
	$scope.page = 1;

	const refreshPage = () => {
		$scope.loading = true;

		return getPosts(1);
	};

	const getPosts = (page) => {
		PostService.list(page)
			.then(response => {
				$scope.posts = response.data.posts;
			}).catch(() => {
				AlertMessage.error('Erro ao buscar posts');
			}).finally(() => {
				$scope.loading = false;
			});
	};

	const handleFilterPosts = (showLikedOnly) => {
		if (!$rootScope.userLogged) {
			AlertMessage.warning('Por favor, faça login para filtrar as publicações.');

			return;
		}

		if (showLikedOnly) {
			$scope.posts = $scope.posts.filter(post => post.is_liked);

			$scope.showLikedOnly = true;

			return;
		}

		if (!showLikedOnly) {
			getPosts($scope.page);

			$scope.showLikedOnly = false;

			return;
		}
	}

	const formatDate = (createdAt) => {
		return new Date(createdAt).toLocaleDateString();
	}

	const truncateText = (text, length) => {
		return text.length > length ? text.substring(0, length) + '...' : text;
	};

	const goToPost = function (postId) {
		$state.go('post', { id: postId });
	};


	const likePost = post => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (!user) {
			AlertMessage.warning('Por favor, faça login para curtir essa publicação.');
			return;
		}

		if (post.is_liked) {
			PostService.dislike(post.id)
				.then(() => {
					post.is_liked = false;
					post.total_likes--;
				})
				.catch(() => {
					AlertMessage.error('Erro ao remover o like');
				});
		} else {
			PostService.like(post.id)
				.then(() => {
					post.is_liked = true;
					post.total_likes++;
				})
				.catch(() => {
					AlertMessage.error('Erro ao adicionar o like');
				});
		}
	};

	$scope.showLikedOnly = false;
	$scope.getPosts = getPosts;
	$scope.formatDate = formatDate;
	$scope.handleFilterPosts = handleFilterPosts;
	$scope.likePost = likePost;
	$scope.refreshPage = refreshPage;
	$scope.goToPost = goToPost;
	$scope.truncateText = truncateText;

	getPosts($scope.page)
});
