const db_host = process.env.DB_HOST || '172.29.0.2:27017';
const db_username = process.env.DB_USER || 'root';
const db_password = process.env.DB_PASSWORD || 'example';
const db_schema = process.env.DB_SCHEMA || '';
const db_options = process.env.DB_OPTIONS || '';
const db_drive = process.env.DB_DRIVE || 'mongodb';
    
export class BancoConfig {
    constructor(
        readonly type: 'mongodb' = 'mongodb',
        readonly host: string = db_host,
        readonly user: string = db_username,
        readonly password: string = db_password,
        readonly schema: string = db_schema,
        readonly options: string = db_options,
        readonly uri: string  = `${db_drive}://${db_username}:${db_password}@${db_host}/${db_schema}${db_options}`
    ) { }
}
