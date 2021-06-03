function handler(req, res) {
  const eventId = req.query.eventId;
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
      id: new Date().toISOString(),
      name,
      email,
      text,
      eventId,
    };

    res.status(200).json({
      messsage: "Success!",
      data: newComment,
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
}

export default handler;
