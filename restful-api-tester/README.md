# restful-api-tester

## init project

```bash
➜  restful-api-tester git:(master) ✗ npm i log4js axios command-line-args debug
```

## run

```bash
➜  restful-api-tester pm2 startOrGracefulReload monitor.json
```

`tail -f http.log`

### update config in json

```bash
## dump all processes for resurrecting them later
➜  restful-api-tester git:(master) ✗ pm2 save
## kill daemon, stop pm2
➜  restful-api-tester git:(master) ✗ pm2 kill
## resurrect previously dumped processes
➜  restful-api-tester git:(master) ✗ pm2 resurrect
```

```bash
## upgrade pm2
➜  restful-api-tester git:(master) ✗ pm2 deepUpdate
```