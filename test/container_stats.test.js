const stats = require('../api/container_stats')

test('Computes CPU usage to 0', () => {
    const result = {
        "cpu_stats": {
            "cpu_usage": {
                "total_usage": 10,

            },
            "system_cpu_usage": 10,
            "online_cpus": 3
        },
        "precpu_stats": {
            "cpu_usage":{
                "total_usage": 10,
            },
            "system_cpu_usage": 10
        }
    }
    expect(stats.calculateCPUUsage(result)).toBe(0)
})
test('CPU usage should be under 0.5%', () => {
    const result = {
        "cpu_stats": {
            "cpu_usage": {
                "total_usage": 100215,

            },
            "system_cpu_usage": 73930659,
            "online_cpus": 4
        },
        "precpu_stats": {
            "cpu_usage":{
                "total_usage": 100093,
            },
            "system_cpu_usage": 949214
        }
    }
    expect(stats.calculateCPUUsage(result)).toBeLessThanOrEqual(0.5)
})

test('Memory usage should be under 9.8%', () => {
    const result = {
        "memory_stats": {
            "usage": 0,
            "stats": {
                "cache": 0
            },
            "limit": 0
        }
    }
    expect(stats.calculateMemUsage(result)).toBe(0)
})

test('Computes Memory usage to 0', () => {
    const result = {
        "memory_stats": {
            "usage": 6537216,
            "stats": {
                "cache": 0
            },
            "limit": 67108864
        }
    }
    expect(stats.calculateMemUsage(result)).toBeLessThanOrEqual(9.8)
})