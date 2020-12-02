const Funnel = require('../models/Funnel');
const Step = require('../models/FunnelStep');
const Products = require('../models/products')
const PageIntegration = require('../models/pageIntegrations');

exports.getProductsPage = async (req,res,next) => {
    let funnel = req.params.funnel;
    let page = req.params.page;

    let funnelExists = await Funnel.findById(funnel);
    let stepExists = await Step.findById(page);

    if(funnelExists && stepExists) {
        let products =  await Products.find({funnel: funnelExists._id , step: stepExists._id})

        return res.render('Pages/get-products', {
            funnel: funnelExists._id,
            step: stepExists._id,
            products: products
        })
    } else {
        return res.redirect(`/funnel_home/${funnelExists._id}?stepid=${stepExists._id}`)
    }
}


exports.getAddProductsPaymentPage = async (req,res,next) => {
    let funnel = req.params.funnel;
    let page = req.params.page;

    let funnelExists = await Funnel.findById(funnel);
    let stepExists = await Step.findById(page);


    if(funnelExists && stepExists) {

        return res.render('Pages/add-payments-details-products', {
            funnel: funnelExists._id,
            step: stepExists._id,
        })
    } else {
        return res.redirect(`/funnel_home/${funnelExists._id}?stepid=${stepExists._id}`)
    }
}


exports.getAddProductsPage = async (req,res,next) => {
    let funnel = req.params.funnel;
    let page = req.params.page;

    let funnelExists = await Funnel.findById(funnel);
    let stepExists = await Step.findById(page);


    if(funnelExists && stepExists) {

        return res.render('Pages/add-products', {
            funnel: funnelExists._id,
            step: stepExists._id
        })
    } else {
        return res.redirect(`/funnel_home/${funnelExists._id}?stepid=${stepExists._id}`)
    }
}


exports.addProduct = (req,res,next) => {
    
    const {integration , value , name, price, currency, phone, address1, address2, cityTown, state, country, zip, description, funnel , step} = req.body;

    let product = new Products({
        name: name,
        price: price,
        currency :currency,
        phone: phone,
        address1: address1,
        address2: address2,
        cityTown: cityTown,
        state:state,
        zip: zip,
        integration: integration,
        description: description,
        country: country,
        value:value,
        funnel :funnel,
        step :step
    })

    product
        .save()
        .then(() => {
            return res.status(200).json({'msg': 'Product saved Succesfully!'})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Error in Sving Product!'})
        })
}

exports.deleteProduct = (req,res,next) => {
    let {product} = req.body;

    Products
        .findByIdAndDelete(product)
        .then(()=>{
            return res.status(200).json({'msg': 'Product deleted Successfully'})
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Error in deleting Product'})
        })
}

exports.getProduct = (req,res,next) => {
    const {product} = req.body;

    Products
        .findById(product)
        .then((product) => {
            return res.status(200).json({'msg': 'Product details fetch successfully!', product: product})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in getting product details'})
        })
}

exports.updateProduct = (req,res,next) =>{

    let {id, name, price, currency, phone, address1, address2, cityTown, state, zip, description , value} = req.body;
    
    let updated = {
        name: name,
        price: price,
        currency,
        phone,
        address1,
        address2,
        cityTown,
        state,
        zip,
        description,
        value
    }
    Products
        .findByIdAndUpdate(id, updated)
        .then(() => {
            return res.status(200).json({'msg': 'product updtaed successsfully!'})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Error in updating product'})
        })
}