module.exports = function (request, response, next) {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ a: request.params.id }));
};
