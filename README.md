# Json Lodash analyzer

This repo creates a playground for running lodash queries online on any json input 

Hosted site: [json lodash analyzer](http://json-analyzer.com)

Make sure you have npm and bower installed in your shell (Node Cmd, Powershell or GIT Bash)

## Steps to build

npm install
  
bower install
  
## Steps to Run

grunt 

node ./src/server/server.js

default port is 3000, but can be overridden

PORT=1234 node ./src/server/server.js  

### Steps to build and update to aws

Update the package.json version then,

grunt build

grunt deploy

Wait for 30 secs....

aws ecs update-service --service sample-lodash-analyzer --desired-count 1
