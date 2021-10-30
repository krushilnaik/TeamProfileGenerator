class Employee {
	/**
	 * Object representation of an Employee at a company
	 * @param {string} name - Employee name
	 * @param {number} id - Employee ID
	 * @param {string} email - Employee email
	 */
	constructor(name, id, email) {
		/**
		 * Regex pulled from:
		 * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
		 */
		this.emailValidator =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		this.name = name;
		this.id = id;

		if (!email || this.emailValidator.test(email)) {
			this.email = email;
		} else {
			throw new Error(`invalid email provided <${email}>`);
		}
	}

	getName() {
		return this.name;
	}

	getId() {
		return this.id;
	}

	getEmail() {
		return this.email;
	}

	getRole() {
		return 'Employee';
	}
}

module.exports = Employee;
