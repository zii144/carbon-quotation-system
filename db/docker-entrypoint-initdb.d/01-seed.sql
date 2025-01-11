USE carbon_quotation;

INSERT INTO
    EmployeeBasicInfo (
        employee_id,
        employee_name,
        gender,
        birthDate,
        region,
        role,
        date_of_hire,
        date_of_resignation,
        handover_staff,
        note,
        created_at,
        updated_at
    )
VALUES
    (
        'EMP001',
        '王大明',
        '男',
        '1985-06-15',
        '北區',
        '總經理',
        '2010-03-01',
        NULL,
        '李小華',
        FALSE,
        '2025-01-09',
        '2025-01-09'
    ),
    (
        'EMP002',
        '張小華',
        '女',
        '1990-08-20',
        '中區',
        '廠長',
        '2015-07-01',
        NULL,
        '林中原',
        FALSE,
        '2025-01-09',
        '2025-01-09'
    ),
    (
        'EMP003',
        '陳建中',
        '男',
        '1982-03-10',
        '南區',
        '廠務',
        '2018-05-15',
        NULL,
        '周金龍',
        FALSE,
        '2025-01-09',
        '2025-01-09'
    ),
    (
        'EMP004',
        '林美麗',
        '女',
        '1995-12-05',
        '全區',
        '總經理',
        '2022-11-01',
        NULL,
        '陳建中',
        FALSE,
        '2025-01-09',
        '2025-01-09'
    ),
    (
        'EMP005',
        '李中原',
        '男',
        '1978-01-30',
        '北區',
        '廠長',
        '2005-02-20',
        '2023-12-31',
        '王大明',
        TRUE,
        '2025-01-09',
        '2025-01-09'
    );

INSERT INTO
    CompanyInfo (
        unified_number,
        business_assignee,
        company_name,
        contact_person,
        mobile_phone,
        department,
        contact_phone,
        fax_number,
        contact_email,
        company_address,
        delivery_address,
        note,
        registration
    )
VALUES
    (
        '12345678',
        '李世民',
        'Tech Solutions Ltd.',
        'John Doe',
        '0912345678',
        'Engineering',
        '02-12345678',
        '02-87654321',
        'contact@techsolutions.com',
        'No.1, Taipei Road, Taipei',
        'No.1, Taipei Road, Taipei',
        'Trusted partner',
        TRUE
    ),
    (
        '87654321',
        '陳列',
        'Green Energy Corp.',
        'Jane Smith',
        '0987654321',
        'R&D',
        '07-12345678',
        '07-87654321',
        'info@greenenergy.com',
        'No.99, Kaohsiung Blvd, Kaohsiung',
        'No.99, Kaohsiung Blvd, Kaohsiung',
        'Reliable service',
        FALSE
    );