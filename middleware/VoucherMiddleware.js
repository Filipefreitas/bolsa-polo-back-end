const voucherModel = require("../models/Voucher");

exports.validateVoucher = async (req, res, next)=>{
    //console.log(`The request body: ${JSON.stringify(req.body)}`)
    const {percDiscount, qtdVouchers} = req.body;

    let errors = {};
    let hasErrors = false;
    const minPercDiscount = 1;
    const maxPercDiscount = 50;
    const minQtdVouchers = 1;
    const maxQtdVouchers = 10;

    if(percDiscount === undefined){
        hasErrors = true;
        errors["errorPerc"] =`Informe o percentual de desconto dos vouchers a serem cadastrados (entre ${minPercDiscount} e ${maxPercDiscount})`;
    }
    else if(isNaN(percDiscount)){
        hasErrors = true;
        errors["errorPerc"] = `O percentual do voucher deve ser numérico (entre ${minPercDiscount} e ${maxPercDiscount})`;
    }
    else if(percDiscount < minPercDiscount || percDiscount > maxPercDiscount){
        hasErrors = true;
        errors["errorPerc"] = `O percentual do voucher a serem cadastrados deve ser entre ${minPercDiscount} e ${maxPercDiscount}`;
    }
    else if(qtdVouchers === undefined){
        hasErrors = true;
        errors["errorQtd"] = `Informe a quantidade de voucher a serem cadastrados (entre ${minQtdVouchers} e ${maxQtdVouchers})`;
    }
    else if(isNaN(qtdVouchers)){
        hasErrors = true;
        errors["errorQtd"] = `A quantidade de vouchers deve ser numérico entre ${minQtdVouchers} e ${maxQtdVouchers}`;
    }
    else if(qtdVouchers < minQtdVouchers || qtdVouchers > maxQtdVouchers){
        hasErrors = true;
        errors["errorQtd"] = `A quantidade de vouchers deve ser entre ${minPercDiscount} e ${maxPercDiscount}`;
    }

    if(hasErrors) {
        console.log(errors);
        return res.status(400).json({errors});
    }
    else
    {
        next();
    }
}   