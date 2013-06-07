var docker = require('./index')
var expect = require('chai').expect
var nock = require('nock')

var host = "http://localhost:4243"

describe("docker.js", function() {
  describe("#containers", function() {
    describe("#createContainer", function() {

      var opts = {
        "Hostname":"",
        "User":"",
        "Memory":0,
        "MemorySwap":0,
        "AttachStdin":false,
        "AttachStdout":true,
        "AttachStderr":true,
        "PortSpecs":null,
        "Tty":false,
        "OpenStdin":false,
        "StdinOnce":false,
        "Env":null,
        "Cmd":[
                "date"
        ],
        "Dns":null,
        "Image":"base",
        "Volumes":{},
        "VolumesFrom":""
      }

      it("should create a new container", function(done) {

        var res = {Id:"abcde", Warnings:[]}
        var scope = nock(host).post('/containers/create').reply(201, res)

        function handler(err, r) {
          expect(err).to.be.null
          expect(r).to.include.keys(['Id', 'Warnings'])
          scope.done()
          done()
        }

        docker().createContainer(opts, handler)
      })
    })
    describe("#listContainers", function() {

      var containers = [
        {
         "Id": "8dfafdbc3a40",
         "Image": "base:latest",
         "Command": "echo 1",
         "Created": 1367854155,
         "Status": "Exit 0"
        },
        {
         "Id": "9cd87474be90",
         "Image": "base:latest",
         "Command": "echo 222222",
         "Created": 1367854155,
         "Status": "Exit 0"
        },
      ]

      it("should list containers", function(done) {
        var scope = nock(host).get('/containers/json').reply(200, containers)

        function gotContainers(err, c) {
          expect(err).to.be.null
          expect(c).to.have.length(2)
          expect(c[0]).to.include.keys(Object.keys(containers[0]))
          expect(c[1]).to.include.keys(Object.keys(containers[1]))
          scope.done()
          done()
        }

        docker().listContainers(gotContainers)
      })

      it("should accept the before parameter", function(done) {
        var scope = nock(host).get('/containers/json?before=8dfafdbc3a40').reply(200, [containers[0]])

        function gotContainers(err, c) {
          expect(err).to.be.null
          expect(c).to.have.length(1)
          expect(c[0]).to.include.keys(Object.keys(containers[0]))
          scope.done()
          done()
        }

        docker().listContainers({
          queryParams: {
            before: '8dfafdbc3a40'
          }
        }, gotContainers)
      })

      it("should error on non-200 from server", function(done) {
        var scope = nock(host).get('/containers/json').reply(500, [])

        function gotContainers(err, c) {
          expect(err).to.exist
          expect(c).to.eql([])
          scope.done()
          done()
        }

        docker().listContainers(gotContainers)
      })
    })
    describe("#inspectContainer", function () {

      var container = {
        "Id": "4fa6e0f0c6786287e131c3852c58a2e01cc697a68231826813597e4994f1d6e2",
        "Created": "2013-05-07T14:51:42.041847+02:00",
        "Path": "date",
        "Args": [],
        "Config": {
          "Hostname": "4fa6e0f0c678",
          "User": "",
          "Memory": 0,
          "MemorySwap": 0,
          "AttachStdin": false,
          "AttachStdout": true,
          "AttachStderr": true,
          "PortSpecs": null,
          "Tty": false,
          "OpenStdin": false,
          "StdinOnce": false,
          "Env": null,
          "Cmd": [
            "date"
          ],
          "Dns": null,
          "Image": "base",
          "Volumes": {},
          "VolumesFrom": ""
        },
        "State": {
          "Running": false,
          "Pid": 0,
          "ExitCode": 0,
          "StartedAt": "2013-05-07T14:51:42.087658+02:01360",
          "Ghost": false
        },
        "Image": "b750fe79269d2ec9a3c593ef05b4332b1d1a02a62b4accb2c21d589ff2f5f2dc",
        "NetworkSettings": {
          "IpAddress": "",
          "IpPrefixLen": 0,
          "Gateway": "",
          "Bridge": "",
          "PortMapping": null
        },
        "SysInitPath": "/home/kitty/go/src/github.com/dotcloud/docker/bin/docker",
        "ResolvConfPath": "/etc/resolv.conf",
        "Volumes": {}
      }

      it("should inspect a container", function (done) {
        var scope = nock(host).get('/containers/4fa6e0f0c678/json').reply(200, container)

        function inspectedContainer (err, c) {
          expect(err).to.be.null
          expect(c).to.include.keys(Object.keys(container))
          scope.done()
          done()
        }

        docker().inspectContainer('4fa6e0f0c678', inspectedContainer)
      })
    })
  })
})
