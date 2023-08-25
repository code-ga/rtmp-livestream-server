import express from 'express';
import fs from "fs"
import path from "path"
const app = express();

app.use(express.urlencoded());
const configFileDir = path.join(__dirname, "..", "config.json")
interface ConfigContent {
    streamToken: { [key: string]: string }
    blockOther: boolean
}
let config: ConfigContent = JSON.parse(fs.readFileSync(configFileDir, "utf-8"))
fs.watch(configFileDir, () => {
    config = JSON.parse(fs.readFileSync(configFileDir, "utf-8"))
})

app.post("/auth", function (req, res) {
    /* This server is only available to nginx */
    console.log(req.body)
    const streamKey = req.body.key;
    const streamName = req.body.name

    /* You can make a database of users instead :) */
    if (config.streamToken[streamName] && streamKey === config.streamToken[streamName]) {
        res.status(200).send();
        return;
    } else if (!config.blockOther) {
        res.status(200).send();
        return
    }

    /* Reject the stream */
    res.status(403).send();
});

app.listen(8000, function () {
    console.log("Listening on port 8000!");
});
