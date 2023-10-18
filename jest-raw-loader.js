const e = {
  process: (content) => ({
    code: "module.exports = " + JSON.stringify(content),
  }),
};
export default e;
