CREATE TABLE balances (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    initial_value DECIMAL NOT NULL,
    remaining_value DECIMAL,

    PRIMARY KEY(id)
);