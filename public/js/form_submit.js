
jQuery(() => {

   
    $('a[filler="SUBMIT FORM"]').on('click', () => {
        let email = $('input[filler="email"]').val();


        if(!$("input").filter(function () {
            return $.trim($(this).val()).length == 0
        }).length == 0 ) {
            return alert('Please fill All INputs Fields');
        }

        let pageEmailIntegration = JSON.parse(localStorage.getItem('pageEmailIntegration'));
        console.log(pageEmailIntegration);

        if (pageEmailIntegration) {
            addToMailChimpList({
                api: pageEmailIntegration.integrationId.api,
                list: pageEmailIntegration.integrationId.list,
                email: email
            })
        }
        
    })


    function addToMailChimpList(data) {
        $.ajax({
            type: "POST",
            url: '/add-mailchimp-member',
            data: data,
            success: function (data) {
                console.log(data)
            },
            error: function (data) {
                let errorMessage = 'Unknown Error Occured';

                let error = (data.responseJSON)
                console.log(error)
                switch (error.error) {
                    case 'EXISTS': 
                        errorMessage = error.msg;
                        break;
                    case 'INTERNAL_SERVER':
                        errorMessage = error.msg
                        break;
                    
                }

                alert(errorMessage)
            }
        });
    }

})