const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const billingController = require('../controller/payment');
const isAuth = require('../middleware/isAuthenticated');
const mainController = require('../controller/main');
const funnelController = require('../controller/funnel');
const templateController = require('../controller/template');
const emailIntegrationController = require('../controller/integrations/emailIntegrations');
const paymentIntegrationController = require('../controller/integrations/paymentIntegrations');
const IntegrationController = require('../controller/integrations/integrations');
const MailchimpController = require('../controller/emails/mailchimp');
const productController = require('../controller/products');

const multer = require('multer');
 
var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        
        if (file.fieldname === 'file') {
          cb(null, 'uploads/files'); 
        } else if (file.fieldname === 'thumbnail') {
          cb(null, 'uploads/logos'); 
        }
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "file") { // if uploading resume
    if ( file.mimetype === 'text/html' || file.mimetype === 'text/css') { 
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else { 
    if ( file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ) { 
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
};

var upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
})

  


router.get('/home', isAuth, mainController.getHome);

router.get('/funnel', isAuth, funnelController.getMyFunnel);

router.get('/editor', isAuth, templateController.getEditor);

router.post('/add-name', isAuth, funnelController.addFunnelName);

router.get('/funnel_home/:funnelId', isAuth, funnelController.getFunnelHome);

router.delete(
  '/delete-funnel/:funnelId',
  isAuth,
  funnelController.deleteFunnel
);

router.get('/delete-step/:funnelId/:stepId', isAuth, funnelController.deleteSteps);

router.post('/add-step', funnelController.addStep);

router.get('/setting', isAuth, function (req, res) {
  res.render('Pages/setting');
});

//router.get("/templates", isAuth, templateController.getTemplate);
router.get('/templates', isAuth, templateController.getTemplate);

router.get('/integration', isAuth, (req,res,next) => {
    res.redirect('/integration/email');
});

router.get('/integration/email', isAuth, IntegrationController.emailIntegrations);

router.get('/integration/domain', isAuth, IntegrationController.domainIntegrations);

router.get('/integration/payment', isAuth, IntegrationController.paymentIntegrations);

router.get('/integration/zapier', isAuth, IntegrationController.zapierIntegrations);

router.post('/user-has-integration', isAuth, IntegrationController.hasIntegration);

router.post('/get-mailchimp-list',isAuth, MailchimpController.getMailchimpList);

router.post('/add-page-email-integration', isAuth ,IntegrationController.addEmailIntegration );

router.post('/remove-page-integration', isAuth ,IntegrationController.removeIntegration );

router.post('/get-page-integrations', isAuth ,IntegrationController.getPageIntegrations );

router.post('/add-mailchimp-member', isAuth ,MailchimpController.addMemberToList );

router.post('/add-payment-integrations', isAuth ,IntegrationController.addPaymentIntegration );

router.post('/remove-page-payment-integrations', isAuth ,IntegrationController.removePaymentIntegration );


router.post('/get-pages', isAuth , funnelController.getPages );

router.post('/get-integrated-emails', isAuth , emailIntegrationController.getIntegrations );

router.post('/get-integrated-payments', isAuth , paymentIntegrationController.getIntegrations );

router.get('/Loader', isAuth, function (req, res) {
  res.render('Pages/Loader');
});
router.get('/signup', userController.getSignup);

router.post('/signup', userController.postSignUp);

router.get('/confirm-email/:token', userController.confirmEmail);

router.get('/', userController.getLogin);

router.post('/login', userController.postLogin);

router.post('/save-template', isAuth, templateController.saveTemplate);

router.get('/billing_details', isAuth, billingController.getPayment);

router.post('/payNow', isAuth, require('../controller/payment').payment);

router.post('/get-email-integrations', isAuth, emailIntegrationController.getIntegrations);

router.post('/get-email-integration', isAuth, emailIntegrationController.getIntegration);

router.post('/remove-email-integrations', isAuth, emailIntegrationController.removeIntegrations);

router.post('/update-email-integration', isAuth, emailIntegrationController.updateIntegration);

router.post('/email-integrations', isAuth, emailIntegrationController.addIntegration);




router.post('/get-payment-integrations', isAuth, paymentIntegrationController.getIntegrations);

router.post('/get-payment-integration', isAuth, paymentIntegrationController.getIntegration);

router.post('/remove-payment-integrations', isAuth, paymentIntegrationController.removeIntegrations);

router.post('/update-payment-integration', isAuth, paymentIntegrationController.updateIntegration);

router.post('/payment-integrations', isAuth, paymentIntegrationController.addIntegration);

router.post('/add-page-template',upload.fields([ 
  { name: 'file', maxCount: 1 }, { name: 'thumbnail', maxCount: 1}
]) ,templateController.addPageTemplate);

router.post('/add-template',upload.single('thumbnail') , templateController.addTemplate);

router.get('/get-products/:funnel/:page',isAuth,productController.getProductsPage);

router.get('/add-products/:funnel/:page/payment-options',isAuth,productController.getAddProductsPaymentPage);

router.get('/add-products/:funnel/:page/product-details',isAuth,productController.getAddProductsPage);

router.post('/add-product',isAuth,productController.addProduct);

router.post('/get-product',isAuth,productController.getProduct);

router.post('/update-product',isAuth,productController.updateProduct);



router.post('/delete-product',isAuth,productController.deleteProduct);

router.post('/update-template', templateController.updateTemplate);

router.post('/get-category-template', templateController.getCategoryTemplate);

router.get('/get-admin-template', templateController.getAdminTemplates);

router.get('/preview/:id',  templateController.previewTemlate);

router.post('/logout', isAuth, userController.logout);




module.exports = router;
