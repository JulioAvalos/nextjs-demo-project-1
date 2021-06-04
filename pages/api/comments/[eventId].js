import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.nmhiv.mongodb.net/events?retryWrites=true&w=majority`
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ messsage: "Invalid input." });
      return;
    }

    const newComment = {
      name,
      email,
      text,
      eventId,
    };

    const db = client.db();

    const result = await db.collection('comments').insertOne(newComment);

    console.log(result);

    newComment.id = result.insertedId;

    res.status(201).json({
      messsage: "Success!",
      comment: newComment,
    });
  }

  if (req.method === "GET") {

    const db = client.db();

    const documents = await db
      .collection('comments')
      .find()
      .sort({_id: -1})
      .toArray();
  
    res.status(200).json({
      messsage: "OK",
      comments: documents,
    });
  }

  client.close();
}

export default handler;
