window.onload = function(){
var game = {
	// timers and counters
	correct: 0,
	incorrect: 0,
	questionTimer: 45,
	postAnswerTimeOut: 7000,
	currentQuestion: "",
	correctAns: "",
	incorrect1: "",
	incorrect2: "",
	incorrect3: "",
	possAns: [],
	possAnsLength: "",
	questionsUsed: [],
	interval: 0,
	click: "",
	clickRecording: false,

	// array of 10 questions and answers
	questions: [{
			ques: "Why is the sky blue?",
			wrongans1: "because the ocean reflects the the color of blue into the sky",
			wrongans2: "because that's just how Earth's sky is",
			wrongans3: "because it has something to do with light",
			rightans: "because of Rayleigh Scattering"
		},
		{
			ques: "What color of light does the sun give off?",
			wrongans1: "yellow!",
			wrongans2: "yellow-ish orange!",
			wrongans3: "redish purple at sunrise and sunset then yellow during the day",
			rightans: "white!"
		},
		{
			ques: "Why are black holes called black holes?",
			wrongans1: "because they're black in color",
			wrongans2: "because everything they suck in just mixes up into 'black' matter",
			wrongans3: "because it sounds cool and less threatening that 'end-of-reality' hole",
			rightans: "they're actually the brightest objects in space but their light never reaches our eyes because of their own immense gravity"
		},
		{
			ques: "What is light?",
			wrongans1: "it's just light",
			wrongans2: "it's a wavelength on the electromagnetic spectrum",
			wrongans3: "it's a a super tiny particle we can't see",
			rightans: "it's both a wavelength and a particle"
		},
		{
			ques: "Why are plants green, cars red, and my jeans blue?",
			wrongans1: "because that's what they were colored",
			wrongans2: "because they give off that color of light",
			wrongans3: "plants are naturally green, cars are painted red, and jeans are dyed blue",
			rightans: "because we see colors that are reflected off of objects"
		},
		{
			ques: "Which of the following colors has the lowest frequency out of visible light?",
			wrongans1: "violet",
			wrongans2: "orange",
			wrongans3: "ultraviolet",
			rightans: "red"
		},
		{
			ques: "How do rainbows work?",
			wrongans1: "they reflect light off the clouds",
			wrongans2: "water is reflecting the suns light",
			wrongans3: "the clouds are blocking some light and only letting the colors of the rainbow through",
			rightans: "water droplets in the sky are diffracting the light from the sun"
		},
		{
			ques: "How long does light take to get from the sun to the earth",
			wrongans1: "instantly",
			wrongans2: "between 3 to 5 minutes",
			wrongans3: "about 5 seconds",
			rightans: "between 8 to 10 minutes"
		},
		{
			ques: "What are radio waves?",
			wrongans1: "they're sound waves made by radio stations",
			wrongans2: "tiny reverberations in the air that we use antennae to receive and intensify the signal so we can listen",
			wrongans3: "they're electricty that we shoot from antennae to antennae",
			rightans: "they're electromagnetic waves that travel in all directions"
		},
		{
			ques: "what makes fiber optic wires so fast?",
			wrongans1: "becase they use carbon-fiber instead of regular metal",
			wrongans2: "because their wires don't have any bends and lets things travel faster in a straight line",
			wrongans3: "because they shoot lasers that travel faster than normal electricity",
			rightans: "because they use total internal reflection to make light reflect back in on itself"
		}
		],

		// functions to call
		generateQuestion: function() {
			var index = Math.floor((Math.random() * (game.questions.length-1))+0.99);
			console.log(index);
			this.currentQuestion = game.questions[index].ques;
			this.correctAns = game.questions[index].rightans;
			this.incorrect1 = game.questions[index].wrongans1;
			this.incorrect2 = game.questions[index].wrongans2;
			this.incorrect3 = game.questions[index].wrongans3;
			this.possAns = [game.correctAns, game.incorrect1, game.incorrect2, game.incorrect3];
			game.possAnsLength = this.possAns.length;
			this.questionsUsed.push(this.questions.splice(index,1));
		},

		generateAnswers: function() {
			for(i=game.possAnsLength;i>0;i--){
				var index = Math.floor((Math.random() * i));
				// console.log(index);
				// console.log(game.possAns);
				var answerDiv = $("<div>");
				answerDiv.addClass("answerDiv");
				answerDiv.text(game.possAns[index]);
				$("#questionDiv").append(answerDiv);
				game.possAns.splice(index,1);
				game.possAnsLength = game.possAns.length;
			}
		},

		countDown: function() {
			game.questionTimer--;
			$("#timer").html("Time left: " + game.questionTimer + " seconds");
				if (game.questionTimer <= 0){
					$(".answerDiv").css("display", "none");
					var postAnswer = $("<div>");
					postAnswer.addClass("postAnswer");
					postAnswer.addClass("text-center");
					postAnswer.html("<p>You're out of time! The correct answer is " + game.correctAns + "</p>")
					$("#questionDiv").append(postAnswer);
					clearInterval(game.interval);
					game.incorrect++;
					game.clickRecording = true;
					game.postQuestionScreen();
				}
		},

		postQuestionScreen: function() {
			// set delay before changing screen
			var answerDelay = setTimeout(function(){
				game.clickRecording = false;
				game.reset();
				$(".answerDiv").css("display","block");
			},game.postAnswerTimeOut)
		},

		reset: function() {
			if(game.questionsUsed.length < 10){
				// not gone through all questions so reset timer, generate another question, and setup answers
				$("#timer").text("Time left: 45 seconds");
				this.generateQuestion();
				$("#questionDiv").text(game.currentQuestion);
				this.generateAnswers();
				this.questionTimer = 45;
				this.interval = setInterval(this.countDown,1000);
			} else if (game.questionsUsed.length >= 10){
				// show wins and losses and ask if they want to play again
				$("#questionDiv").css("display","none");
				var results = $("<div>");
				results.html("<p class='lead'>Here are your results! Feel free to play again if you'd like by refreshing the page!</p> <br> <span>correct: " + game.correct + "</span> <br> <span>incorrect: " + game.incorrect + "</span>")
				$("div.jumbotron").append(results);
			}
		}
}

$("#start").click(function(){
	// dynamically create divs for question and answers
	var questionDiv = $("<div>");
	questionDiv.attr("id","questionDiv");
	// hide the stuff inside the jumbotron I don't want to show
	$("p, hr, div.row").css("display", "none");
	// generate question and place inside div created above
	game.generateQuestion();
	questionDiv.text(game.currentQuestion);
	// generate place for timer
	var timer = $("<div>");
	timer.attr("id","timer");
	timer.addClass("text-center");
	timer.text("Time left: 45 seconds")
	$("div.jumbotron").append(timer);
	// append questions below timer
	$("div.jumbotron").append(questionDiv);
	// append answers in random order to questionDiv just created
	game.generateAnswers();
	// create timer div and 
	if(!game.clickRecording){
		game.interval = setInterval(game.countDown,1000);
	}
})
// record users click to check for if correct or incorrect answer chosen
$(window).click(function(event){
	if(!game.clickRecording){
		console.log(game.clickRecording);
		game.click = event.target.innerHTML;
		$(".answerDiv").hover(function(){
			$(this).addClass("answerHover");
		},function(){
			$(this).removeClass("answerHover");
		});
		// if correct answer chosen increase correct counter by 1 and show postAnswer screen stuff 
		if(game.click === game.correctAns){
			$(".answerDiv").css("display", "none");
			var postAnswer = $("<div>");
			postAnswer.addClass("postAnswer");
			postAnswer.addClass("text-center");
			postAnswer.html("<p>correct!</p>")
			$("#questionDiv").append(postAnswer);
			game.correct++;
			clearInterval(game.interval);
			console.log("correct!");
			game.clickRecording = true;
			game.postQuestionScreen();
		// if incorrect answer is chosen increase incorrect counter by 1 and show postAnswer screen
		} else if(game.click === game.incorrect1 || game.click === game.incorrect2 || game.click === game.incorrect3){
			$(".answerDiv").css("display", "none");
			var postAnswer = $("<div>");
			postAnswer.addClass("postAnswer");
			postAnswer.addClass("text-center");
			postAnswer.html("<p>I'm sorry that's incorrect. The correct answer is " + game.correctAns + "</p>")
			$("#questionDiv").append(postAnswer);
			clearInterval(game.interval);
			game.incorrect++;
			game.clickRecording = true;
			game.postQuestionScreen();
		} 
	}
})
}



