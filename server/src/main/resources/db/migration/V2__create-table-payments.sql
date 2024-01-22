CREATE TABLE payments (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    payment_value DECIMAL NOT NULL,
    balance_id BIGINT(20) NOT NULL,

    PRIMARY KEY(id),
    FOREIGN KEY (balance_id) REFERENCES balances(id)
);