module.exports = {
  // CONTAINER
  listContainers: genFunction({
    inputs: ['query'],
    path: 'containers/json',
    method: 'GET',
    codes: {200:true, 400:"bad parameter", 500:"server error"}
  }),
  createContainer: genFunction({
    inputs: ['json'],
    path: 'containers/create',
    method: 'POST',
    codes: {201:true, 404:"no such image", 500:"server error"}
  }),
  inspectContainer: genFunction({
    inputs: ['id'],
    path: 'containers/{{id}}/json',
    method: 'GET',
    codes: {200:true, 404:"no such container", 500:"server error"}
  }),
  listProcesses: genFunction({
    inputs: ['id','params'],
    path: 'containers/{{id}}/top',
    method: 'GET',
    code: {200:true, 404:"no such container", 500:"server error"}
  }),
  inspectContainerChanges: genFunction({
    path: 'containers/{{id}}/changes',
    method: 'GET',
    codes: {200:true, 404:"no such container", 500:"server error"}
  }),
  exportContainer: genFunction({
    path: 'containers/{{id}}/export',
    method: 'GET',
    codes: {200:true, 404:"no such container", 500:"server error"}
  }),
  startContainer: genFunction({
    path: 'containers/{{id}}/start',
    method: 'POST',
    codes: {200:true, 204:true, 404:"no such container", 500:"server error"}
  }),
  stopContainer: genFunction({
    path: 'containers/{{id}}/stop',
    method: 'POST',
    codes: {200:true, 204:true, 404:"no such container", 500:"server error"}
  }),
  restartContainer: genFunction({
    path: 'containers/{{id}}/restart',
    method: 'POST',
    codes: {204:true, 404:"no such container", 500:"server error"}
  }),
  killContainer: genFunction({
    path: 'containers/{{id}}/kill',
    method: 'POST',
    codes: {204:true, 404:"no such container", 500:"server error"}
  }),
  attachToContainer: genFunction({
    path: 'containers/{{id}}/attach',
    method: 'POST',
    codes: {200:true, 400:"bad parameter", 404:"no such container", 500:"server error"}
  }),
  waitContainer: genFunction({
    path: 'containers/{{id}}/wait',
    method: 'POST',
    codes: {200:true, 404:"no such container", 500:"server error"}
  }),
  removeContainer: genFunction({
    path: 'containers/{{id}}',
    method: 'DELETE',
    codes: {204:true, 400:"bad parameter", 404:"no such container", 500:"server error"}
  }),
  // IMAGES
  listImages: genFunction({
    path: 'images/json',
    method: 'GET',
    codes: {200:true, 400:"bad parameter", 500:"server error"}
  }),
  createImage: genFunction({
    path: 'images/create',
    method: 'POST',
    codes: {200:true, 400:"bad parameter", 500:"server error"}
  }),
  insertFileImagecodes: genFunction({
    path: 'images/{{id}}/insert',
    method: 'POST',
    codes: {200:true, 400:"bad parameter", 500:"server error"}
  }),
  inspectImage: genFunction({
    path: 'images/{{id}}/json',
    method: 'GET',
    codes: {200:true, 404:"no such image", 500:"server error"}
  }),
  historyImage: genFunction({
    path: 'images/{{id}}/history',
    method: 'GET',
    codes: {200:true, 404:"no such image", 500:"server error"}
  }),
  pushImage: genFunction({
    path: 'images/{{id}}/push',
    method: 'POST',
    codes: {200:true, 400:"bad parameter", 404:"no such image", 500:"server error"}
  }),
  tagImage: genFunction({
    path: 'images/{{id}}/tag',
    method: 'POST',
    codes: {200:true, 400:"bad parameter", 404:"no such image", 500:"server error"}
  }),
  removeImage: genFunction({
    path: 'images/{{id}}',
    method: 'DELETE',
    codes: {200:true, 404:"no such image", 500:"server error"}
  }),
  searchImages: genFunction({
    path: 'images/search',
    method: 'GET',
    codes: {200:true, 500:"server error"}
  }),
  // MISC
  build: genFunction({
    path: 'build',
    method: 'POST',
    codes: {200:true, 500:"server error"}
  }),
  getAuth: genFunction({
    path: 'auth',
    method: 'GET',
    codes: {200:true, 500:"server error"}
  }),
  setAuth: genFunction({
    path: 'auth',
    method: 'POST',
    codes: {200:true, 204:true, 500:"server error"}
  }),
  systemInfo: genFunction({
    path: 'info',
    method: 'GET',
    codes: {200:true, 500:"server error"}
  }),
  version: genFunction({
    path: 'version',
    method: 'GET',
    codes: {200:true, 500:"server error"}
  }),
  commit: genFunction({
    path: 'commit',
    method: 'POST',
    codes: {201:true, 404:"no such container", 500:"server error"}
  })
};