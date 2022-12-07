const messages = {
    400: "bad request",
    401: "unauthorized",
    403: "forbidden",
    404: "not found",
    409: "conflict",
}

function HttpError(status, message = messages[status]) {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpError;