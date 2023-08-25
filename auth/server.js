const express = require('express');
const app = express();

app.use(express.urlencoded());

app.post("/auth", function(req, res) {
  /* This server is only available to nginx */
  console.log(req.body)
  const streamkey = req.body.key;
  const streamName = req.body.name

  /* You can make a database of users instead :) */
  if (streamkey === "supersecret") {
    res.status(200).send();
    return;
  }

  /* Reject the stream */
  res.status(403).send();
});

app.listen(8000, function() {
  console.log("Listening on port 8000!");
});
