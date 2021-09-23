const errorHandler = (err, req, res, next) => {
    let code = 500
    let message = ["internal server error"]

    switch (err.name) {
        case "SequelizeValidationError":
            code = 400
            message = err.errors.map((el) => {
                return el.message
            })
            break;
        case "POSTNOTFOUND":
            code = 404
            message = ["Post Not Found"]
            break;
        case "USERNOTFOUND":
            code = 401
            message = ["Email / Password Wrong"]
            break;
        case "CATEGORYNOTFOUND":
            code = 404
            message = ["Category Not Found"]
            break;
        case "TOKENINVALID":
            code = 401
            message = ["invalid JWT token"]
            break;
        case "FORBIDDEN":
            code = 403
            message = ["Access Denied"]
            break;
        case "IMGEMPTY":
            code = 400
            message = ["Image Cannot Empty"]
            break;
        case "HISTORYNOTFOUND":
            code = 404
            message = ["History Is Empty"]
            break;

        default:
            break;
    }

    res.status(code).json(message)
}

module.exports = errorHandler