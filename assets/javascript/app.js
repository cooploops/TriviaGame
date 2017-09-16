window.onload = function() {



var game = {
	// timers and counters
	correct: 0,
	incorrect: 0,
	questionTimer: 45,
	postAnswerTimeOut: 5,
	currentQuestion: "",
	correctAns: "",
	possAns: [],
	possAnsLength: "",
	questionsUsed: [],

	// array of 10 questions and answers
	questions: [{
			ques: "Why is the sky blue?",
			wrongans1: "because the ocean reflects the the color of blue into the sky",
			wwrongans2: "because that's just how Earth's sky is",
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
			rightans: "they're actually the brightest objects in space but their light just reaches our eyes because of their immense gravity"
		},
		{
			ques: "What is light exatly?",
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
			wrongans2: " about 3 minutes",
			wrongans3: "about 1 hour",
			rightans: "about 10 minutes"
		},
		{
			ques: "What is a radio wave?",
			wrongans1: "it's a sound wave made by radio stations",
			wrongans2: "tiny reverberations in the air that we use antennae to receive and intensify the signal so we can listen",
			wrongans3: "electricty that we shoot from antennae to antennae",
			rightans: "they're electro-magnetic waves that travel in all directions"
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
			var index = Math.floor((Math.random() * 9)+0.99);
			this.currentQuestion = game.questions[index].ques;
			game.correctAns = game.questions[index].rightans;
			var incorrect1 = game.questions[index].wrongans1;
			var incorrect2 = game.questions[index].wrongans2;
			var incorrect3 = game.questions[index].wrongans3;
			this.possAns = [game.correctAns, incorrect1, incorrect2, incorrect3];
			game.possAnsLength = this.possAns.length;
			this.questionsUsed.push(this.questions.splice(index,1));
		},

		countDown: function() {
			game.questionTimer--;
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
	$("div.jumbotron").append(questionDiv);
	// append answers in random order to questionDiv just created
	for(i=game.possAnsLength;i>0;i--){
		var index = Math.floor((Math.random() * i));
		console.log(index);
		console.log(game.possAns);
		var answerDiv = $("<div>");
		answerDiv.attr("id", "answerDiv"+index);
		answerDiv.text(game.possAns[index]);
		$("#questionDiv").append(answerDiv);
		game.possAns.splice(index,1);
		game.possAnsLength = game.possAns.length;
	}

})

}

