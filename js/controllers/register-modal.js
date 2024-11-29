myApp.controller('RegisterModalCtrl', function ($scope, $modalInstance, RegisterService, AlertMessage) {
	$scope.form = {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		loading: false
	};

	$scope.passwordInputType = 'password';

	const onPasswordShowClick = () => {
		$scope.passwordInputType = $scope.passwordInputType === 'password' ? 'text' : 'password';
	};

	const isPassowrdVisible = () => {
		return $scope.passwordInputType === 'text';
	}

	const dismissModal = () => {
		$modalInstance.dismiss();
	}

	const closeModal = () => {
		$modalInstance.close();
	}

	const submit = () => {

		RegisterService.register({
			username: $scope.form.username,
			email: $scope.form.email,
			password: $scope.form.password,
			confirmPassword: $scope.form.confirmPassword
		}).then(() => {
			AlertMessage.success('Usuário cadastrado com sucesso');
			closeModal();
		}).catch(() => {
			AlertMessage.error('Erro ao cadastrar usuário');
		}).finally(() => {
			$scope.form.loading = false;
		});

	}

	$scope.submit = submit;
	$scope.dismissModal = dismissModal;
	$scope.closeModal = closeModal;
	$scope.onPasswordShowClick = onPasswordShowClick;
	$scope.isPasswordVisible = isPassowrdVisible;
})
