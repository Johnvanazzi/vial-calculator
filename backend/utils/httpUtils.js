function baseResponse(res, statusCode, body) {
    res.statusCode = statusCode;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.json(body ?? {});
}

module.exports.baseResponse =  baseResponse;