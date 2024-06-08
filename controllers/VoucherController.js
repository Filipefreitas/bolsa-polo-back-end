const express = require('express')
const router = express.Router()
const voucherService = require("../services/VoucherService.js");
const voucherMiddleware = require("../middleware/VoucherMiddleware.js");

//cria um voucher
router.post("/", voucherMiddleware.validateVoucher, voucherService.createAVoucher);

//lista de todos os vouchers
router.get("/", voucherService.getVouchers);

//retorna voucher especifico baseado no ID do voucher
router.get("/:id", voucherService.getAVoucher);

//atualiza o status de voucher especifico baseado no ID do voucher
router.patch("/:id", voucherService.updateAVoucher);

//remove um voucher baseado no ID do voucher
router.delete("/:id", voucherService.deleteAVoucher);

module.exports = router