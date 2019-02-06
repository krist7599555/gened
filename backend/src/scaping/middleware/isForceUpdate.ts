export const isForceUpdate = (req, res, next) => {
  req.query.force = ["", "true", true, 1, "1"].includes(req.query.force);
  next();
};
export default isForceUpdate;
