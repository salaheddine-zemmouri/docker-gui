const request = require('../lib/request')

const exec = async (req, res) => {
    try
    {
        const body = {
            "AttachStdin": false,
            "AttachStdout": true,
            "AttachStderr": true,
            "DetachKeys": "ctrl-p,ctrl-q",
            "Tty": true,
            "Cmd": req.body.cmd,
            "Env": req.body.env
        }
        const execInstance = await request('post', `containers/${req.body.id}/exec`, body)
        res.send(await request('post', `exec/${execInstance["Id"]}/start`, {
            "Detach": false,
            "Tty": true
        }))
    }
    catch(e)
    {
        res.status(500).send(e)
    }
}

module.exports = {
    exec
}