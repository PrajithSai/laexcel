import Employee from './model';

export const create = (req, res, next) => {
  Employee.create(req.body, (err, resp) => {
    if (err) {

    } else {
      show(req, res, next);
    }
  });
}

export const show = (req, res, next) => {
  Employee.find({}, (err, resp) => {
    if (err) {

    } else {
      res.send({ error: false, message: "Registered successuflly", result: resp });
    }
  });
}