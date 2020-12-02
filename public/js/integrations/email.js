jQuery(() => {


    function removeIntegration(id, service) {
        ns.removeIntegration(id, service)
    }

    function sendIntegration(data) {
        ns.sendIntegration(data, 'Email')
    }

    function showIntegrations () {
        ns.showIntegrations('Email')
    }

    function updateIntegrations(data) {
        ns.updateIntegration(data, 'Email')
    }

    $('.email_integrations-container .add_integrations').on('click', () => {
        $('.email_integrations-container').hide();
        $('.email_integrations_list').show();
    });

    $('.back-email-intergations').on('click', () => {
        showIntegrations()
    });

    function modalInner(integration) {

        if (integration.vendor === 'Mail Chimp') {
            var header = 'Mail Chimp Integartion'

            var body = `
                <form id="EmailIntegrationForm">
                    ${inputs.nickname(integration.nickname)}
                    ${inputs.mailChimp.instance(integration.instance)}
                    ${inputs.mailChimp.api(integration.api)}
                    ${inputs.status()}
                    ${inputs.updateButton()}
                    ${inputs.removeButton(integration._id)}
                </form>
                `
            return { header, body }
        } else {
            var header = 'Send LaneIntegartion'

            var body = `
                <form id="EmailIntegrationForm">
                    <div class="form-group">
                        <label for="intergation-nickname">Integration Nickname</label>
                        <input type="text" class="form-control" id="intergation-nickname" name="intergation-nickname" value="${integration.nickname}" required> 
                    </div>
                    <div class="form-group">
                        <label for="intergation-domain-name">Integration Domain</label> 
                        <input type="text" class="form-control" id="intergation-domain" name="intergation-domain" value="${integration.domain}" required> 
                    </div>
                    <div class="form-group">
                        <label for="intergation-hash-key">Integration Hash Key</label> 
                        <input type="text" class="form-control" id="intergation-hash-key" name="intergation-hash-key" value="${integration.hash}" required> 
                    </div>
                    <div class="form-group">
                        <label for="intergation-api_key">Integration Api Key</label> 
                        <input type="text" class="form-control" id="intergation-api-key" name="intergation-api-key" value="${integration.api}" required> 
                    </div>
                    <div class="custom-control custom-switch mb-2">
                        <input type="checkbox" class="custom-control-input" id="status" >
                        <label class="custom-control-label status-label" for="status"></label>
                    </div>
                    <button type="submit" class="btn btn-success modal-update-button">Update</button>
                    <button type="button" class="btn btn-danger removeEmailIntegration" id="${integration._id}">Remove</button>

                </form>
                `
            return { header, body }
        }
    }


    async function openupdateIntegrationModal(integration) {
        const modalContent = await modalInner(integration);

        $('#apiKeyModal .modal-content .modal-header .modal-title').html(modalContent.header);
        $('#apiKeyModal .modal-content .modal-body').html(modalContent.body);

        ns.status(integration);

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
                        removeIntegration(integrationId, 'Email')
                    }
                })
        });

        $('#EmailIntegrationForm').on('submit', (e) => {

            e.preventDefault();
            $('.modal-update-button').attr('disabled', true);
            $('.modal-update-button').text('Loading...');

            var data = {};
            if (integration.vendor === 'Mail Chimp') {
                data = {
                    "id": integration._id,
                    "nickname": e.target[0].value,
                    "vendor": integration.vendor,
                    "service": "Email",
                    "instance": e.target[1].value,
                    "api": e.target[2].value,
                    "status": e.target[3].checked
                }
            } else if (integration.vendor === 'Send Lane') {
                data = {
                    "id": integration._id,
                    "nickname": e.target[0].value,
                    "vendor": integration.vendor,
                    "service": "Email",
                    "domain": e.target[1].value,
                    "hash": e.target[2].value,
                    "api": e.target[3].value,
                    "status": e.target[4].checked
                }
            }

            updateIntegrations(data)

        })

    }


    $('.email-integrations').click(function() {
            
        let integrationId = $(this)[0].getAttribute('id');
        let vendor = $(this)[0].getAttribute('vendor');

        $('#apiKeyModal').modal('show');
        $('#apiKeyModal .modal-content .modal-header .modal-title').html(`${vendor} Integrations`);
        $('#apiKeyModal .modal-content .modal-body').html("<div>Loading....</div>");

        $.ajax({
            type: "POST",
            url: '/get-email-integration',
            data: {id: integrationId, vendor: vendor},
            success: function (data) {
                const integration = data.data;
                openupdateIntegrationModal(integration);
            },
            error: function (data) {
                oops(data.responseJSON.error)
            }
        });
    })


    $('.integrations_mail_chimp').on('click', () => {
        let mailChimpHeader = 'Mail Chimp Integartion'

        let mailChimpform = `
            <form id="mailChimpIntegrationForm">
                ${inputs.nickname('')}
                ${inputs.mailChimp.instance('')}
                ${inputs.mailChimp.api('')}                
                ${inputs.integrateButton()}    
            </form>
        `

        $('#apiKeyModal .modal-content .modal-header .modal-title').html(mailChimpHeader);
        $('#apiKeyModal .modal-content .modal-body').html(mailChimpform);


        $('#mailChimpIntegrationForm').on('submit', (e) => {
            e.preventDefault();

            $('.integrate-button').attr('disabled', true);
            $('.integrate-button').text('Loading...');

            const mailChimpData = {
                "nickname": e.target[0].value,
                "vendor": "Mail Chimp",
                "image": "/images/Mailchimp_1.svg",
                "service": "Email",
                "instance": e.target[1].value,
                "api": e.target[2].value,
            }

            sendIntegration(mailChimpData)
        })
    })

    $('.email-integrations').click(function () {

        let integrationId = $(this)[0].getAttribute('id');
        let vendor = $(this)[0].getAttribute('vendor');

        $('#apiKeyModal').modal('show');
        $('#apiKeyModal .modal-content .modal-header .modal-title').html((vendor === 'Mail Chimp' ? 'Mail Chim Integrations' : 'Send Lane Integrations'));
        $('#apiKeyModal .modal-content .modal-body').html("<div>Loading....</div>");

        $.ajax({
            type: "POST",
            url: '/get-email-integration',
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

    $('.integrations_sendlane').on('click', () => {
    let sendLaneHeader = 'Send Lane Integartion'

    let sendLaneform = `
            <form id="sendLaneIntegrationForm">
                <div class="form-group">
                    <label for="intergation-nickname">Integration Nickname</label>
                    <input type="text" class="form-control" id="intergation-nickname" name="intergation-nickname" placeholder="Nickname" required> 
                </div>
                <div class="form-group">
                    <label for="intergation-sub_domain">Integration Sub Domain</label> 
                    <input type="text" class="form-control" id="intergation-sub_domain" name="intergation-sub_domain" placeholder="eg: www.domain.com" required > 
                </div>
                <span class="small text-danger domain-error"></span>
                <div class="form-group">
                    <label for="intergation-hash_key">Integration Hash Key</label> 
                    <input type="text" class="form-control" id="intergation-hash-key" name="intergation-hash-key" placeholder="eg: 446466775757" required> 
                </div>
                <div class="form-group">
                    <label for=apiKeyintergation-api_key">Integration Api Key</label> 
                    <input type="text" class="form-control" id="intergation-api-key" name="intergation-api-key" placeholder="eg: 652c************************3be4-us17" required> 
                </div>
                <button type="submit" class="btn btn-success integrate-button">Integrate</button>
            </form>
        `
    $('#apiKeyModal .modal-content .modal-header .modal-title').html(sendLaneHeader);

    $('#apiKeyModal .modal-content .modal-body').html(sendLaneform);

    $('#intergation-sub_domain').on('keyup', (e) => {
        let domain = e.target.value;
        var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
        let isDomain = domain.match(re);
        
        if(isDomain === null) {
            $('.domain-error').text('Invalid Domain');
            $('.integrate-button').attr('disabled', true);
        } else {
            $('.domain-error').text('');
            $('.integrate-button').attr('disabled', false);

        }
    })

    $('#sendLaneIntegrationForm').on('submit', (e) => {
        e.preventDefault();

        $('.integrate-button').attr('disabled', true);

        const sendLaneData = {
            "nickname": e.target[0].value,
            "vendor": "Send Lane",
            "service": "Email",
            "domain": e.target[1].value,
            "hash": e.target[2].value,
            "api": e.target[3].value
        }

        sendIntegration(sendLaneData)
    })
})
})