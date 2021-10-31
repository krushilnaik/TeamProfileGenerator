const fs = require('fs');
const path = require('path');
const Employee = require('../lib/Employee');

const icons = {
	Manager: '<i class="fas fa-mug-hot"></i>',
	Engineer: '<i class="fas fa-glasses"></i>',
	Intern: '<i class="fas fa-user-graduate"></i>'
};

/**
 * @param {Employee} employee
 */
function EmployeeCard(employee) {
	return /*html*/ `
		<div class="card flex flex-col bg-gray-100 rounded-md">
			<div class="flex flex-col bg-blue-500 py-2 px-3 pb-4 text-white">
				<span class="text-3xl">${employee.getName()}</span>
				<span class="text-xl flex gap-1 items-center">
					${icons[employee.getRole()]}
					<span>${employee.getRole()}</span>
				</span>
			</div>

			<div class="px-5 py-8 text-sm">
				<div class="flex flex-col bg-gray-300 gap-px p-px">
					<div class="item">ID: ${employee.getId()}</div>
					<div class="item">
						Email:
						<a href=${`mailto:${employee.getEmail()}`}>${employee.getEmail()}</a>
					</div>
					<div class="item">
						${
							employee.getRole() === 'Manager'
								? `Office number: ${employee.getOfficeNumber()}`
								: employee.getRole() === 'Intern'
								? `School: ${employee.getSchool()}`
								: `GitHub: <a href='https://github.com/${employee.getGithub()}'>${employee.getGithub()}</a>`
						}
					</div>
				</div>
			</div>
		</div>
	`;
}

/**
 * Convert array of Employee (and descendants) objects into HTML
 * @param {Employee[]} _members
 */
function templateGenerator(_members = []) {
	const document = /*html*/ `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
					integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw=="
					crossorigin="anonymous"
					referrerpolicy="no-referrer"
				/>

				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
					integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
					crossorigin="anonymous"
					referrerpolicy="no-referrer"
				/>

				<link rel="stylesheet" href="assets/css/style.css" />

				<title>My Team</title>
			</head>

			<body class="grid w-screen h-screen">
				<header
					class="bg-red-400 font-semibold grid place-content-center text-3xl text-white"
				>
					My Team
				</header>
				<main class="w-1/2 m-auto">
					<div class="flex flex-wrap gap-3 w-full h-full justify-center">
						${_members.map((member) => EmployeeCard(member)).join('\n')}
					</div>
				</main>
			</body>
		</html>
	`;

	fs.writeFileSync(path.join(__dirname, '..', 'dist', 'index.html'), document);
}

module.exports = templateGenerator;
