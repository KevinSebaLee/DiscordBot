import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;                                   
import dns from 'dns';

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

(async () => {
  try {
    console.log('Testing PostgreSQL connection...');
    console.log('DBHOST:', process.env.DB_HOST);
    console.log('DBUSER:', process.env.DB_USER);
    console.log('DBDATABASE:', process.env.DB_DATABASE);
    console.log('DBPORT:', process.env.DB_PORT);
    console.log('DBPASSWORD:', process.env.DB_PASSWORD ? '***HIDDEN***' : 'MISSING');

    // Test basic connection and query
    const client = await pool.connect();
    console.log('✅ PostgreSQL connection successful!');
    client.release();
  } catch (err) {
    console.error('❌ Connection failed:', {
      message: (err as Error).message,
      stack: (err as Error).stack
    });

    // Additional diagnostics
    try {
      const lookup = await dns.promises.lookup(process.env.PG_HOST || 'localhost');
      console.log('DNS Lookup:', lookup);
    } catch (dnsErr) {
      console.error('DNS Error:', dnsErr);
    }
  }
})();

export default pool;