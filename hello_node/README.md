# hello_node

A barebones Node.js app using [Express 4](http://expressjs.com/).

## Dependencies

 * express-generator `npm install -g express-generator # Gloabal Install`


## Generate Project by express-generator

Make sure you have [Node.js](http://nodejs.org/) lts/carbon and [express-generator](http://wiki.li3huo.com/Node.js#express-generator) installed.

```sh
➜  practice-nodejs git:(master) ✗ express --view=hbs hello_node && cd hello_node
```

### config app port

    "config": {"port": "3001"} #add to package.json

    var port = normalizePort(process.env.npm_package_config_port); #add to bin/www

## Running Project


```sh
git clone https://github.com/twotwo/practice-nodejs.git # or clone your own fork
cd hello_node
npm install
npm start
```
