const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listing/index.ejs", { allListings });
};

module.exports.new = (req, res) => {
    res.render("listing/new.ejs");
};

module.exports.newPost = async (req, res) => {
    let responce=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    })
        .send()
       
    let url = req.file.path;
    let filename = req.file.filename;
    let newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = { url, filename };
    newlisting.geometry=responce.body.features[0].geometry;
    await newlisting.save();
    req.flash("success", "New listing is created!");
    res.redirect("/listings");
};

module.exports.search=async (req, res) => {
    const query = req.query.q || "";

    if (!query.trim()) {
        const allListings = await Listing.find({});
        return res.render("listing/index.ejs", { allListings });
    }

    const allListings = await Listing.find({
        title: { $regex: query, $options: "i" }
    });

    if (allListings.length === 0) {
        req.flash("error", `No results found for "${query}".`);
        return res.redirect("/listings");
    }

    res.render("listing/index.ejs", { allListings });
}


module.exports.show = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.rediret("/listings");
    }
    res.render("listing/show.ejs", { listing });
};

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.rediret("/listings");
    }
    let originalImage = listing.image.url;
    originalImage.replace("/upload", "/upload/w_250");
    res.render("listing/edit.ejs", { listing, originalImage });
};

module.exports.update = async (req, res) => {
    const { id } = req.params;
    const updatedListingData = req.body.listing;
    let listing = await Listing.findByIdAndUpdate(id, updatedListingData);
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing is updated successfully!");
    res.redirect(`/listings/${id}`);

};

module.exports.destroy = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing is deleted!");
    res.redirect("/listings");
};
