myApp.service("AlertMessage", function ($http) {
	const error = title => {
		return Swal.fire({
			icon: 'error',
			title: title,
		});
	}

	const success = title => {
		return Swal.fire({
			icon: 'success',
			title
		});
	}

	const warning = title => {
		return Swal.fire({
			icon: 'warning',
			title,
		});
	}

	return {
		error, success, warning
	}
});