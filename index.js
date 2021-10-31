const inquirer = require('inquirer');
const fs = require('fs');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const templateGenerator = require('./src/templateGenerator');

/** @type {(Manager | Engineer | Intern)[]} */
let teamMembers = [];

/**
 * @type {inquirer.QuestionCollection}
 */
const employeeQuestion = [
	{
		name: 'employeeType',
		type: 'list',
		message: 'Which type of team member would you like to add?',
		choices: [
			'Engineer',
			'Intern',
			{ name: "I don't want to add any more team members", value: '' }
		]
	}
];

/**
 * Questions to ask if the user requests to add a Manager
 * @type {inquirer.QuestionCollection}
 */
const managerQuestions = [
	{
		name: 'name',
		type: 'input',
		message: "What is the team manager's name?"
	},
	{
		name: 'id',
		type: 'input',
		message: "What is the team manager's id?"
	},
	{
		name: 'email',
		type: 'input',
		message: "What is the team manager's email?"
	},
	{
		name: 'officeNumber',
		type: 'input',
		message: "What is the team manager's office number?"
	}
];

/**
 * Questions to ask if the user requests to add an Engineer
 * @type {inquirer.QuestionCollection}
 */
const engineerQuestions = [
	{
		name: 'name',
		type: 'input',
		message: "What is your engineer's name?"
	},
	{
		name: 'id',
		type: 'input',
		message: "What is your engineer's id?"
	},
	{
		name: 'email',
		type: 'input',
		message: "What is your engineer's email?"
	},
	{
		name: 'github',
		type: 'input',
		message: "What is your engineer's github?"
	}
];

/**
 * Questions to ask if the user requests to add an Intern
 * @type {inquirer.QuestionCollection}
 */
const internQuestions = [
	{
		name: 'name',
		type: 'input',
		message: "What is your intern's name?"
	},
	{
		name: 'id',
		type: 'input',
		message: "What is your intern's ID?"
	},
	{
		name: 'email',
		type: 'input',
		message: "What is your intern's email?"
	},
	{
		name: 'school',
		type: 'input',
		message: "What is your intern's school?"
	}
];

/**
 * Call this to run through all the prompts
 */
async function init() {
	console.log('Please build your team');

	let employeeType = 'Manager';

	while (employeeType !== '') {
		switch (employeeType) {
			case 'Manager':
				await inquirer.prompt(managerQuestions).then((response) => {
					let { name, id, email, officeNumber } = response;
					teamMembers.push(new Manager(name, id, email, officeNumber));
				});
				break;
			case 'Engineer':
				await inquirer.prompt(engineerQuestions).then((response) => {
					let { name, id, email, github } = response;
					teamMembers.push(new Engineer(name, id, email, github));
				});
				break;
			case 'Intern':
				await inquirer.prompt(internQuestions).then((response) => {
					let { name, id, email, school } = response;
					teamMembers.push(new Intern(name, id, email, school));
				});
				break;
			default:
				employeeType = '';
		}

		await inquirer.prompt(employeeQuestion).then((response) => {
			employeeType = response.employeeType;
		});
	}

	templateGenerator(teamMembers);
}

init();
