docker.js
=========

Node.JS wrapper for low-level Docker interface

Remote API: http://docs.docker.io/en/latest/api/docker_remote_api.html


## Usage

```javascript

var docker = require('docker.js')("http://localhost:4243");

docker.ps(function gotContainers (err, containers) {
  if (err) throw err;
  console.log("Containers: ", containers);
  var container = docker.container(containers[0].Id);
  stream.pipe(container.attach(opts)).pipe(stream);
});

```

## Methods

```javascript

docker.ps(opts, cb);
.pipe(docker.build(opts)).pipe(. . .);
docker.events().pipe(. . .);
docker.images(opts, cb);

var container = docker.container('4386fb97867d');
container.commit(opts, cb);
container.cp(opts).pipe(. . .);
container.diff(cb);
container.export().pipe(. . .);


var image = docker.image('5386eb9786d7')
image.history(opts, cb);


```