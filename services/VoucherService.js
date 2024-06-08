const voucherModel = require("../models/Voucher.js");

exports.createAVoucher = (req, res) => {
    const { percDiscount, qtdVouchers } = req.body;

    const createVoucherPromises = [];
    for (let i = 0; i < qtdVouchers; i++) {
        const newVoucher = new voucherModel({ percDiscount, qtdVouchers });
        createVoucherPromises.push(newVoucher.save());
    }

    Promise.all(createVoucherPromises)
        .then((newVouchers) => {
            res.json({
                message: `${qtdVouchers} Vouchers foram criados com sucesso e estão salvos na coleção`,
                data: newVouchers
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
};

exports.getVouchers = (req, res)=>{
    if(req.query.status){
        voucherModel.find()
        .where("status").equals(req.query.status)
        .then(vouchers=>{
            res.json({
                message: `lista de todos os vouchers no status ${req.query.status}`,
                data: vouchers,
                totalVouchers: vouchers.length
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: err
            })
        })
    }
    else{
        voucherModel.find().populate("studentVouchers")
        .then(vouchers=>{
            res.json({
                message: "lista de todos os vouchers cadastrados",
                data: vouchers,
                totalVouchers: vouchers.length
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: err
            })
        })
    }

};

exports.getAVoucher = (req, res)=> {
        voucherModel.findById(req.params.id).populate("studentVouchers", "-studentVouchers")
        .then(voucher=>{
            if(voucher)
            {
                res.json({
                    message: `Voucher com o id ${req.params.id}`,
                    data: voucher
                })
            }
            else
            {
                res.status(404).json({
                    message: `Náo há voucher cadastrado com o id ${req.params.id}`
                })
            }   
        })
        .catch(err=>{
            res.status(500).json({
                message: err
            })
        })
};

exports.updateAVoucher = (req, res)=>{

    voucherModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(voucher=>{
        if(voucher)
        {
            res.json({
                message: `Voucher com o id ${req.params.id} foi atualizado`,
                data: voucher
            })
        }
        else
        {
            res.status(404).json({
                message: `Náo há voucher cadastrado com o id ${req.params.id}`
            })
        }   
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
};

exports.deleteAVoucher = (req, res)=>{

    voucherModel.findByIdAndDelete(req.params.id)
    .then(voucher=>{
        if(voucher)
        {
            res.json({
                message: `Voucher com o id ${req.params.id} foi deletado com sucesso`,
                data: voucher
            })
        }
        else
        {
            res.status(404).json({
                message: `Náo há voucher cadastrado com o id ${req.params.id}`
            })
        }   
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}