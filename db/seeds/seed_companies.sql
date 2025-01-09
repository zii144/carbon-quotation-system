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