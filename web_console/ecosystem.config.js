module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'web-console',
      script    : './bin/www',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_PORT: 3002
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    qa : {
      user : 'node',
      host : '106.75.19.156',
      ref  : 'origin/master',
      repo : 'https://github.com/twotwo/practice-nodejs.git',
      path : '/var/node_apps',
      'post-deploy' : 'cd web_console && npm install && pm2 startOrRestart ecosystem.config.js --env qa',
      env  : {
        NODE_ENV: 'qa'
      }
    }
  }
};
