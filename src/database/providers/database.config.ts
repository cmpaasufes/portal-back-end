const db_host = process.env.DB_HOST || '172.29.0.2';
const db_port: number = parseInt(process.env.DB_PORT) || 27017;
const db_username = process.env.DB_USER || 'root';
const db_password = process.env.DB_PASSWORD || 'example';
const db_schema = process.env.DB_SCHEMA || '';
const db_options = process.env.DB_OPTIONS || '';
    
export class BancoConfig {
    constructor(
        readonly type: 'mongodb' = 'mongodb',
        readonly host: string = db_host,
        readonly port: number = db_port,
        readonly user: string = db_username,
        readonly password: string = db_password,
        readonly schema: string = db_schema,
        readonly options: string = db_options,
        readonly uri: string  = `mongodb://${db_username}:${db_password}@${db_host}:${db_port}/${db_schema}${db_options}`
    ) { }
}
