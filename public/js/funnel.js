let path = '';

function modelFunnelName(e) {
  
  path = e.dataset.path;

  $('#exampleModal1').modal('show');
}

async function saveFunnelName() {
  try {
    const formData = new FormData();
    const name = document.getElementById('exampleInputText1').value;
    if (name === '') {
      $('#rx3').text('please enter somthing');
      $('#rx2').show();
      return false;
    }
    formData.append('name', name);
    formData.append('tempId', path);
    $('#rx1').show();
    $.ajax({
      url: '/add-name',
      type: 'POST',

      data: {
        name,
        tempId: path,
      },
      success: function (response) {
        console.log(response)
          window.location.href = `/funnel_home/${response.id}?stepid=${response.stepid}`;
          $('#rx2').hide();
          $('#rx1').hide();
      },
      error: function (err) {
       console.log(err)
        $('#rx1').hide();
        $('#rx3').text(err.responseJSON.msg);
        $('#rx2').show();
      },
    });
  } catch (err) {
    console.log(err);
  }
}

$('#exampleModal1').on('hidden.bs.modal', function (e) {
  $('#rx2').hide();
  document.getElementById('exampleInputText1').value = '';
});
