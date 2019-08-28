const db_uri = process.env.DB_URI;


export class BancoConfig {
  constructor(
    readonly uri: string = db_uri,
  ) {
    console.log(this.uri);
  }
}
