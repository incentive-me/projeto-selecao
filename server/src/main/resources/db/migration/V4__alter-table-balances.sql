ALTER TABLE balances
    MODIFY COLUMN initial_value DECIMAL(10,2) NOT NULL,
    MODIFY COLUMN remaining_value DECIMAL(10,2);
