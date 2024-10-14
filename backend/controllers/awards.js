const Award = require("../models/Award");

const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");

exports.addAward = (req, res, next) => {
  const awardData = _.cloneDeep(req.body);
  const newAward = new Award(queryCreator(awardData));

  newAward
    .save()
    .then((award) => res.json(award))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.updateAward = (req, res, next) => {
  Award.findOne({ _id: req.params.id })
    .then((award) => {
      if (!award) {
        return res.status(404).json({
          message: `Award with id "${req.params.id}" is not found.`,
        });
      } else {
        const awardData = _.cloneDeep(req.body);

        const updatedAward = queryCreator(awardData);

        Award.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedAward },
          { new: true },
        )
          .then((award) => res.json(award))
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            }),
          );
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.deleteAward = (req, res, next) => {
  Award.findOne({ _id: req.params.id }).then(async (award) => {
    if (!award) {
      return res.status(404).json({
        message: `Award with id "${req.params.id}" is not found.`,
      });
    }

    Award.deleteOne({ _id: req.params.id })
      .then((deletedCount) =>
        res.status(200).json({
          message: `Award is successfully deleted from DB.`,
        }),
      )
      .catch((err) =>
        res.status(400).json({
          message: `Error happened on server: "${err}" `,
        }),
      );
  });
};

exports.getAwards = (req, res, next) => {
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;

  Award.find()
    .skip(startPage * perPage - perPage)
    .limit(perPage)
    .sort(sort)
    .then((awards) => res.send(awards))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.getAwardById = (req, res, next) => {
  Award.findOne({
    _id: req.params.id,
  })
    .then((award) => {
      if (!award) {
        res.status(404).json({
          message: `Award with id "${req.params.id}" is not found.`,
        });
      } else {
        res.json(award);
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};
