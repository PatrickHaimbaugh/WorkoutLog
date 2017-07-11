$(document).ready(function(){
	$.extend(WorkoutLog, {
		//signup method
		signup: function() {
			var username = $("$su_username").val();
			var password = $("$su_password").val();

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
				contentType: "appication/json"
			});
			signup.done(function(data){
				if(data.sessionToken) {
					WorkoutLog.setAuthHeader(data.sessionToken);
				}

				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");
				
			}).fail(function(){
				$("su_error").text("There was an issue with sign up").show();
			})
			//signup done/fail
		}

		//login method

		//loginout method

	});

	//bind events
	$("signup").on("click", WorkoutLog.signup);
});