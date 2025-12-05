
const mysql = require('mysql2/promise');
const humps = require('humps');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'my_database'
})

export async function query(sql: string) {    
    const [rows] = await connection.query(sql)
    return humps.camelizeKeys(rows)
}

export async function execute(sql: string, params: any) {    
    const [rows] = await  connection.execute(sql, params)
    return humps.camelizeKeys(rows)
}

