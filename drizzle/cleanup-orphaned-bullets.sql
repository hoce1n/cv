-- Run this one-off cleanup before generating/applying the migration.
-- It removes bullet rows whose parent record was deleted during earlier testing.

DELETE FROM experience_bullets AS eb
WHERE NOT EXISTS (
  SELECT 1
  FROM experience AS e
  WHERE e.id = eb.experience_id
);

DELETE FROM project_bullets AS pb
WHERE NOT EXISTS (
  SELECT 1
  FROM projects AS p
  WHERE p.id = pb.project_id
);
