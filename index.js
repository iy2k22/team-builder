const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const main = async () => {
    const tmData = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter the team manager's name"
        },
        {
            name: "id",
            type: "input",
            message: "Enter the team manager's employee ID"
        },
        {
            name: "email",
            type: "input",
            message: "Enter the team manager's e-mail address"
        },
        {
            name: "office_num",
            type: "input",
            message: "Enter the team manager's office number"
        },
    ]);
    const team = [ new Manager(tmData.name, tmData.id, tmData.email, tmData.office_num) ];
    let choice;
    do {
        choice = (await inquirer.prompt([{
            name: "choice",
            type: "list",
            choices: ["Add an engineer", "Add an intern", "Finish building the team"]
        }])).choice;
        switch (choice) {
            case "Add an engineer":
                const engineerData = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter the engineer's name"
                    },
                    {
                        name: "id",
                        type: "input",
                        message: "Enter the engineer's id"
                    },
                    {
                        name: "email",
                        type: "input",
                        message: "Enter the engineer's e-mail"
                    },
                    {
                        name: "github",
                        type: "input",
                        message: "Enter the engineer's GitHub username"
                    }
                ]);
                team.push(new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github));
                break;
            case "Add an intern":
                const internData = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter the intern's name"
                    },
                    {
                        name: "id",
                        type: "input",
                        message: "Enter the intern's id"
                    },
                    {
                        name: "email",
                        type: "input",
                        message: "Enter the intern's e-mail"
                    },
                    {
                        name: "school",
                        type: "input",
                        message: "Enter the intern's school"
                    }
                ]);
                team.push(new Intern(internData.name, internData.id, internData.email, internData.school));
                break;
        }
    } while (choice !== "Finish building the team")
    fs.writeFile(outputPath, render(team), (err) => err ? console.error(err) : console.log("Success!"));
}

main();