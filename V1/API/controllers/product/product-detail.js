const db = require('../../db/models');
const CarDetail = db.CarDetail;

class ProductDetailController {
    /**
     * Add new car details.
     */
    async createCarDetail(req, res) {
        const carDetailList = req.body.details;
        if (!carDetailList) {
            return res.status(400).json({ error: "No Details Found" });
        }
        try {
            for (const carDetail of carDetailList) {
                carDetail.CarID = req.params.carId;
                const detail = await CarDetail.findOne({ where: { DetailName: carDetail.DetailName, CarID: carDetail.CarID } });
                if (detail) {
                    await detail.update(carDetail);
                } else {
                    const detailDelete = await CarDetail.findByPk(carDetail.id);
                    if (detailDelete) {
                        await detailDelete.destroy();
                    }
                    await CarDetail.create(carDetail);
                }
            }
            res.status(201).json({ message: 'Car detail added!' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error, message: "Error adding car details" });
        }
    }

    /**
     * Delete a car detail.
     */
    async deleteCarDetail(req, res) {
        const detail = await CarDetail.findByPk(req.params.detailId);
        if (!detail) {
            return res.status(404).json({ message: 'Car detail not found!' });
        }

        try {
            await detail.destroy();
            res.status(200).json({ message: 'Car detail deleted!' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }
}

// Export an instance of the class
module.exports = new ProductDetailController();
