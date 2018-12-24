$(document).ready(function() {
$('#submit').on('click', function(){
  event.preventDefault()
var userInput = {
  username: $("#username").val(),
  password: $("#password").val()
}
$.ajax({method: 'POST', url: "api/users", data: userInput})
.then(function(res){
  if (res.status === 301){
    window.location.href=window.location.origin+"/dashboard"
  }
  
console.log(res);
})

})

});  