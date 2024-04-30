const inquirer = require("inquirer");
const pool = require("./db/conection.js");



const prompt = async () => {
  let exit = false;

  while (!exit) {
    const answers = await inquirer.prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add an employee",
        "Add a department",
        "Add a role",
        "Update an employee role",
        "Exit",
      ],
    });

    switch (answers.choice) {
      case "View all employees":
        await showAllEmployees();
        break;
      case "View all departments":
        await showAllDepartments();
        break;
      case "View all roles":
        await showAllRoles();
        break;
      case "Add an employee":
        await addEmployee();
        break;
      case "Add a department":
        await addDepartment();
        break;
      case "Add a role":
        await addRole();
        break;
      case "Update an employee role":
        await updateEmployee();
        break;
      case "Exit":
        console.log("Exiting application...");
        exit = true;
        break;
      default:
        console.log("Invalid choice");
        break;
    }

    if (!exit) {
      console.log("\n");
      await inquirer.prompt({
        type: "list",
        name: "continue",
        message: "Press Enter to continue...",
        choices: ["Continue"],
      });
    }
  }
};

const getAllEmployees = async () => {
  const queryText =
    "SELECT (first_name || ' ' || last_name) as name, id as value FROM employees";
  const { rows } = await pool.query(queryText, []);
  return rows;
};

const getAllDepartments = async () => {
  const queryText = "SELECT name as name, id as value FROM departments";
  const { rows } = await pool.query(queryText, []);
  return rows;
};

const getAllRoles = async () => {
  const queryText = "SELECT title as name, id as value FROM roles";
  const { rows } = await pool.query(queryText, []);
  return rows;
};

const showAllDepartments = async () => {
  const queryText = "SELECT * FROM departments";
  const { rows } = await pool.query(queryText, []);
  console.table(rows);
};

const showAllRoles = async () => {
  const queryText = "SELECT * FROM roles";
  const { rows } = await pool.query(queryText, []);
  console.table(rows);
};

const showAllEmployees = async () => {
  const queryText = "SELECT * FROM employees";
  const { rows } = await pool.query(queryText, []);
  console.table(rows);
};

const addEmployee = async () => {
  const roles = await getAllRoles();
  const employees = await getAllEmployees();
  const employee = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the first name of the employee:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the last name of the employee:",
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the role for the employee:",
      choices: roles,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Enter the manager id of the employee (optional):",
      choices: employees,
    },
  ]);
  await addEmployeeToDatabase(employee);
};

const addDepartment = async () => {
  const department = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Enter the name of the department:",
  });
  await addDepartmentToDatabase(department);
};

const addRole = async () => {
  const departments = await getAllDepartments();
  const role = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of the role:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary of the role:",
    },
    {
      type: "list",
      name: "department_id",
      message: "Select the department for the role:",
      choices: departments,
    },
  ]);
  await addRoleToDatabase(role);
};

const updateEmployee = async () => {
  const employees = await getAllEmployees();
  const roles = await getAllRoles();
  const employeeUpdate = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Select the employee to update:",
      choices: employees,
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the new role for the employee:",
      choices: roles,
    },
  ]);
  await updateEmployeeInDatabase(employeeUpdate);
};

const addEmployeeToDatabase = async (employee) => {
  const queryText =
    "INSERT INTO employees (first_name, last_name, role_id,manager_id) VALUES ($1, $2, $3,$4) RETURNING *";
  const params = [
    employee.first_name,
    employee.last_name,
    employee.role_id,
    employee.manager_id,
  ];
  const newRecord = await pool.query(queryText, params);
  console.log("Employee added successfully!");
};

const addDepartmentToDatabase = async (department) => {
  const queryText = "INSERT INTO departments (name) VALUES ($1) RETURNING *";
  const params = [department.name];
  const newRecord = await pool.query(queryText, params);
  console.log("Department added successfully!");
};

const addRoleToDatabase = async (role) => {
  const queryText =
    "INSERT INTO roles (title,salary,department_id) VALUES ($1,$2,$3) RETURNING *";
  const params = [role.title, role.salary, role.department_id];
  const newRecord = await pool.query(queryText, params);
  console.log("Role added successfully!");
};

const updateEmployeeInDatabase = async (employeeUpdate) => {
  const queryText =
    "UPDATE employees SET role_id = $2 WHERE id = $1 RETURNING *";
  const params = [employeeUpdate.employee_id, employeeUpdate.role_id];
  const newRecord = await pool.query(queryText, params);
  console.log("Employee role updated successfully!");
};

prompt();
