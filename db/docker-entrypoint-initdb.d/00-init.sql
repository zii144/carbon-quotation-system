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
    IF NOT EXISTS EmployeeBasicInfo (
        employee_id VARCHAR(50) NOT NULL PRIMARY KEY, -- 員工編號 (Primary key)
        employee_name VARCHAR(100) NOT NULL, -- 員工姓名
        gender VARCHAR(10) NOT NULL, -- 性別 (Gender as VARCHAR for flexibility)
        birthDate DATE, -- 出生年月日
        region VARCHAR(100), -- 所屬區域
        role VARCHAR(100), -- 職稱
        date_of_hire DATE, -- 入職日期
        date_of_resignation DATE, -- 離職日期
        handover_staff VARCHAR(100), -- 交接人員
        note BOOLEAN DEFAULT FALSE, -- 註銷
        created_at DATE, -- 建立日期
        updated_at DATE -- 更新日期
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create a new CompanyInfo table with updated schema
CREATE TABLE
    IF NOT EXISTS CompanyInfo (
        id INT AUTO_INCREMENT PRIMARY KEY, -- Primary key for the table
        unified_number VARCHAR(20) NOT NULL, -- 統一編號
        business_assignee VARCHAR(50), -- 業務擔當
        company_name VARCHAR(100), -- 公司名稱
        contact_person VARCHAR(100), -- 聯絡人員
        mobile_phone VARCHAR(20), -- 行動電話
        department VARCHAR(50), -- 廠區部門
        contact_phone VARCHAR(20), -- 聯絡電話
        fax_number VARCHAR(20), -- 傳真號碼
        contact_email VARCHAR(100), -- 聯絡MAIL
        company_address VARCHAR(255), -- 公司地址
        delivery_address VARCHAR(255), -- 交貨地址
        note TEXT, -- 註記
        registration BOOLEAN DEFAULT FALSE, -- 註記 checkbox
        created_at DATE -- 建立日期
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create a new MaterialInfo table with updated schema
CREATE TABLE
    IF NOT EXISTS MaterialInfo (
        id INT AUTO_INCREMENT PRIMARY KEY, -- Primary key for the table
        material_name VARCHAR(100) NOT NULL, -- 材質名稱
        material_cost DECIMAL(10, 2) NOT NULL, -- 素材成本
        unit_name VARCHAR(50) NOT NULL, -- 單位名稱
        created_at DATE, -- Creation timestamp
        updated_at DATE -- Last updated timestamp
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create a new OutsourcingVendor table with updated schema
CREATE TABLE
    IF NOT EXISTS OutsourcingVendor (
        id INT AUTO_INCREMENT PRIMARY KEY, -- Primary key for the table
        company_name VARCHAR(100) NOT NULL, -- 公司名稱
        unified_number VARCHAR(20) NOT NULL, -- 統一編號
        contact_window VARCHAR(100), -- 聯絡窗口
        contact_phone VARCHAR(20), -- 聯絡電話
        fax_number VARCHAR(20), -- 傳真號碼
        contact_email VARCHAR(100), -- 聯絡MAIL
        mobile_phone VARCHAR(20), -- 行動電話
        company_address VARCHAR(255), -- 公司地址
        transaction_details TEXT, -- 交易內容
        note TEXT, -- 註記
        registration BOOLEAN DEFAULT FALSE, -- 註記 checkbox
        created_at DATE -- 建立日期
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create a new CentralDrawingNumber table with updated schema
CREATE TABLE
    IF NOT EXISTS CentralDrawingNumber (
        id INT AUTO_INCREMENT PRIMARY KEY, -- Primary key for the table
        business_assignee VARCHAR(50) NOT NULL, -- 業務擔當
        drawing_type VARCHAR(50) NOT NULL, -- 圖號類別
        drawing_number VARCHAR(100) NOT NULL, -- 圖號號碼
        customer_name VARCHAR(100), -- 客戶名稱
        material VARCHAR(100), -- 材質
        dimensions VARCHAR(100), -- 尺寸
        customer_number VARCHAR(100), -- 客戶圖號
        customer_part_number VARCHAR(100), -- 客戶料號
        drawing_assignee VARCHAR(100), -- 製圖擔當
        created_at DATE -- 建立日期
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS CostEntry (
        inquiry_number INT NOT NULL UNIQUE, -- 詢價單號 (Unique integer, not auto-increment)
        production_type VARCHAR(50) NOT NULL, -- 生產類型
        material VARCHAR(100), -- 材質
        product_dimensions VARCHAR(100), -- 製品尺寸
        exchange_rate DECIMAL(10, 2), -- 匯率
        tariff DECIMAL(10, 2), -- 關稅 ($)
        shipping_cost DECIMAL(10, 2), -- 運費 ($)
        material_cost DECIMAL(10, 2), -- 素材成本 ($)
        blade_cost DECIMAL(10, 2), -- 刀具成本 ($)
        blade_cost_notes TEXT, -- 刀具成本內容備註
        mold_cost DECIMAL(10, 2), -- 模具成本 ($)
        mold_cost_notes TEXT, -- 模具成本內容備註
        other_cost DECIMAL(10, 2), -- 其他成本 ($)
        other_cost_notes TEXT, -- 其他成本內容備註
        total_cost DECIMAL(10, 2), -- 合計 ($)
        total_processing_time DECIMAL(10, 2), -- 總加工時間
        processing_cost DECIMAL(10, 2), -- 加工成本 ($)
        outsourcing_company VARCHAR(100), -- 委外公司名稱
        outsourcing_cost DECIMAL(10, 2), -- 委外成本 ($)
        processing_and_outsourcing_total DECIMAL(10, 2), -- 加工時間及委外成本合計
        total_final_cost DECIMAL(10, 2), -- 總成本合計 ($)
        content_notes TEXT, -- 內容備註
        -- Signature fields
        factory_signature BOOLEAN DEFAULT FALSE, -- 廠務簽核
        factory_deputy_signature BOOLEAN DEFAULT FALSE, -- 廠務代簽
        manager_signature BOOLEAN DEFAULT FALSE, -- 廠長代簽
        manager_approval_signature BOOLEAN DEFAULT FALSE, -- 廠長簽核
        -- -- 加工內容 as BOOLEAN columns
        lathe BOOLEAN DEFAULT FALSE, -- 車床
        milling_machine BOOLEAN DEFAULT FALSE, -- 銑床
        cnc BOOLEAN DEFAULT FALSE, -- CNC
        `manual` BOOLEAN DEFAULT FALSE, -- 手工
        saw BOOLEAN DEFAULT FALSE, -- 鋸床
        backup_field1 BOOLEAN DEFAULT FALSE, -- backupfield (adjust later)
        backup_field2 BOOLEAN DEFAULT FALSE, -- backupfield2 (adjust later)
        backup_field3 BOOLEAN DEFAULT FALSE, -- backupfield3 (adjust later)
        created_at DATE, -- Creation timestamp
        updated_at DATE -- Last updated timestamp
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create a new OrderApproval table with updated schema
CREATE TABLE
    IF NOT EXISTS OrderApproval (
        id INT AUTO_INCREMENT PRIMARY KEY, -- Primary key for the table
        business_category VARCHAR(50) NOT NULL, -- 填表業務
        inquiry_number INT NOT NULL, -- 詢價單號
        customer_name VARCHAR(100) NOT NULL, -- 客戶名稱
        processing_department VARCHAR(50), -- 加工部門別
        central_drawing_number VARCHAR(100), -- 中央圖號
        product_number VARCHAR(100), -- 號碼
        product_name VARCHAR(100), -- 品名
        material VARCHAR(100), -- 材質
        customer_part_number VARCHAR(100), -- 客戶料號
        order_number VARCHAR(100), -- 訂單號碼
        invoice_notes TEXT, -- 傳票備註
        size VARCHAR(50), -- 尺寸
        unit VARCHAR(50), -- 單位
        quantity INT, -- 數量
        unit_price DECIMAL(10, 2), -- 單價
        total_price DECIMAL(10, 2), -- 總價
        total_cost DECIMAL(10, 2), -- 合計總成本
        profit_margin DECIMAL(5, 2), -- 利潤率
        processing_content TEXT, -- 加工內容
        note BOOLEAN DEFAULT FALSE, -- 註銷
        business_manager_approval BOOLEAN DEFAULT FALSE, -- 業務經理簽核
        created_at DATE, -- 建立日期
        updated_at DATE -- 更新日期
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;