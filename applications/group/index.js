const controller = require('./controller');
const model = require('./model')

module.exports = {
    Model: model.Instance(),
    Controller: controller,
}