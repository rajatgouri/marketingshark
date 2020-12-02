 function logout() {
     fetch("/logout", {
         method: 'post'
     })
 }