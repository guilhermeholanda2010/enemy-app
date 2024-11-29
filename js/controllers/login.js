myApp.controller('LoginModalCtrl', function ($scope, $modalInstance, LoginService, AlertMessage) {
	$scope.form = {
		email: '',
		password: '',
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

		$scope.form.loading = true;

		LoginService.login({
			email: $scope.form.email,
			password: $scope.form.password
		}).then(response => {
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', JSON.stringify(response.data.user));
			closeModal();
			window.location.reload();
		}).catch(() => {
			AlertMessage.error('Usuário ou senha inválidos');
		}).finally(() => {
			$scope.form.loading = true;
		});
	};

	$scope.submit = submit;
	$scope.dismissModal = dismissModal;
	$scope.closeModal = closeModal;
	$scope.onPasswordShowClick = onPasswordShowClick;
	$scope.isPasswordVisible = isPassowrdVisible;
})
