const router = require("express").Router();
const { register, update, deleteUser, fetchUser, fetchAll } = require("../controller/userController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controller/verifyToken");

//REGISTER
router.post("/registerUser", register);

//UPDATE
router.put("/update/:id", verifyTokenAndAuthorization, update);

//DELETE
router.put("/delete/:id", verifyTokenAndAuthorization, deleteUser);

//FETCH
router.get("/fetch/:id", verifyTokenAndAuthorization, fetchUser);

//FETCH
router.get("/fetch", verifyTokenAndAuthorization, fetchAll);


module.exports = router;