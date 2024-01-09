const db = require('../db/models');
const CarDetail = db.CarDetail;

/**
* Add a new car details
* @param {object} req - request
* @param {object} res - response
*/
exports.createCarDetail = async (req, res) => {
    console.log(`Req body : ${req.body}`);
    const carDetailList = req.body.details;
    if (!carDetailList) {
        return res.status(400).json({error: "No Details Found"})
    }

    carDetailList.forEach(async (carDetail) => {
        console.log(req.body);
        carDetail.CarID = req.params.carId;
        const details = await CarDetail.findAll({ where: { DetailName: carDetail.DetailName, CarID: carDetail.CarID }});
    
        if (details.length !== 0) {
            details.forEach(async element => {
                await element.update(carDetail).catch(error => res.status(400).json({ error }));
            });
        } else {
            await CarDetail.create(carDetail)
                .catch(error => res.status(400).json({ error }));
        }
    });
    res.status(201).json({ message: 'Car detail added!' })
};

/**
* Delete a new car detail
* @param {object} req - request
* @param {object} res - response
*/
exports.deleteCarDetail = async (req, res) => {
    const detail = await CarDetail.findByPk(req.params.detailId);

    return detail.destroy()        
        .then(() => res.status(200).json({ message: 'Car detail deleted!' }))
        .catch(error => res.status(400).json({ error }));;
};