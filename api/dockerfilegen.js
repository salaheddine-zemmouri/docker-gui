const router = require("express").Router();
const path = require("path");
const fs = require("fs");

router.post("/", async (req, res) => {
    // Generate the Dockerfile
    const fileStatus = await createFile(req.body);
    // Send the Dockerfile
    if(fileStatus !== "Error writing in file")
    {
        res.download(path.join(__dirname,"../temp/Dockerfile"),"Dockerfile", error => {
            res.status(500).send(error);
        });
    }
});

const createFile = async (body) => {
    let content = "FROM ";
    for(let stage of body)
    {
        // FROM instruction generation
        content += stage["from"]["platform"] !== "" ? `--platform=${stage["from"]["platform"]} ${stage["from"]["image"]}` : stage["from"]["image"];
        if(stage["from"]["tag"] !== "")
        {
            content += `:${stage["from"]["tag"]}`;
        }
        if(stage["from"]["as"] !== "")
        {
            content += ` AS ${stage["from"]["as"]}`;
        }
        content += "\n";
        // Stage instruction generation
        for(let instruction of stage["instructions"])
        {
            const type = instruction["type"]
            content += type + " ";
            if(type === "USER")
            {
                content += instruction["params"][0] + ":" + instruction["params"][1];
            }
            else if(type === "ENV")
            {
                content += instruction["params"][0] + "=" + instruction["params"][1];
            }
            else if(type === "CMD" || type === "ENTRYPOINT" || type === "RUN")
            {
                content += "[";
                for(let i = 0; i < instruction["params"].length; i++)
                {
                    content += i !== instruction["params"].length -1 ? `"${instruction["params"][i]}", ` : `"${instruction["params"][i]}"`;
                }
                content += "]"
            }
            else
            {
                for(let param of instruction["params"])
                {
                    content += param + " ";
                }
            }
            content += "\n";
        }
    }
    
    if(content == "FROM ") content+="scratch";

    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, "../temp","Dockerfile"),content, error => {
            if(error)
            {
                console.log("error :", error);
                reject("Error writing in file");
            }
            else
            {
                resolve(content);
            }
        });
    });
};

module.exports = { 
    router:router,
    createFile:createFile
}