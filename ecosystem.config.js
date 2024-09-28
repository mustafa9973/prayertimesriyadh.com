module.exports = {
    apps: [
      {
        name: 'prayer-riyadh',
        script: 'node_modules/.bin/next',
        args: 'start -p 3000',
        cwd: './',
        instances: 'max', // Number of instances to run (you can adjust this based on your needs)
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  