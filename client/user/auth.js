$(document).ready(function(){
	$.extend(WorkoutLog, {
		//signup method
		signup: function() {
			var username = $("#su_username").val();
			var password = $("#su_password").val();

			var user = {
				user: {
					username: username,
					password: password
				}
			};
			//signup post
			var signup = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify(user),
				contentType: "application/json"
			});
			signup.done(function(data){
				if(data.sessionToken) {
					WorkoutLog.setAuthHeader(data.sessionToken);
					console.log("You made it!");
					console.log(data.sessionToken);
				}
				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");

			}).fail(function(){
				$("su_error").text("There was an issue with sign up").show();
			})
			//signup done/fail
		},

		//login method
		login: function() {
			//login variables
			var username = $("#li_username").val();
			var password = $("#li_password").val();
			var user = {
				user: {
					username: username,
					password: password
				}
			};
			//login POST
			var login = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "login",
				data: JSON.stringify(user),
				contentType: "application/json"
			});
			login.done(function(data){

				if(data.sessionToken) {
					WorkoutLog.setAuthHeader(data.sessionToken);
				}
				$("#login-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");

			}).fail(function() {
				$("#li_error").text("There was an issue with sign up").show();
			});

			//login done/fail
		},

		//loginout method
		loginout: function() {
			if(window.localStorage.getItem("sessionToken")){
				window.localStorage.removeItem("sessionToken");
				$("#loginout").text("Login");
			}
			//TODO: on logout make sure stuff is disabled
		}
	});

	//bind events
	$("#signup").on("click", WorkoutLog.signup);
	$("#login").on("click", WorkoutLog.login);
	$("#loginout").on("click", WorkoutLog.loginout);

	if(window.localStorage.getItem("sessionToken")){
		$("#loginout").text("Logout");
	}
});