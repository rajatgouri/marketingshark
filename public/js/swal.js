function oops(msg) {
    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:  msg,
    })
}


function success (title, msg) {
    return Swal.fire(
        title, msg, 'success'
    )
}

function confirmation(title, text, confirmButtonText) {
    return Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText
    })
}
