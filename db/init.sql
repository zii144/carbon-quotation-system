-- Force UTF-8 encoding for session
SET
  NAMES utf8mb4;

SET
  character_set_client = utf8mb4;

SET
  character_set_connection = utf8mb4;

SET
  character_set_results = utf8mb4;

-- Create a new employees table with updated schema
CREATE TABLE
  employees (
    id INT PRIMARY KEY,
    name VARCHAR(100) CHARACTER
    SET
      utf8mb4 COLLATE utf8mb4_unicode_ci,
      gender VARCHAR(10) CHARACTER
    SET
      utf8mb4 COLLATE utf8mb4_unicode_ci,
      birthDate DATE,
      region VARCHAR(50) CHARACTER
    SET
      utf8mb4 COLLATE utf8mb4_unicode_ci,
      role VARCHAR(100) CHARACTER
    SET
      utf8mb4 COLLATE utf8mb4_unicode_ci,
      startDate DATE,
      endDate DATE DEFAULT NULL,
      createdData DATE DEFAULT NULL,
      transferPerson VARCHAR(100) CHARACTER
    SET
      utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
  ) CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert sample data into the new table
INSERT INTO
  employees (
    id,
    name,
    gender,
    birthDate,
    region,
    role,
    startDate,
    endDate,
    createdData,
    transferPerson
  )
VALUES
  (
    1,
    '林訓鑫',
    '男',
    '1979-10-14',
    '全區',
    '總經理',
    '2006-04-17',
    NULL,
    '2024-01-01',
    '張三'
  ),
  (
    2,
    '楊燿煇',
    '男',
    '1975-03-12',
    '全區',
    '廠長',
    '2000-06-15',
    NULL,
    '2023-12-25',
    '李四'
  );