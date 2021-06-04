import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userMail = req.body.email;
    if (!userMail || !userMail.includes("@")) {
      res.status(422).json({ messsage: "invalid email address." });
      return;
    }
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.nmhiv.mongodb.net/newsletter?retryWrites=true&w=majority`
    );

    const db = client.db();

    await db.collection("emails").insertOne({ email: userMail });

    client.close();

    res.status(201).json({ messsage: "Signed up!" });
  } else {
    res.status(200).json({ messsage: "OK" });
  }
}

export default handler;
