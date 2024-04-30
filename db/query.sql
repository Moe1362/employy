SELECT roles.title, roles.salary, departments.name AS department
FROM roles
JOIN departments ON roles.department_id = departments.id;

SELECT employees.first_name, employees.last_name, roles.title AS role, roles.salary, (managers.first_name || ' ' || managers.last_name) AS manager
FROM employees
JOIN roles ON employees.role_id = roles.id
LEFT JOIN employees AS managers ON employees.manager_id = managers.id;


