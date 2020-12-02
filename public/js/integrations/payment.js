jQuery(() => {


    function removeIntegration(id, service) {
        ns.removeIntegration(id, service);
    }

    function sendIntegration(data) {
        ns.sendIntegration(data, 'Payment');
    }

    function showIntegrations() {
        ns.showIntegrations('Payment');
    }

    function updateIntegrations(data) {
        ns.updateIntegration(data, 'Payment')
    }

    function modalInner(integration) {

        if (integration.vendor === 'Stripe') {
            var header = 'Stripe Integartion'

            var body = `
                    <form id="paymentIntegrationForm">
                        ${inputs.nickname(integration.nickname)}
                        ${inputs.stripe.api(integration.api)}
                        ${inputs.status()}
                        ${inputs.updateButton()}
                        ${inputs.removeButton(integration._id)}
                    </form>
                `
            return { header, body }
        } else if (integration.vendor === 'Paypal') {
            var header = 'Pay Pal Integartion'

            var body = `
                    <form id="paymentIntegrationForm">
                        ${inputs.nickname(integration.nickname)}
                        ${inputs.paypal.clientId(integration.api)}
                        ${inputs.paypal.secret(integration.secret)}
                        ${inputs.status()}
                        ${inputs.updateButton()}
                        ${inputs.removeButton(integration._id)}
                    </form>
                `

            return { header, body }
        }
    }

    

    async function openupdateIntegrationModal(integration) {

        const modalContent = await modalInner(integration);

        $('#apiKeyModal .modal-content .modal-header .modal-title').html(modalContent.header);
        $('#apiKeyModal .modal-content .modal-body').html(modalContent.body);

        ns.status(integration)

        $('.removeEmailIntegration').click((e) => {
            let integrationId = e.target.getAttribute('id');

            confirmation(
                "Are you sure?",
                "You won't be able to revert this!",
                "Yes, delete it!"
            )
            .then((result) => {
                if (result.value) {
                    $('.user_email_integrations_list').html('loading....');
                    removeIntegration(integrationId, 'Payment')
                }
            })
        });


        $('#paymentIntegrationForm').on('submit', (e) => {

            e.preventDefault();
            $('.modal-update-button').attr('disabled', true);
            $('.modal-update-button').text('Loading...');

            var data = {};
            
            if (integration.vendor === 'Stripe') {
                data = {
                    "id": integration._id,
                    "nickname": e.target[0].value,
                    "vendor": integration.vendor,
                    "service": "Payment",
                    "api": e.target[1].value,
                    "status": e.target[2].checked
                }
            } else if (integration.vendor === 'Paypal') {
                data = {
                    "id": integration._id,
                    "nickname": e.target[0].value,
                    "vendor": integration.vendor,
                    "service": "Payment",
                    "api": e.target[1].value,
                    "secret": e.target[2].value,
                    "status": e.target[3].checked
                }
            }

            updateIntegrations(data)

        })
    };

    $('.payment_integrations-container .add_integrations').on('click', () => {
        $('.payment_integrations-container').hide();
        $('.payment_integrations_list').show();
    });

    $('.back-payment-intergations').on('click', () => {
        showIntegrations()
    });


    $('.integrations_stripe').on('click', () => {
        let stripeHeader = 'Stripe Integartion'

        let stripeform = `
            <form id="stripeIntegrationForm">
                ${inputs.nickname('')}
                ${inputs.stripe.api('')}                
                ${inputs.integrateButton()}    
            </form>
        `

        $('#apiKeyModal .modal-content .modal-header .modal-title').html(stripeHeader);
        $('#apiKeyModal .modal-content .modal-body').html(stripeform);


        $('#stripeIntegrationForm').on('submit', (e) => {
            e.preventDefault();

            $('.integrate-button').attr('disabled', true);
            $('.integrate-button').text('Loading...');

            const stripeData = {
                "nickname": e.target[0].value,
                "vendor": "Stripe",
                "service": "Payment",
                "image": "/images/stripe.png",
                "api": e.target[1].value,
            }

            sendIntegration(stripeData)
        })
    })


    $('.integrations_paypal').on('click', () => {
        let paypalHeader = 'Pay Pal Integartion'

        let paypalform = `
            <form id="paypalIntegrationForm">
                ${inputs.nickname('')}
                ${inputs.paypal.clientId('')}
                ${inputs.paypal.secret('')}
                ${inputs.integrateButton()}    
            </form>
        `

        $('#apiKeyModal .modal-content .modal-header .modal-title').html(paypalHeader);
        $('#apiKeyModal .modal-content .modal-body').html(paypalform);


        $('#paypalIntegrationForm').on('submit', (e) => {
            e.preventDefault();

            $('.integrate-button').attr('disabled', true);
            $('.integrate-button').text('Loading...');

            const Data = {
                "nickname": e.target[0].value,
                "vendor": "Paypal",
                "service": "Payment",
                "image": "/images/paypal.png",
                "api": e.target[1].value,
                "secret": e.target[2].value
            }

            sendIntegration(Data)
        })
    })

    $('.payment-integrations').click(function () {

        let integrationId = $(this)[0].getAttribute('id');
        let vendor = $(this)[0].getAttribute('vendor');

        $('#apiKeyModal').modal('show');
        $('#apiKeyModal .modal-content .modal-header .modal-title').html(`${vendor} Integrations`);
        $('#apiKeyModal .modal-content .modal-body').html("<div>Loading....</div>");


        $.ajax({
            type: "POST",
            url: '/get-payment-integration',
            data: { id: integrationId, vendor: vendor },
            success: function (data) {
                const integration = data.data;
                openupdateIntegrationModal(integration);
            },
            error: function (data) {
                oops(data.responseJSON.error)
            }
        });
    })

    // GetIntegrations({ service: 'Payment' });


    // function paymentIntegrations(integrations) {

    //     $('.user_payment_integrations_list').empty();

    //             $('.user_payment_integrations_list').append(`
    //                         <div class="col-xl-4 mt-3 add_payment_integrations_container">
    //                                 <div class="add_integrations">
    //                                     <div class="add_integration_border">
    //                                         <a href="#" style="text-decoration:none;"><img
    //                                                 src="/images/Add_new_intigration.svg" width="20%">
    //                                             <div class="add_img_content">
    //                                                 <span class="add_integrations_content">ADD NEW
    //                                                     <br>INTEGRATION</span>
    //                                             </div>
    //                                         </a>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                 `);

    //                 $('.add_payment_integrations_container .add_integrations').on('click', () => {
    //                     $('.payment_integrations-container').hide();
    //                     $('.payment_integrations_list').show();
    //                 });


    //                 for (let i = 0; i < integrations.length; i++) {
    //                     let html = `
    // <div class="col-xl-4  mt-3 " >
    //     <div class="integrations_stripe updatePaymentIntegration" id="${integrations[i]._id}" vendor="${integrations[i].vendor}" service="${integrations[i].service}">

    //         <img src=${(integrations[i].vendor === 'Stripe' ? '/images/stripe.png' :  (integrations[i].vendor === 'Paypal' ? 'images/paypal.png' : ''))} alt="group_87" height="50" id="${integrations[i]._id}" vendor="${integrations[i].vendor}" service="${integrations[i].service}">
    //         <div class="mailchimp_contant" id="${integrations[i]._id}" vendor="${integrations[i].vendor}" service="${integrations[i].service}">
    //             <span class="maichimp_suername_title" id="${integrations[i]._id}" vendor="${integrations[i].vendor}" service="${integrations[i].service}">${integrations[i].vendor}: </span><span class="mailchimp_username" id="${integrations[i]._id}" vendor="${integrations[i].vendor}" service="${integrations[i].service}">${integrations[i].nickname}</span><br>
    //             <span class="integrated_date" id="${integrations[i]._id}" vendor="${integrations[i].vendor}" service="${integrations[i].service}">Integrated: ${ integrations[i].createdAt.replace(/T/, ' ').split(' ')[0]}</span><br>
    //             <span class="integrated_status" id="${integrations[i]._id}" vendor="${integrations[i].vendor}" service="${integrations[i].service}">Status: <img src="/images/Ellipse 23.svg"> ${integrations[i].status === true ? 'Connected' : 'Disconnected'}</span>
    //         </div>

    //     </div>
    // </div>
    //                             `
    //                     $(html).insertBefore('.add_payment_integrations_container');
    //                 }


    //                 $('.updatePaymentIntegration').on('click', (e) => {
    //                     let integrationId = e.target.getAttribute('id');
    //                     let vendor = e.target.getAttribute('vendor');
    //                     let service = e.target.getAttribute('service');
    //                     // console.log(integrationId);
    //                     // console.log(vendor)
    //                     // console.log(service);

    //                     $('#apiKeyModal').modal('show');


    //                     $('#apiKeyModal .modal-content .modal-header .modal-title').html((vendor === 'Stripe' ? 'Stripe Integration': (vendor === 'Paypal' ? 'Paypal Integration': '')));

    //                     $('#apiKeyModal .modal-content .modal-body').html("<div>Loading....</div>");


    //                     $.ajax({
    //                         type: "POST",
    //                         url: '/get-payment-integration',
    //                         data: {id: integrationId, vendor: vendor, service: service},
    //                         success: function (data) {
    //                             const integration = data.data;
    //                             console.log(integration);
    //                             openupdateIntegrationModal(integration);
    //                         },
    //                         error: function (data) {
    //                             let header = '<span class="text-danger">Falied</span>';
    //                             toast(header, data.responseJSON.error);
    //                         }
    //                     });

    //                 })
    // }




    // function removeIntegration(id, service) {
    //     $('#apiKeyModal').modal('hide');
    //     let data = { id, service };
    //     // console.log(data);
    //     $.ajax({
    //         type: "POST",
    //         url: '/remove-payment-integrations',
    //         data: data,
    //         success: function (data) {
    //             // console.log(data)
    //             let header = '<span class="text-success">Success</span>'
    //             toast(header, data.msg);
    //             GetIntegrations({ service: 'Payment' });

    //             // Swal.fire(
    //             //     'Deleted!',
    //             //     'Your file has been deleted.',
    //             //     'success'
    //             // )
    //         },
    //         error: function (data) {
    //             let header = '<span class="text-danger">Falied</span>';
    //             toast(header, data.responseJSON.error);
    //         }
    //     });
    // }




    //     function GetIntegrations(data) {
    //         // console.log(data)

    //         const service = data.service;

    //         $('.user_payment_integrations_list').html('loading....');

    //         $.ajax({
    //             type: "POST",
    //             url: '/get-payment-integrations',
    //             data: data,
    //             success: function (data) {

    //                 const integrations = data.data;
    //                 console.log(integrations)
    //                 paymentIntegrations(integrations);


    //             },
    //             error: function (data) {
    //                 console.log(data);
    //             }
    //         });
    //     }

    //     function showIntegrations() {
    //         $('.payment_integrations-container').show();
    //         $('.payment_integrations_list').hide();
    //     }


    //     $('.back-payment-intergations').on('click', () => {
    //         showIntegrations()
    //     });

    //     $('.nav-payment').on('click', () => {

    //         GetIntegrations({ service: 'Payment' });
    //         showIntegrations();
    //     });

    //     function sendIntegration(data) {
    //         $('#apiKeyModal').modal('hide');

    //         console.log(data);
    //         $.ajax({
    //             type: "POST",
    //             url: '/payment-integrations',
    //             data: data,
    //             success: function (data) {
    //                 let header = '<span class="text-success">Success</span>'
    //                 toast(header, data.msg);
    //                 GetIntegrations({ service: 'Payment' });
    //                 showIntegrations();


    //             },
    //             error: function (data) {
    //                 let header = '<span class="text-danger">Falied</span>';
    //                 toast(header, data.responseJSON.error);

    //                 $('#apiKeyModal').modal('hide');
    //                 showIntegrations();
    //             }
    //         });
    //     }

    //     function toast(header, msg) {
    //         $('.toast .toast-header .header').html(header);
    //         $('.toast .toast-body').html(msg);
    //         $('.toast').toast('show');
    //     }



    //     $('.integrations_stripe').on('click', () => {
    //         let stripeHeader = 'Stripe Integartion'

    //         let stripeform = `
    //                 <form id="paymentIntegrationForm">
    //                     <div class="form-group">
    //                         <label for="intergation-nickname">Integration Nickname</label>
    //                         <input type="text" class="form-control" id="intergation-nickname" name="intergation-nickname" placeholder="Nickname" required> 
    //                     </div>
    //                     <div class="form-group">
    //                         <label for="intergation-secret-key">Integration Secret Key</label> 
    //                         <input type="text" class="form-control" id="intergation-secret-key" name="intergation-secret-key"  placeholder="Secret Key" required> 
    //                     </div>
    //                     <div class="form-group">
    //                         <label for="intergation-api_key">Integration Api Key</label> 
    //                         <input type="text" class="form-control" id="intergation-api-key" name="intergation-api-key"  placeholder="Api Key" required> 
    //                     </div>
    //                     <button type="submit" class="btn btn-success stripe-integrate-button">Integrate</button>
    //                 </form>
    //             `
    //         $('#apiKeyModal .modal-content .modal-header .modal-title').html(stripeHeader);

    //         $('#apiKeyModal .modal-content .modal-body').html(stripeform);


    //         $('#paymentIntegrationForm').on('submit', (e) => {
    //             e.preventDefault();

    //             $('.stripe-integrate-button').attr('disabled', true);

    //             const stripeData = {
    //                 "nickname": e.target[0].value,
    //                 "vendor": "Stripe",
    //                 "service": "Payment",
    //                 "secret": e.target[1].value,
    //                 "api": e.target[2].value
    //             }

    //             sendIntegration(stripeData)
    //         })
    //     })

    //     $('.integrations_paypal').on('click', () => {
    //         let paypalHeader = 'Paypal Integartion'
    //         let environment = 'Sandbox';
    //         let paypalform = `
    //                 <form id="paymentIntegrationForm">
    //                     <div class="form-group">
    //                         <label for="intergation-nickname">Integration Nickname</label>
    //                         <input type="text" class="form-control" id="intergation-nickname" name="intergation-nickname" placeholder="Nickname" required> 
    //                     </div>
    //                     <div class="form-group">
    //                         <label for="intergation-merchant-id">Integration Merchant Id</label> 
    //                         <input type="text" class="form-control" id="intergation-merchant-id" name="intergation-merchant-id"  placeholder="Merchant Id" required> 
    //                     </div>
    //                     <div class="form-group">
    //                         <label for="intergation-private-key">Integration Private Key</label> 
    //                         <input type="text" class="form-control" id="intergation-private-key" name="intergation-private-key"  placeholder="Private Key" required> 
    //                     </div>
    //                     <div class="form-group">
    //                         <label for="intergation-public-key">Integration Public Key</label> 
    //                         <input type="text" class="form-control" id="intergation-public-key" name="intergation-public-key"  placeholder="Public Key" required> 
    //                     </div>
    //                     <div class="custom-control custom-switch mb-2">
    //                         <input type="checkbox" class="custom-control-input" id="environment" >
    //                         <label class="custom-control-label environment-label" for="environment"></label>
    //                     </div>
    //                     <button type="submit" class="btn btn-success mail-chimp-integrate-button">Integrate</button>
    //                 </form>
    //             `
    //         $('#apiKeyModal .modal-content .modal-header .modal-title').html(paypalHeader);

    //         $('#apiKeyModal .modal-content .modal-body').html(paypalform);

    //         if(environment === 'Sandbox') {
    //             $('#environment').attr('checked',false);
    //             $('.environment-label').text('Sandbox');
    //         } else {
    //             $('#environment').attr('checked',true);
    //             $('.environment-label').text('Production');
    //         }


    //         $('#environment').on('change', (e) => {
    //             if(e.target.checked === true) {
    //                 $('.environment-label').text('Production');
    //             } else {
    //                 $('.environment-label').text('Sandbox');
    //             }
    //         })


    //         $('#paymentIntegrationForm').on('submit', (e) => {
    //             e.preventDefault();

    //             $('.mail-chimp-integrate-button').attr('disabled', true);

    //             const paypalData = {
    //                 "nickname": e.target[0].value,
    //                 "vendor": "Paypal",
    //                 "service": "Payment",
    //                 "merchantId": e.target[1].value,
    //                 "secret": e.target[2].value,
    //                 "api": e.target[3].value,
    //                 "environment": e.target[4].checked
    //             }

    //             sendIntegration(paypalData)
    //         })
    //     })
})

