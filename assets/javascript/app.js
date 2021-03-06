$(document).ready(function () {

var topicsObject = {
	change1 : {
		youtubeID : "GBz-pwTyxtA",
		quoteID : "change",
		challenge : "Go to the grocery store and buy a food you've never eaten. Prepare and try it at home."
	},
	change2 : {
		youtubeID : "5iqqLLefHsc",
		quoteID : "learning",
		challenge : "Choose a new town or area of your town to explore. Don't overplan it. Instead, go and walk around. Embrace being in an unfamiliar environment."
	},
	change3 : {
		youtubeID : "jpA41I_Jc_4",
		quoteID : "inspire",
		challenge : "Rearrange your living space. Get rid of clutter and open up the space to welcome new beginnings."
	},
	change4 : {
		youtubeID : "267cB6tNeUc",
		quoteID : "aspire",
		challenge : "Enroll in a local class to learn something completely new."
	},
	embarr1 : {
		youtubeID : "RFjN_SM7ijc",
		quoteID : "courage",
		challenge : "Engage totally with the first thing that comes to mind when it comes to embarrasement. Laugh at yourself."
	},
	embarr2 : {
		youtubeID : "9MW1OWcb39M",
		quoteID : "importance",
		challenge : "Go into today promising youself not to say sorry. If you catch yourself, be aware of it. Ask yourself whether you said it out of habit."
	},
	embarr3 : {
		youtubeID : "9gIy8tShxTw",
		quoteID : "fierce",
		challenge : "Go out into the world and wear something that makes you slightly uncomfortable. Have a shirt hiding in your closet that you don't want the world to see you in? Wear that."
	},
	embarr4 : {
		youtubeID : "o268qbb_0BM",
		quoteID : "challenge",
		challenge : "Sit or stand by yourself for several minutes today and make goofy movements with your arms. Get in the practice of letting out your inner child."
	},
	fail1 : {
		youtubeID : "odcLP7gOGW8",
		quoteID : "failure",
		challenge : "Look back to a time in your life in which you felt like a failure. Write down the ways you thought you failer. Compare those fears to the fears you current have."
	},
	fail2 : {
		youtubeID : "DeB-AkTH8YQ",
		quoteID : "fail", 
		challenge : "Keep track of how many times you talk down to yourself today. When the day is done, write down just as many positive things about yourself."
	},
	fail3 : {
		youtubeID : "oN8-Np8zLfw",
		quoteID : "hard", 
		challenge : "Do something that you are nearly guaranteed to fail. Go in knowing and understanding that you will fail. Be comfortable in the failure."
	},
	fail4 : {
		youtubeID : "bjzITnc7PCE",
		quoteID : "success", 
		challenge : "Talk to someone you admire about a failure you went through. Relate to them what you learned. If you don't know who to talk to, you can talk out loud to yourself."
	},
	reject1 : {
		youtubeID : "dsT5eV_m7BA",
		quoteID : "rejection",
		challenge : "Use a payment method at a grocery store that you know will not be enough to cover the bill. Or simply tell the cashier that you cannot cover the bill, even if you can. Live in the moment and embrace the rejection."
	},
	reject2 : {
		youtubeID : "5lE-tbb-R_A",
		quoteID : "reject", 
		challenge : "Approach someone who seems intimidating to you. Strike up small talk and hold a conversation for as long as you want. Then move on and continue your day."
	},
	reject3 : {
		youtubeID : "qjhf0lBHFHY",
		quoteID : "winning",
		challenge : "Ask for something at a restaurant or store that you know they don't carry or offer. Be in the moment and thank them when you get rejected or when they offer an alternative item."
	},
	reject4 : {
		youtubeID : "mQMDrSxYXjo",
		quoteID : "win",
		challenge : "Ask for a stranger's phone number, whether it's meant to form a friendship, business alliance, or romantic relationship. Feel good that you did something for yourself, regardless of the outcome."
	},
}

//hide youtube and quote div
$("#individualTopic").addClass("hide");

$(".completeBtn").on("click", function(){
	$("#individualTopic").addClass("hide");

	var selectedTopic = $(this).attr("data-selected-id");

	$("body").find(`#${selectedTopic}`).addClass("opacity");

	var numberOfOpacityButtons = $("body").find(".topicButton.opacity").length;

	var percentage = (numberOfOpacityButtons/4) * 100;

	$("body").find(".progress-bar").css("width", percentage + "%");

});

//when a user clicks on a specific card button, the youtube div will appear with the relevant information
$("body").on("click", ".topicButton", function(event){

	//prevent button submit 
	event.preventDefault();

	//if task is already completed, don't show the youtube div again
	if ($(this).hasClass("opacity")) {
		return false;
	}

	//show youtube and quote div
	$("#individualTopic").removeClass("hide");

	var selectedTopic = $(this).attr("id");

	//run function to populate API information
	displaySelectedTopic(selectedTopic);

	$(".completeBtn").attr("data-selected-id", selectedTopic);

});

function displaySelectedTopic(selectedTopic) {

	//YouTube API
	var youTubeQuery = "https://www.googleapis.com/youtube/v3/videos?&key=AIzaSyBhzdPv4V5fpngnYlWdq4cYnLpj-gZV2Zo&part=player&id="

	var currentYTTopic = topicsObject[selectedTopic].youtubeID;

	$.ajax({
		url: youTubeQuery + currentYTTopic,
		method: 'GET'
	}).then(function(response) {

		$(".youtubeDIV").html("<iframe max-width='480' max-height='270' src='https://www.youtube.com/embed/" + response.items["0"].id + "' frameborder='0'></iframe>")
	});

	//quote API
	var queryURL = "http://quotes.rest/quote/search.json?api_key=_fL6rv9zmtRHXacNHMTESweF&category=";

	var currentQuoteTopic = topicsObject[selectedTopic].quoteID;

	$.ajax({
		url: queryURL + currentQuoteTopic,
		method: 'GET',
	}).then(function (response) {

		//create variables that contain the data we want to add to the page.
		var quote = response.contents.quote;
		var author = response.contents.author;

		if (author === null) {
			author = "";
		}

		//add the quote to the page
		$(".quoteDIV").html(quote + "<br>" + author)
	});

	var challenge = topicsObject[selectedTopic].challenge;

	$(".challengeDIV").text(challenge);
	
};


$("#logInButton").on("click", function() {

	var email = $("#modalLRInput10").val();
	filter = /\S+@\S+\.\S+/;
	if (filter.test(email)) {
  		window.location.href = "topics.html";
	}
	else{
		return false;
	}
});

// dynamically populate the cards on the topics page
$("#dropdown #changeDropdown").on("click", function(){

	$("#allTopics #topicsRow").empty();
	var idChange = ["change1", "change2", "change3", "change4"];
	var titleChange = ["Change is Inevitable", "Change is Healthy", "Change is Normal", "Nothing is Stagnant"];
	var summaryChange = ["It's inevitable that change is going to happen in your life. All life is change.", "Change is healthy because it means that things are moving forward, even if it doesn't appear that way at face value.", "It's normal for things to change. People grow, situations change, and life goes on. Embrace the movement.", "Nothing remains the same. Stagnation can only indicate that there is no growth. Without growth, we cannot move forward."];

	for (var i=0; i < idChange.length; i++) {

		$("#allTopics #topicsRow").append("<div class='col-md-3'><div id='cardstyle' class='card card-cascade narrower'><div class='view overlay'><a><div class='mask rgba-white-slight'></div></a></div><div class='card-body'><h4 class='white-text' id='underline'>" + titleChange[i] + "</h4><h4 class='card-title'></h4><p  class='white-text'>" + summaryChange[i] + "</p><a class='btn topicButton' id=" + idChange[i] + ">Open</a></div></div>");

	}

	$("#allTopics #topicsRow").append("<div class='col-md-12'><div><h2 id='progress'>Progress:</h2></div><div class='progress'><div id='changeBar' class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='75' aria-valuemin='0' aria-valuemax='100'></div></div></div>");

});

$("#dropdown #embarrDropdown").on("click", function(){

	$("#allTopics #topicsRow").empty();
	var idChange = ["embarr1", "embarr2", "embarr3", "embarr4"];
	var titleChange = ["Embarrassement Happens", "Embarrassement Makes You Better", "Embarrassement Helps You Grow", "How Are You Affected?"];
	var summaryChange = ["It's okay to be embarrassed but it cannot be a primary emotion in your life in order for you to move forward.", "When you feel embarrassed, it means that you are living in the moment. Be aware that this is a good sign that you actively participating in life.", "You grow when you recognize your emotions. Understand why you feel embarrassed by particular situations, and own it.", "Find what triggers your feelings of embarrassement and keep those things in mind when you enter unfamiliar situations."];

	for (var i=0; i < idChange.length; i++) {

		$("#allTopics #topicsRow").append("<div class='col-md-3'><div id='cardstyle' class='card card-cascade narrower'><div class='view overlay'><a><div class='mask rgba-white-slight'></div></a></div><div class='card-body'><h4 class='white-text' id='underline'>" + titleChange[i] + "</h4><h4 class='card-title'></h4><p class='white-text'>" + summaryChange[i] + "</p><a class='btn topicButton' id=" + idChange[i] + ">Open</a></div></div>");

	}

	$("#allTopics #topicsRow").append("<div class='col-md-12'><div><h2 id='progress'>Progress:</h2></div><div class='progress'><div id='embarrBar' class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='75' aria-valuemin='0' aria-valuemax='100'></div></div></div>");
});

$("#dropdown #failDropdown").on("click", function(){

	$("#allTopics #topicsRow").empty();
	var idChange = ["fail1", "fail2", "fail3", "fail4"];
	var titleChange = ["Failure is Part of Life", "If You Fail, Try Again", "Failure Can't Stop You", "Fearing Failure is Not Helpful"];
	var summaryChange = ["Part of being a human on this earth is confront failure. You're not unique if you have failed. This has happened to all of us.", "When you fail, be happy that you can start over and try again. There is no reason for giving up. Use it as fuel to move forward.", "Failure does not mean that something will never work. It only means that something did not work one time you tried it.", "When you fear failure, you do not move forward. Embrace failure and you will not be afriad to try and continue towards your goals."];

	for (var i=0; i < idChange.length; i++) {

		$("#allTopics #topicsRow").append("<div class='col-md-3'><div id='cardstyle' class='card card-cascade narrower'><div class='view overlay'><a><div class='mask rgba-white-slight'></div></a></div><div class='card-body'><h4 class='white-text' id='underline'>" + titleChange[i] + "</h4><h4 class='card-title'></h4><p class='white-text'>" + summaryChange[i] + "</p><a class='btn topicButton' id=" + idChange[i] + ">Open</a></div></div>");

	}
	$("#allTopics #topicsRow").append("<div class='col-md-12'><div><h2 id='progress'>Progress:</h2></div><div class='progress'><div id='failBar' class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='75' aria-valuemin='0' aria-valuemax='100'></div></div></div>");
});

$("#dropdown #rejectDropdown").on("click", function(){

	$("#allTopics #topicsRow").empty();
	var idChange = ["reject1", "reject2", "reject3", "reject4"];
	var titleChange = ["Rejection Means You're Trying", "Rejection is Not Personal", "Rejection Makes You Stronger", "Rejection Breaks You Out of Routine"];
	var summaryChange = ["If you get rejection, it means that you went out into the world and tried to get something you didn't have before. Be proud of yourself for putting yourself out there.", "Just because you have been rejected does not mean that there is something wrong with you. Approach the situation with a healthy regard for all of the variables at play.", "When you get rejected, you can gain a lot of information about the situation. Learn from it, no matter how difficult it is to think about it.", "When you experience rejection, there's a wonderful thing that happens. You break out of your routine, and gain an expanded view of the world."];

	for (var i=0; i < idChange.length; i++) {

		$("#allTopics #topicsRow").append("<div class='col-md-3'><div id='cardstyle' class='card card-cascade narrower'><div class='view overlay'><a><div class='mask rgba-white-slight'></div></a></div><div class='card-body'><h4 class='white-text' id='underline'>" + titleChange[i] + "</h4><h4 class='card-title'></h4><p class='white-text'>" + summaryChange[i] + "</p><a class='btn topicButton' id=" + idChange[i] + ">Open</a></div></div>");

	}
	$("#allTopics #topicsRow").append("<div class='col-md-12'><div><h2 id='progress'>Progress:</h2></div><div class='progress'><div id='rejectBar' class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='75' aria-valuemin='0' aria-valuemax='100'></div></div></div>");
});

});