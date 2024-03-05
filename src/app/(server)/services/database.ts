import { MongoClient, Db } from "mongodb";

var client: MongoClient | null = null;

type ReqDb = {
  dbClient?: MongoClient | null;
  db?: Db;
};

async function databaseConnect(): Promise<ReqDb> {
  if (!client && process.env.MONGODB_LOCAL_URI) {
    client = new MongoClient(process.env.MONGODB_LOCAL_URI);
    await client.connect();
  }
  return { dbClient: client, db: client?.db(process.env.DB_NAME) };
}

export default databaseConnect;
