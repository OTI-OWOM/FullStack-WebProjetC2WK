exports.dataPass = (req) => {
    let data = {};
    if (req.body) {
        try {
            data = JSON.parse(req.body);
        } catch (error) {
            data = req.body;
        }
    } else {
        data = req.body;
    }

    return data;
}