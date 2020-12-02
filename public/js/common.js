
(function($) {
    
    var Controller;
    
    Controller = {
        checkEmailIntegration: function(integration) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: '/user-has-integration',
                    data: {'vendor': integration, 'service': 'Email'},
                    success: function (data) {
                        resolve(data)
                    },
                    error: function (data) {
                        resolve(null)
                    }
                });
            })
        },
        getMailchimpLists: function (data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: '/get-mailchimp-list',
                    data: data,
                    success: function (data) {
                        resolve(data)
                    },
                    error: function (data) {
                        resolve(null)
                    }
                });
            })
        },
        addPageEmailIntegration: function(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: '/add-page-email-integration',
                    data: data,
                    success: function (data) {
                        resolve(data)
                    },
                    error: function (data) {
                        resolve(null)
                    }
                });
            })
        },
        removeIntegration: function (data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: '/remove-page-integration',
                    data: data,
                    success: function (data) {
                        resolve(data)
                    },
                    error: function (data) {
                        resolve(null)
                    }
                });
            })
        },
        getPageIntegartions: function(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: '/get-page-integrations',
                    data: data,
                    success: function (data) {
                        resolve(data)
                    },
                    error: function (data) {

                        resolve(null)
                    }
                });
            })
        },
        addPaymentIntegration: function (data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: '/add-payment-integrations',
                    data: data,
                    success: function (data) {
                        resolve(data)
                    },
                    error: function (data) {
                        resolve(null)
                    }
                });
            })
        },
        removePaymentIntegration: function(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: '/remove-page-payment-integrations',
                    data: data,
                    success: function (data) {
                        resolve(data)
                    },
                    error: function (data) {
                        resolve(null)
                    }
                });
            })
        },
        getIntegratedEmails : function() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: '/get-integrated-emails',
                    data: {
                        'service': 'Email'
                    },
                    success: function (data) {
                        resolve(data)
                    },
                    error: function (data) {
                        resolve(null)
                    }
                });
            })
        },
        getIntegratedPayments: function() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: '/get-integrated-payments',
                    data: {
                        'service': 'Payment'
                    },
                    success: function (data) {
                        resolve(data)
                    },
                    error: function (data) {
                        resolve(null)
                    }
                });
            })
        }
        
        
    };
    
    window.Controller = Controller;
    
})(this.jQuery);


