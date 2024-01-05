import mysql from 'mysql2'

export const connection = mysql.createPool({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USERNAME}`,
    database: `${process.env.DB_NAME}`,
    password: `${process.env.DB_PASSWORD}`,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})

