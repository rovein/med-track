CREATE TABLE IF NOT EXISTS role
(
    role_id BIGINT,
    name    VARCHAR(30) NOT NULL,
    CONSTRAINT PK_role PRIMARY KEY (role_id),
    CONSTRAINT UQ_role_name UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS admin
(
    admin_id   BIGINT,
    email      VARCHAR(70) NOT NULL,
    password   VARCHAR(70) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name  VARCHAR(30) NOT NULL,
    role_id    BIGINT      NOT NULL,
    is_locked  BOOLEAN     NOT NULL DEFAULT FALSE,
    CONSTRAINT PK_admin PRIMARY KEY (admin_id),
    CONSTRAINT UQ_admin_email UNIQUE (email),
    CONSTRAINT FK_admin_role FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS medicines_provider
(
    medicines_provider_id BIGINT,
    email                 VARCHAR(40)    NOT NULL,
    phone_number          VARCHAR(40)    NOT NULL,
    password              VARCHAR(70)    NOT NULL,
    name                  VARCHAR(40)    NOT NULL,
    creation_date         TIMESTAMPTZ(6) NOT NULL,
    country               VARCHAR(255)   NOT NULL,
    is_locked             BOOLEAN        NOT NULL DEFAULT FALSE,
    role_id               BIGINT         NOT NULL,
    CONSTRAINT PK_medicines_provider PRIMARY KEY (medicines_provider_id),
    CONSTRAINT UQ_medicines_provider_email UNIQUE (email),
    CONSTRAINT UQ_medicines_provider_phone_number UNIQUE (phone_number),
    CONSTRAINT FK_medicines_provider_role FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS medicine
(
    medicine_id           BIGINT,
    name                  VARCHAR(255)  NOT NULL,
    price                 DOUBLE PRECISION         NOT NULL,
    storage_form          VARCHAR(255)  NOT NULL,
    shelf_life            DATE          NOT NULL,
    min_temperature       DOUBLE PRECISION NOT NULL,
    max_temperature       DOUBLE PRECISION NOT NULL,
    max_humidity          DOUBLE PRECISION NOT NULL,
    medicines_provider_id BIGINT        NOT NULL,
    CONSTRAINT PK_medicine PRIMARY KEY (medicine_id),
    CONSTRAINT FK_medicine_medicines_provider
        FOREIGN KEY (medicines_provider_id) REFERENCES medicines_provider (medicines_provider_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS warehouse
(
    warehouse_id          BIGINT,
    city                  VARCHAR(255) NOT NULL,
    street                VARCHAR(255) NOT NULL,
    house                 VARCHAR(255) NOT NULL,
    medicines_provider_id BIGINT       NOT NULL,
    CONSTRAINT PK_warehouse PRIMARY KEY (warehouse_id),
    CONSTRAINT FK_warehouse_medicines_provider
        FOREIGN KEY (medicines_provider_id) REFERENCES medicines_provider (medicines_provider_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS placement
(
    placement_id BIGINT,
    type         VARCHAR(255),
    warehouse_id BIGINT NOT NULL,
    CONSTRAINT PK_placement PRIMARY KEY (placement_id),
    CONSTRAINT FK_placement_warehouse
        FOREIGN KEY (warehouse_id) REFERENCES warehouse (warehouse_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS smart_device
(
    placement_id BIGINT,
    temperature  DOUBLE PRECISION NOT NULL,
    humidity     DOUBLE PRECISION NOT NULL,
    CONSTRAINT PK_smart_device PRIMARY KEY (placement_id),
    CONSTRAINT FK_smart_device_placement
        FOREIGN KEY (placement_id) REFERENCES placement (placement_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS medicine_storage
(
    medicine_storage_id BIGINT,
    start_date          TIMESTAMPTZ NOT NULL,
    amount              INT         NOT NULL,
    placement_id        BIGINT      NOT NULL,
    medicine_id         BIGINT      NOT NULL,
    CONSTRAINT PK_medicine_storage PRIMARY KEY (medicine_storage_id),
    CONSTRAINT FK_medicine_storage_medicine
        FOREIGN KEY (medicine_id) REFERENCES medicine (medicine_id) ON DELETE CASCADE,
    CONSTRAINT FK_medicine_storage_placement
        FOREIGN KEY (placement_id) REFERENCES placement (placement_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shipment
(
    shipment_id BIGINT,
    address     VARCHAR(255) NOT NULL,
    date        TIMESTAMPTZ  NOT NULL,
    status      VARCHAR(255) NOT NULL,
    CONSTRAINT PK_shipment PRIMARY KEY (shipment_id)
);

CREATE TABLE IF NOT EXISTS shipment_content
(
    shipment_content_id BIGINT,
    amount              INT    NOT NULL,
    shipment_id         BIGINT NOT NULL,
    medicine_storage_id BIGINT NOT NULL,
    CONSTRAINT PK_shipment_content PRIMARY KEY (shipment_content_id),
    CONSTRAINT FK_shipment_content_shipment
        FOREIGN KEY (shipment_id) REFERENCES shipment (shipment_id) ON DELETE CASCADE,
    CONSTRAINT FK_shipment_content_medicine_storage
        FOREIGN KEY (medicine_storage_id) REFERENCES medicine_storage (medicine_storage_id) ON DELETE CASCADE
);

INSERT INTO role (role_id, name) VALUES (1, 'ADMIN');
INSERT INTO role (role_id, name) VALUES (2, 'MEDICINES_PROVIDER');

INSERT INTO admin (admin_id, email, password, first_name, last_name, role_id, is_locked)
VALUES (1, 'admin@gmail.com', '$2a$10$ecGZcqzz2.BW884wo/6REuUyL/68oo4dJA66FliY.EYjPg5llaXZy', 'Rick', 'Sanchez', 1, false);
