module.exports = {
  apps : [{
    name        : "backend",
    script      : "./backend/server.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
     "NODE_ENV": "production"
    }
  },
  {
    name       : "frontend",
    script     : "./frontend/node_modules/react-scripts/scripts/build.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
      "NODE_ENV": "production"
    }
  }]
}
