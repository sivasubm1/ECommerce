const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const {
  create,
  productsCount,
  listAll,
  remove,
  read,
  update,
  list,
  productStar,
  listRelated,
  searchFilters,
} = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);

// rating

router.put("/product/star/:productId", authCheck, productStar);
router.get("/products/related/:productId", listRelated);

//search

router.post("/search/filters", searchFilters);

module.exports = router;
