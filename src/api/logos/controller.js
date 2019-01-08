import Logos from './model';

export const create = (req, res, next) => {
    Logos.create(req.body, (err, resp) => {
        if (err) {

        } else {
          show(req, res, next);
        }
    })
}

export const show = (req, res, next) => {
    Logos.find({}, (err, resp) => {
        if (err) {

        } else {
            res.send({ error: false, message: 'fetch successful', result: resp });
        }
    })
}