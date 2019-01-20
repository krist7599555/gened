import db from "../db/index";

export default (req, res) => {
  const ouid = req.params.ouid;
  db.users.findOne({ ouid }).then(doc => {
    if (doc) return res.status(200).send(doc);
    else return res.status(204); // no content
  });
};
