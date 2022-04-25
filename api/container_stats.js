const request = require('lib/request')

function calculateCPUUsage(result) {

  try {
    const cpu_delta=result.cpu_stats.cpu_usage.total_usage  - result.precpu_stats.cpu_usage.total_usage
    const system_cpu_delta= result.cpu_stats.system_cpu_usage - result.precpu_stats.system_cpu_usage
    const number_cpus = result.cpu_stats.online_cpus
    console.log(cpu_delta)
    if (system_cpu_delta===0) {
      return 0
    }
    return (cpu_delta / system_cpu_delta) * number_cpus * 100.0
  } catch (e) {
    return 0
  }
  
  
}

function calculateMemUsage(result) {
  try{
    const used_memory = result.memory_stats.usage - result.memory_stats.stats.cache
    const available_memory = result.memory_stats.limit

    if (used_memory === 0 || available_memory===0 ) {
      return 0
    }
    return (used_memory / available_memory) * 100.0
  }catch(e){
    return 0
  }
  
  
}

module.exports = {
    stats
  }

  async function stats(req, res) {
    try {
      const containers=await request('get', 'containers/json?all=true')
      const listStats=[]
      let totalCPU=0
      let totalMem=0
      const totalNet=0

      
      for (let i = 0; i < containers.length; i++) {
        const element = containers[i];
        const result=await request('get', `containers/${element.Id}/stats?stream=false`)
        const stat = {
          container_id:   result.id,
          container_name : result.name,
          cpu_usage : calculateCPUUsage(result),
          memory_usage : calculateMemUsage(result),
          net_usage : result.networks,
          io_usage : "TODO"
          }
        totalCPU+=stat.cpu_usage
        totalMem+=stat.memory_usage
        listStats.push(stat)
      }
      
        //listStats.push(stat)
      res.send({
        total_memory_usage:totalMem,
        total_cpu_usage:totalCPU,
        containers_stats:listStats
      })
    }
    catch(e) {
      console.log(e,"hi")
      res.status(500).send(e)
    }
  }

  /**
   * GET /api/containers-stats
        {
            "total_memory_usage",
            "total_cpu_usage",
            "total_net_usage",
            [
                {
                "container_id" : "x",
                "container_name" : "x?",
                "cpu_usage" : "x",
                "memory_usage" : "x",
                "net_usage" : {
                    "eth0" : {
                        "rx",
                        "tx"
                    }
                },
                "io_usage" : "x"
                },
                ...
            ] 

        }
   */


