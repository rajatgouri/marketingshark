
jQuery(() => {
    
    var id = '';
    var selectedEmailIntegration = '';
    var selectedEmailAction = '';
    var selectedEmailList = '';
    var selectedConfirmation = 'false';
    var apiKey = '';

    

    getEmailIntegrations();
    getEmailIntegrationsList();

    function getEmailIntegrationsList () {
        Controller
            .getIntegratedEmails()
            .then((lists) => {
                emails = lists.data;

                for (let i=0; i< emails.length; i++) {
                    let option = `<option id="opt-${i+1}"  value="${emails[i].vendor}">${emails[i].vendor} <img src="${emails[i].status ? '/images/Ellipse 23.svg': '/images/red.png' }"></option>`
                    $('.email-integrations').append(option)

                    if(!emails[i].status) {
                        $(`#opt-${i+1}`).attr('disabled', true)

                    }

                }

            })
            .catch(err => {
                console.log(err)
            })
    }

    $('.email-integration-header .connected-button .connected').hide();

    async function getEmailIntegrations() {
        let integrations = await Controller.getPageIntegartions({pageId: pageId, type: 'Email'});
        let integration = integrations.integration;

        if (integration) {
            let isValid = await Controller.checkEmailIntegration(integration.integrationId.integration);
            id = isValid.integration._id; 
            let emailLists =  await getMailChimpList(id);

            if (integration) {
                localStorage.setItem('pageEmailIntegration', JSON.stringify(integration));
                disabled(true);
                showConnected();

                $('.remove-email-integration').attr('id', pageId);
                    
                $('.email-integration-body .action-container').attr('hidden', false);
                $('.email-integration-body .list-container').attr('hidden',false);
                $('.email-integration-body .confirmation-container').attr('hidden', false);
    
                $('.email-integration-body .email-integrations').val(integration.integrationId.integration);
                $('.email-integration-body .email-action').val(integration.integrationId.action);
                
                if(emailLists) {
                    $('.email-integration-body .email-list').val(integration.integrationId.list);
                }

                $('.email-integration-body .send-confirm-list').val((integration.integrationId.confirmation).toString());
            }
        }        
    }
    
    function disabled(data) {
        
        $('.email-integration-body .email-integrations').attr('disabled', data);
        $('.email-integration-body .email-action').attr('disabled', data);
        $('.email-integration-body .email-list').attr('disabled',data);
        $('.email-integration-body .send-confirm-list').attr('disabled', data);
    }


    function changeDelault() {
        
        $('.email-integration-body .action-container').attr('hidden', true);
        $('.email-integration-body .list-container').attr('hidden',true);
        $('.email-integration-body .confirmation-container').attr('hidden', true);

        $('.email-action').val('null')
        $('.email-list').val('null')	
        
    }

    $('.email-integration-body .email-integrations').on('change', async function() {
        
        changeDelault();
        
        selectedEmailIntegration = $(this).val();
        if (selectedEmailIntegration === '' || null || undefined) {
            return
        }

        let isValid = await Controller.checkEmailIntegration(selectedEmailIntegration);

        if(!isValid) {
            $(this).val('null');
            return confirmation('Oops','Service Not Subscribed', 'Subscribe It').then((result) => {
                if (result.value === true) {
                    window.location.href = '/integration'
                }
            });
        }	

        id = isValid.integration._id; 
        apiKey = isValid.integration.api;

        $('.email-integration-body .action-container').attr('hidden', false);

        $('.email-action').on('change', function() {
            selectedEmailAction = $(this).val();
            onChangeAction(id, selectedEmailIntegration)
        })
    
    })

   
    async function onChangeAction(id, service) {

        if ( service === 'Mail Chimp') {
            getMailChimpList(id)
        }
    }	


   async function getMailChimpList(id) {
        let lists = await Controller.getMailchimpLists({'id': id});
            $('.email-integration-body .list-container').attr('hidden',false);

            if(!selectedEmailList) {
                $('.email-list').empty();
                $('.email-list').append('<option selected disabled value="null">Select List</option>')

                lists.list.forEach((list) => {
                    let mailchimpOption = '<option class="w-100 email-list-option" style="overflow: auto" value="' + list.id+ '">'+ list.name + '(' + list.stats.member_count  + ' Members)' + '</option>'
                
                    $('.email-list').append(mailchimpOption)

                })
                return true
            }
    }

    $('.email-integration-body .list-container .email-list').on('change', async function() {
        selectedEmailList = $(this).val();
        $('.email-integration-body .confirmation-container').attr('hidden', false);

    })

    $('.email-integration-body .confirmation-container .send-confirm-list').on('change', function () {
        selectedConfirmation = $(this).val();
        $('.email-integration-body .save-button-container').attr('hidden', false);
        $('.email-integration-body .save-email-integration-button').attr('hidden', false);
        $('.email-integration-body .save-email-integration-button').attr('disabled', false);
    })


    $('.save-email-integration-button').on('click', async function() {
        $(this).attr('disabled', true);
        $(this).text('loading...');

        let data = {};

        if (selectedEmailIntegration === 'Mail Chimp') {
            data = {
                'pageId': pageId,
                'integration': selectedEmailIntegration,
                'api': apiKey,
                'action': selectedEmailAction,
                'list': selectedEmailList,
                'confirmation': selectedConfirmation
            } 


            let isAdded =  await Controller.addPageEmailIntegration(data);

            if(isAdded) {
                success('Added','Mail Chimp Integration Added Successfully').then(() => {
                    $(this).attr('hidden', true);
                    $('.remove-email-integration').attr('hidden', false);
                    $('.remove-email-integration').attr('id', pageId);
                    
                    disabled(true);
                    showConnected();
                });

            } else {
                oops('Error in Intregrate Mail Chimp Integration').then(() => {
                    $(this).attr('disabled', false);
                    $(this).text('Save');
                })
                
            } 

        } 
    })


    $('.remove-email-integration').on('click', async function() {
        let pageId = $(this).attr('id');
        confirmation('Remove Integration?','Do you want to Remove this Integration?', 'Remove' )
            .then(async (result) => {
               if (result.value) {
                let isDeleted =  await Controller.removeIntegration({pageId: pageId, type: 'Email'})
    
                if(isDeleted) {
                    disabled(false);
                    localStorage.removeItem('pageEmailIntegration')
                    showDisconnected();
                    ResetForm();
                    changeDelault()
                } else {
                    oops('Error in Removing Integration');
                }
               }
                
            })
    
    })

    function ResetForm() {
        $('.email-integration-body .email-integrations').val("null");
        $('.email-integration-body .email-action').val("null");
        $('.email-integration-body .email-list').val("null");
        $('.email-integration-body .send-confirm-list').val("null");

        $('.email-integration-body .save-email-integration-button').attr('hidden', true);
        $('.email-integration-body .save-email-integration-button').text('Save');
    }
    


    function showDisconnected() {
        
        $('.email-integration-header .connected-button').addClass('btn-default');
        $('.email-integration-header .connected-button').removeClass('btn-success');

        $('.remove-email-integration').attr('hidden', true);

        $('.email-integration-header .connected-button .not-connected').show();
        $('.email-integration-header .connected-button .connected').hide();

    }


    function showConnected() {
        
        $('.email-integration-header .connected-button').removeClass('btn-default');
        $('.email-integration-header .connected-button').addClass('btn-success');

        $('.remove-email-integration').attr('hidden', false )

        $('.email-integration-header .connected-button .not-connected').hide();
        $('.email-integration-header .connected-button .connected').show();

    }
})