const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index))                                                    //index route
    .post(
        isLoggedIn,                                                                             //create route
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );       

router.get("/new", isLoggedIn, listingController.renderNewForm);                                //new route


router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))                                              //show route
    .put(
        isLoggedIn,
        isOwner,    
        upload.single("listing[image]"),                                                                            //Update Route
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,                                                                                //Delete route
        wrapAsync( listingController.destroyListing)
    );


router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingController.renderEditForm));     //Edit route


module.exports = router;