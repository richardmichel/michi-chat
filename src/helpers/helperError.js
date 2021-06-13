import  { MESSAGES } from '@config/settings'

export const getErrorMessage = (error) => {

	let msg = MESSAGES['error-500'];
	
	 if (error?.response?.data?.errors &&
		typeof error.response.data.errors === 'object' && 
		(error.response.status === 422 || error.response.status === 400)) {
		const { errors } = error.response.data;
		try {
			let label = '';
			let keyAlias = 0;
			let keyAliasTotal = 0;
			/*	eslint no-plusplus: "off"	*/
			Object.keys(errors).forEach((key) => {
				errors[key].forEach(() => {
					keyAliasTotal++;
				});
			});
			/*	eslint no-nested-ternary: "off"	*/
			Object.keys(errors).forEach((key) => {
				errors[key].forEach((item) => {
					keyAlias++;
					label += `${ keyAlias > 1 && keyAlias <= keyAliasTotal ? ', ' : (keyAlias === 1 ? '' : '') }${item}${ keyAlias === keyAliasTotal ? '' : '' }`;
				});
			});

			msg = label;


		} catch (catchErrors) {
			console.log("error try:", catchErrors);
		}
	} else if (error.response &&
		error.response.data &&
		error.response.data.message &&
		error.response.status !== 500) {

		msg = error.response.data.message;
	}
	 
	if(typeof error === 'string'){
		msg = error;
	}
	
	return msg;
};