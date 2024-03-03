import { MongoClient } from "mongodb";
import { NextRequest } from "next/server";

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

type DBReq = {
  dbClient: MongoClient;
  db:
};

async function database(req: NextRequest) {
  req.dbClient = client;
  req.db = client.db("MCT");
}

export default database;
