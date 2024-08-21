const e = {
  process: (content) => ({
    code: "module.exports = " + JSON.stringify(content),
  }),
};
module.exports = e;
