INSERT INTO departments (name) VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

 INSERT INTO roles (title, salary, department_id) VALUES
    ('Software Engineer', 100000, 1),
    ('Accountant', 80000, 2),
    ('Lawyer', 120000, 3),
    ('Sales Lead', 80000, 4);

 INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('Mohammad', 'Abbasi', 1, 2),
    ('Kambiz', 'Abbasi', 2, NULL),
    ('Zahra', 'Ronaghi', 3, 2),
    ('Mary', 'Abbasi', 4, 3);  

     

       