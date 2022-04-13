import { MongoClient, ServerApiVersion } from "mongodb";

// const uri =
//   "mongodb+srv://dolev0526:NeR0X0526@cluster0.c2ucf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

const client = new MongoClient("mongodb://127.0.0.1:27017");

export async function getDB() {
  const connection = await client.connect();
  const db = connection.db("NC-Final-project");
  return db;
}
