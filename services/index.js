

class ServicesIndex {
  constructor(app) {
    this.app = app;
  }

  registerServices() {
    this.app.use('/retrospective', require('./01.retrospective'));
  }
}

module.exports = (app)=>{
  return new ServicesIndex(app).registerServices();
}