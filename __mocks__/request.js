const http = require('http')

module.exports = function request(method = 'get', path = '', data) {
    if (path=='containers/json?all=true') {
        return Promise.resolve(
            [
                {
                    Id:1
                },
                {
                    Id:2
                }
            ]
        );
    }
    if (path=='containers/1/stats?stream=false') {
      return Promise.resolve(
        {
          id:1,
          name:'cont2',
          networks:2,
          cpu_stats:{
              cpu_usage:{
                  total_usage:5000
              },
              system_cpu_usage:4000,
              online_cpus:2
          },
          precpu_stats:{
              cpu_usage:{
                  total_usage:4000
              },
              system_cpu_usage:3000
          },
          memory_stats:{
              usage:2000,
              usage:8000,
              stats:{
                  cache:100
              }

          }
      }
      )
    }
    
    
  /*
    const options = {
    method:     method,
    socketPath: '/var/run/docker.sock',
    path:       `/v1.41/${path}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept':       'application/json',
    },
  }

  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let rawData = ''

      res.on('data', chunk => {
        rawData += chunk
      })

      res.on('end', () => {
        let data
        try {
          data = JSON.parse(rawData)
        }
        catch(e) {
          data = {message: rawData}
        }

        if (res.statusCode >= 300) {
          return reject(data)
        }

        resolve(data)
      })
    })

    req.on('error', e => {
      reject(e)
    })

    if (data) {
      req.write(JSON.stringify(data))
    }

    req.end()
  })
  */
}