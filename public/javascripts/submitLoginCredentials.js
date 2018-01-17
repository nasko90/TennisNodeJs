
$("#submitLogin").click(function() {
    var password = $("#password").val();
    var username = $("#username").val();

   
        var credentials = {
            username: username,
            password: password
        }
       

    $.ajax({
        type: "POST",
        url: "login/loginAttempt",
        data: credentials,
        datatype: 'json',
        success: function (result) {
            console.log(result);
            if(result.status === 200){
               window.location = result.redirect;
            } else{
                $("#password").val("");
                $("#username").val("");
            }
        }
});
})
