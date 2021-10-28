const Intern = require('../lib/Intern');

test('Can set school via constructor', () => {
	const testValue = 'Rutgers';
	const e = new Intern('Test', 1, 'test@test.com', testValue);
	expect(e.school).toBe(testValue);
});

test('getRole() should return "Intern"', () => {
	const testValue = 'Intern';
	const e = new Intern('Test', 1, 'test@test.com', 'Rutgers');
	expect(e.getRole()).toBe(testValue);
});

test('Can get school via getSchool()', () => {
	const testValue = 'Rutgers';
	const e = new Intern('Test', 1, 'test@test.com', testValue);
	expect(e.getSchool()).toBe(testValue);
});
