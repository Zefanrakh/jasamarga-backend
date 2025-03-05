SELECT 
    e.id AS employee_id,
    e.nik,
    e.name,
    e.is_active,
    ep.gender,
    CONCAT(EXTRACT(YEAR FROM AGE(ep.date_of_birth)), ' Years Old') AS age,
    ed.name AS school_name,
    ed.level,
    COALESCE(family_data.family_info, '-') AS family_data
FROM employee e
LEFT JOIN employee_profile ep ON e.id = ep.employee_id
LEFT JOIN education ed ON e.id = ed.employee_id
LEFT JOIN (
    SELECT employee_id, 
           STRING_AGG(CONCAT(relation_status, ' ', total), ', ') AS family_info
    FROM (
        SELECT employee_id, relation_status, COUNT(*) AS total
        FROM employee_family
        GROUP BY employee_id, relation_status
    ) subquery
    GROUP BY employee_id
) family_data ON e.id = family_data.employee_id;
