function handler(req, res) {
  if (req.method === "POST") {
    const userMail = req.body.email;
    if(!userMail || !userMail.includes('@')) {
      res.status(422).json({ messsage: "invalid email address."});
      return;
    } 
    res.status(201).json({ messsage: "Signed up!" });
  } else {
    res.status(200).json({ messsage: "OK"});
  }
}

export default handler;
