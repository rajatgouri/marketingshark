
(function($) {
    
    var inputs;
    
    inputs = {

        nickname: function (value) {
           return  `
            <div class="form-group">
                <label for="intergation-nickname">Nickname</label>
                <input type="text" class="form-control" id="intergation-nickname" name="intergation-nickname" placeholder="Nickname" value="${value}" required> 
            </div>
            `
        }
           
        ,
        integrateButton: function () {
            return  `
            <button type="submit" class="btn btn-success integrate-button">Integrate</button>
            `
        }
        ,
        removeButton : function (id) {
            return `
                <button type="button" class="btn btn-danger removeEmailIntegration" id="${id}">Remove</button>

            `
        },
        updateButton:  function () {
            return `
            <button type="submit" class="btn btn-success modal-update-button">Update</button>
            `
        }
            
        ,
        status: function() {
            return `
            <div class="custom-control custom-switch mb-2">
                <input type="checkbox" class="custom-control-input" id="status" >
                <label class="custom-control-label status-label" for="status"></label>
            </div>
            `
        } 
                
        ,
        mailChimp: {
            instance: function (value) {
                return   `
                <div class="form-group">
                    <label for="instance">Mail Chimp Instance</label> 
                    <input type="text" class="form-control" id="instance" name="instance" pattern="(us)[1-9]{1}([0-9])?$" title="Invalid Instance" placeholder="Instance"  value="${value}" required> 
                </div>
                `
            }
                
            ,
            api: function (value) {
                return  `
                <div class="form-group">
                    <label for="apiKey">Api Key</label> 
                    <input type="text" class="form-control" id="apiKey" name="apiKey" pattern="^[0-9a-z]{32}(-us)[1-9]{1}([0-9])?$" title="Invalid APi Key" placeholder="Api Key" value="${value}" required> 
                </div>
                `
            }   
        },
        paypal: {
            secret: function (value) {
                return  `
                <div class="form-group">
                    <label for="apiKey">Secret Key</label> 
                    <input type="text" class="form-control" id="apiKey" name="apiKey"  title="Invalid Secret Key" placeholder="Secret Key" value="${value}" required> 
                </div>
                `
            },
            clientId: function (value) {
                return `
                <div class="form-group">
                    <label for="cLientId">Client Id</label> 
                    <input type="text" class="form-control" id="cLientId" name="cLientId"  title="Invalid Client Id" placeholder="Client Id" value="${value}" required> 
                </div>
                `
            }
        },
        stripe: {
            
            api: function (value) {
                return  `
                <div class="form-group">
                    <label for="apiKey">Secret Key</label> 
                    <input type="text" class="form-control" id="apiKey" name="apiKey"  title="Invalid Secret Key" placeholder="Secret Key" value="${value}" required> 
                </div>
                `
            }   
        }
        
    };
    
    window.inputs = inputs;
    
})(this.jQuery);


