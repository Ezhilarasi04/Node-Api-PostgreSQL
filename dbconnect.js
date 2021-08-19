class DbConnector{
    getPool(){
        const Pool = require('pg').Pool
        const pool = new Pool({
        user: 'me',
        host: 'localhost',
        database: 'api',
        password: 'password',
        port: 5432,
        })
        return pool;
    }
    tester(){
        console.log("Hello");
        return 0;
    }
}
module.exports = DbConnector;