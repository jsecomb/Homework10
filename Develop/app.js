const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs"); const OUTPUT_DIR = path.resolve(__dirname, "output")
//const outputPath = path.join(OUTPUT_DIR, "team.html"); 
const render = require("./lib/htmlRenderer");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

async function mainPrompt() {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter employee's name"
        },
        {
            type: "input",
            name: "id",
            message: "Enter employee's ID"
        },
        {
            type: "input",
            name: "email",
            message: "Enter employee's email address"
        },
        {
            type: "choice",
            name: "job",
            message: "Enter employee's role type",
            choices: ["Engineer", "Intern", "Manager"]
        }
    ])

    if (answers.job.toLowerCase() === "engineer") {
        const engineerAnswers = await engineerPrompt();
        employees.push(new Engineer(answers.name, answers.id, answers.email, engineerAnswers.github))
        additionalEmployees()
    }
    if (answers.job.toLowerCase() === "intern") {
        const internAnswers = await internPrompt();
        employees.push(new Intern(answers.name, answers.id, answers.email, internAnswers.school))
        additionalEmployees()
    } 
    else if (answers.job.toLowerCase() === "manager") {
        const managerAnswers = await managerPrompt();
        employees.push(new Manager(answers.name, answers.id, answers.email, managerAnswers.officeNum))
        additionalEmployees()
    }
}

async function engineerPrompt() {
    return await inquirer.prompt([
    {
        type: "input",
        name: "github",
        message: "Enter employee's github profile name"
    }])
}

async function internPrompt() {
    return await inquirer.prompt([
    {
        type: "input",
        name: "school",
        message: "Enter employee's school"
    }])
} 

async function managerPrompt() {
    return await inquirer.prompt([
    {
        type: "input",
        name: "officeNum",
        message: "Enter employee's office number"
    }])
}

async function additionalEmployees() {
    const additionalEmployees = await inquirer.prompt([
        {
            type: "confirm",
            name: "more",
            message: "Would you like to enter additional employees?"
        }
    ])
    if (additionalEmployees.more) {
        mainPrompt()
    }
    else {
        renderHTML()
    }
}

function renderHTML() {
    fs.writeFile("./team.html", render(employees), (err) => {
        if (err) throw err;
        console.log("team profile generated");
    });
}

mainPrompt();


