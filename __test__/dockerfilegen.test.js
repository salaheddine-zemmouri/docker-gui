const dockerfilegen = require('../api/dockerfilegen')

const singleStageBody = [
    {
        "from":{
            "platform": "",
            "image": "node",
            "tag": "12-alpine",
            "as": ""
        },
        "instructions":[
            {
                "type": "RUN",
                "params": ["apk", "add"," --no-cache" ,"python2" ,"g++" ,"make"]
            },
            {
                "type": "WORKDIR",
                "params": ["/app"]
            },
            {
                "type": "COPY",
                "params": [".", "."]
            },
            {
                "type": "RUN",
                "params": ["yarn", "install"," --production"]
            },
            {
                "type": "CMD",
                "params": ["node", "src/index.js"]
            },
            {
                "type": "EXPOSE",
                "params": ["3000"]
            }
        ]
    }
]

const singleStageResponse =  'FROM node:12-alpine\nRUN [\"apk\", \"add\", \" --no-cache\", \"python2\", \"g++\", \"make\"]\nWORKDIR \/app \nCOPY . . \nRUN [\"yarn\", \"install\", \" --production\"]\nCMD [\"node\", \"src\/index.js\"]\nEXPOSE 3000 \n';

const multiStageBody = [
    {
        "from":{
            "platform": "",
            "image": "node",
            "tag": "12-alpine",
            "as": ""
        },
        "instructions":[
            {
                "type": "RUN",
                "params": ["apk", "add"," --no-cache" ,"python2" ,"g++" ,"make"]
            }
        ]
    },
    {
        "from":{
            "platform": "",
            "image": "node",
            "tag": "12-alpine",
            "as": ""
        },
        "instructions":[
            {
                "type": "RUN",
                "params": ["apk", "add"," --no-cache" ,"python2" ,"g++" ,"make"]
            }
        ]
    }
]

const multiStageResponse= 'FROM node:12-alpine\nRUN [\"apk\", \"add\", \" --no-cache\", \"python2\", \"g++\", \"make\"]\nnode:12-alpine\nRUN [\"apk\", \"add\", \" --no-cache\", \"python2\", \"g++\", \"make\"]\n';

test('single stage body', async () => {
    expect.assertions(1);
    await dockerfilegen.createFile(singleStageBody).then( res => {
        expect(res).toBe(singleStageResponse);
    })
})

test('multi stage body', async () => {
    expect.assertions(1);
    await dockerfilegen.createFile(multiStageBody).then( res => {
        expect(res).toBe(multiStageResponse);
    })
})

test('Empty body to return minimal dockerfile', async () => {
    expect.assertions(1);
    await dockerfilegen.createFile([]).then( res => {
        expect(res).toBe("FROM scratch");
    })
})

test('Body not starting with FROM', () => {

    return expect(dockerfilegen.createFile([
        {
            "instructions":[
                {
                    "type": "RUN",
                    "params": ["apk", "add"," --no-cache" ,"python2" ,"g++" ,"make"]
                }
            ]
        }])).rejects.toThrow(Error);
})