
(function($) {
    
    var namespace;
    
    namespace = {
        removeIntegration: function(id, service) {
            let url = ''
            let data = {id, service}


            if(service === 'Email') {
                url = '/remove-email-integrations' 
            } else if (service === 'Payment') {
                url=  '/remove-payment-integrations'
            }


            $.ajax({
                type: "POST",
                url: url,
                data: data,
                success: function (data) {
                    $('#apiKeyModal').modal('hide');
                    success('Deleted!', 'Your file has been deleted.').then(() => {
                        window.location.reload()

                    });
                },
                error: function (data) {
                    oops(data.responseJSON.error);
                }
            });
        },
        
        showIntegrations: function(service) {

            if(service === 'Email') {
                $('.email_integrations-container').show();
                $('.email_integrations_list').hide();
            } else if (service === 'Payment') {
                $('.payment_integrations-container').show();
                $('.payment_integrations_list').hide();
            }
            
        },
        status: function(integration) {

            if (integration.status === true) {
                $('#status').attr('checked', true);
                $('.status-label').text('Connected');
            } else {
                $('#status').attr('checked', false);
                $('.status-label').text('Disconnected');
            }
    
            $('#status').on('change', (e) => {
                if (e.target.checked === true) {
                    $('.status-label').text('Connected');
                } else {
                    $('.status-label').text('Disconnected');
                }
            })
        },
        updateIntegration: function(data, service) {
            let url = ''
            if(service === 'Email') {
                url = '/update-email-integration'
            } else if (service === 'Payment') {
                url = '/update-payment-integration'
            }
            
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                success: function (data) {
                    $('#apiKeyModal').modal('hide');
                    window.location.reload();
                },
                error: function (data) {
                    $('.modal-update-button').attr('disabled', false);
                    $('.modal-update-button').text('Update');
                    oops(data.responseJSON.error)
                }
            });
        },
        sendIntegration : function(data, service) {
            url = ''
            if(service === 'Email') {
                url = '/email-integrations'
            } else if(service === 'Payment') {
                url = '/payment-integrations'
            }

            $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (data) {
                $('#apiKeyModal').modal('hide');
                window.location.reload();
                success('Success!', `${data.vendor} is Integrated successfully!`)
            },
            error: function (data) {
                $('.integrate-button').attr('disabled', false);
                $('.integrate-button').text('Integrate');

                oops(data.responseJSON.error);
                ns.showIntegrations();
            }
            });
        },
        
    };
    
    window.ns = namespace;
    
})(this.jQuery);


