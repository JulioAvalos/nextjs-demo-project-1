import { MongoClient } from "mongodb";

async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.nmhiv.mongodb.net/newsletter?retryWrites=true&w=majority`
  );
  return client;
}

async function insertDocument(client, document) {
  const db = client.db();

  await db.collection("emails").insertOne(document);
}

async function handler(req, res) {
  if (req.method === "POST") {
    const userMail = req.body.email;
    if (!userMail || !userMail.includes("@")) {
      res.status(422).json({ messsage: "invalid email address." });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({message: 'Connecting to the database failed!'});
      return;
    }

    try {
      await insertDocument(client, { email: userMail });
      client.close();
    } catch (error) {
      res.status(500).json({message: 'Inserting data failed!'});
      return;
    }
    res.status(201).json({ messsage: "Signed up!" });
  } 
}

export default handler;
