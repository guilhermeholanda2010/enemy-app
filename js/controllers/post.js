myApp.controller('PostController', function ($scope, $state, $stateParams, $modal, PostService, AlertMessage) {
	const user = JSON.parse(localStorage.getItem('user'));;
	$scope.loading = true;

	const getPost = () => {
		$scope.loading = true;
		PostService.find($stateParams.id).then(function (response) {

			const postId = parseInt($stateParams.id, 10);
			$scope.post = response.data.posts.find(post => post.id === postId);

			$scope.isOwner = user && user.id === $scope.post.user_id;
			$scope.loading = false;
		}, function (error) {
			console.error('Erro ao buscar o post:', error);
			$scope.loading = false;
		});
	};

	getPost();

	$scope.openUpdateModal = () => {
		return $modal.open({
			templateUrl: 'view/post-modal.html',
			controller: 'PostModalCtrl',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				post: () => {
					return $scope.post;
				}
			}
		});
	}

	const requestRemovePost = () => {
		PostService.remove($stateParams.id).then(() => {
			AlertMessage.success('Post removido com sucesso');
			goToHome();
		}).catch(() => {
			AlertMessage.error('Erro ao remover o post');
		})
	};

	const goToHome = () => {
		$state.go('home'), {}, { location: 'replace' };
	}

	$scope.openDeleteModal = () => {
		Swal.fire({
			title: "Você tem certeza que deseja remover esta publicação?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sim, remover"
		}).then((result) => {
			if (result.isConfirmed) {
				requestRemovePost();
			}
		});
	}

	$scope.goToHome = goToHome;

});
