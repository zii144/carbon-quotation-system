USE carbon_quotation;

INSERT INTO
    CentralDrawingNumber (
        business_assignee,
        drawing_type,
        drawing_number,
        customer_name,
        material,
        dimensions,
        customer_number,
        customer_part_number,
        drawing_assignee,
        created_at
    )
VALUES
    (
        '王大明',
        '結構設計圖',
        'CDN-001',
        '北方貿易有限公司',
        '不鏽鋼 (SUS304)',
        '500x300x200mm',
        'CN001',
        'PN001',
        '李小華',
        '2025-01-09'
    ),
    (
        '張小華',
        '機械設計圖',
        'CDN-002',
        '中華工業股份有限公司',
        '鋁合金 (6061-T6)',
        '100x50x30mm',
        'CN002',
        'PN002',
        '陳建中',
        '2025-01-09'
    ),
    (
        '陳建中',
        '電路設計圖',
        'CDN-003',
        '南方物流有限公司',
        '塑膠 (ABS)',
        '200x150x100mm',
        'CN003',
        'PN003',
        '周金龍',
        '2025-01-09'
    ),
    (
        '林美麗',
        '工藝設計圖',
        'CDN-004',
        '全區電子有限公司',
        '黃銅 (C3604)',
        '300x200x50mm',
        'CN004',
        'PN004',
        '張小華',
        '2025-01-09'
    ),
    (
        '李中原',
        '測試設計圖',
        'CDN-005',
        '北極星能源科技股份有限公司',
        '碳鋼 (A36)',
        '400x250x150mm',
        'CN005',
        'PN005',
        '王大明',
        '2025-01-09'
    );