myApp.controller('PostModalCtrl', function ($scope, $modalInstance, post, PostService, AlertMessage) {
	$scope.isEdit = !!post?.id;

	$scope.form = {
		id: post?.id,
		title: post?.title || '',
		content: post?.content || '',
		summary: post?.summary || '',
		cover_image_url: post?.cover_image_url || '',
		loading: false
	};

	const dismissModal = () => {
		$modalInstance.dismiss();
	}

	const closeModal = () => {
		$modalInstance.close();
	}

	const submit = () => {
		const action = $scope.isEdit ? 'update' : 'create';
		const messageByAction = {
			create: 'Publicação criada com sucesso',
			update: 'Publicação atualizada com sucesso'
		}

		PostService[action]({
			id: $scope.form.id,
			title: $scope.form.title,
			content: $scope.form.content,
			summary: $scope.form.summary,
			cover_image_url: $scope.form.cover_image_url
		}).then(() => {
			AlertMessage.success(messageByAction[action]);

			closeModal();
			window.location.reload();

		}).catch(() => {
			AlertMessage.error('Algo de errado aconteceu, tente novamente em instantes.');
		}).finally(() => {
			$scope.form.loading = false;
		});

	}

	$scope.submit = submit;
	$scope.dismissModal = dismissModal;
	$scope.closeModal = closeModal;
})
