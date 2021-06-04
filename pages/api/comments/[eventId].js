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
    const dummyList = [
      {
        id: 1,
        comment: "Believe in the heart of the cards",
        user: "Yami Yugi",
      },
      {
        id: 2,
        comment: "YAAAY!",
        user: "Dark Magician Girl",
      },
      {
        id: 3,
        comment: "*dragon intensed roar*",
        user: "Blue Eyes White Dragon",
      },
    ];
    
    res.status(200).json({
      messsage: "OK",
      comments: dummyList,
    });
  }

  client.close();
}

export default handler;
