'use strict';

document.ontouchmove = function(e){ e.preventDefault(); }

var awkwardSkateDice = (function(){

	var container, tricklist, dice;
	var options = {
		hardMode:false,
	};

	function init(){
		container = document.getElementById("skatedice");
		tricklist = document.querySelector('.done');

		dice = [
			document.getElementById('dice_1'),
			document.getElementById('dice_2'),
			document.getElementById('dice_3'),
			document.getElementById('dice_4'),
			document.getElementById('dice_5'),
		];
		dice[4].parentNode.parentNode.parentNode.style.display = "none";

		Ps.initialize( tricklist );

		var roll = document.getElementById('roll');
		roll.addEventListener('mousedown', rollDice);

		document.getElementById('alias').innerHTML = "Roll to start";

		listTricks();
	}
	window.addEventListener("load", init);
	//window.addEventListener("resize", Ps.update( tricklist ));

	function rollDice(){
		var roll = tricks.newTrick();
		var trick = roll.trick.split(" ");

		listTricks();

		var abd = (roll.abd) ? "<span class='abd'>ABD</span>" : "";
		document.getElementById('alias').className = "";
		if(roll.abd) document.getElementById('alias').className = "abd";

		dice[0].innerHTML = trick[0];
		dice[1].innerHTML = trick[1];
		dice[2].innerHTML = trick[2];
		dice[3].innerHTML = trick[3];
		dice[4].innerHTML = trick[4];

		document.getElementById('alias').innerHTML = roll.alias + abd;

		// make them rotate
		/*
		var die = document.getElementsByClassName("die")
		for(var i=0;i<die.length;i++){
			die[i].style.transform = "rotate("+(Math.random()*5-Math.random()*10)+"deg)";
		}
		*/
	}

	function listTricks(){
		var done = tricks.doneTricks();
		var doneList = "";
		for(var i=0;i<done.length;i++) doneList += (done[i]) ?  "<li>"+done[i]+"</li>" : "<li></li>";
		document.getElementById('done').innerHTML = doneList;
		Ps.update( tricklist );
	}

	var tricks = (function(){

		function newTrick(){
			var trick = '';
			var abd = false;
			// Generate
			while (trick == '') trick = generate();
			var alias = checkAlias(trick);
			if(done[alias]) abd = true; // Check if NBD
			done[alias] = true;

			return {
				trick:trick,
				alias:alias,
				abd:abd,
			};
		}

		function doneTricks(){
			var arr = [];
			for (var key in done) arr.push(key);
			return arr.reverse();
		}

		function generate(){
			var stance = dice.stance[Math.floor(Math.random()*dice.stance.length)];
			var approach = dice.approach[Math.floor(Math.random()*dice.approach.length)];
			var spin = dice.spin[Math.floor(Math.random()*dice.spin.length)];
			var flip = dice.flip[Math.floor(Math.random()*dice.flip.length)];

			var wtf = (options.hardMode) ? dice.wtf[Math.floor(Math.random()*dice.wtf.length)] : '';

			var trick = stance + ' ' + approach + ' ' + spin + ' ' + flip + ' ' + wtf;

			return trick;
		}
		function checkAlias(alias){
			var aliasNoSpaces = alias.replace(/ /g,'');
			if(renames[aliasNoSpaces]) alias = renames[aliasNoSpaces];
			return alias;
		}

		var done = {};
		var dice = {
			stance:[
				'',
				'',
				'',
				'switch',
				'fakie',
				'nollie',
			],
			approach:[
				'',
				'',
				'',
				'fs',
				'bs',
				'',
			],
			flip:[
				'',
				'',
				'kickflip',
				'heelflip',
				'shove-it',
				'hardflip',
				'inward-heel',
			],
			spin:[
				'',
				'',
				'180',
				'360',
			],
			wtf:[
				'',
				'',
				'',
				'',
				'pressure',
				'body-varial',
				'revert',
				'late',
				'under-flip',
				'casper-flip',
				'dolphin',
			]
		};
		var renames = {
			''			: 'ollie',
			'fakie'		: 'fakie ollie',
			'switch'	: 'switch ollie',

			'fs'		: 'fs 180',
			'bs'		: 'bs 180',
			'switchfs'	: 'switch fs 180',
			'switchbs'	: 'switch bs 180',
			'fakiefs'	: 'fs half cab',
			'fakiebs'	: 'bs half cab',
			'nolliefs'	: 'nollie fs 180',
			'nolliebs'	: 'nollie bs 180',

			'180kickflip'		: 'varial flip',
			'360kickflip'		: 'treflip',
			'180heelflip'		: 'varial heel',
			'360heelflip'		: 'laser flip',
			'switch180kickflip'	: 'switch varial flip',
			'switch360kickflip'	: 'switch treflip',
			'switch180heelflip'	: 'switch varial heel',
			'switch360heelflip'	: 'switch laser flip',
			'nollie180kickflip'	: 'nollie varial flip',
			'nollie360kickflip'	: 'nollie treflip',
			'nollie180heelflip'	: 'nollie varial heel',
			'nollie360heelflip'	: 'nollie laser flip',
			'fakie180kickflip'	: 'fakie varial flip',
			'fakie360kickflip'	: 'fakie treflip',
			'fakie180heelflip'	: 'fakie varial heel',
			'fakie360heelflip'	: 'fakie laser flip',

			'bs180shove-it'			: 'bs bigspin',
			'fs180shove-it'			: 'fs bigspin',
			'switchbs180shove-it'	: 'switch bs bigspin',
			'switchfs180shove-it'	: 'switch fs bigspin',
			'nolliebs180shove-it'	: 'nollie bs bigspin',
			'nolliefs180shove-it'	: 'nollie fs bigspin',
			'fakiebs180shove-it'	: 'fakie bs bigspin',
			'fakiefs180shove-it'	: 'fakie fs bigspin',

			'180shove-it'			: 'bigspin',
			'switch180shove-it'		: 'switch bigspin',
			'nollie180shove-it'		: 'nollie bigspin',
			'fakie180shove-it'		: 'fakie bigspin',

			'bs180hardflip'			: 'ghetto bird',
			'switchbs180hardflip'	: 'switch ghetto bird',
			'nolliebs180hardflip'	: 'nollie ghetto bird',
			'fakiebs180hardflip'	: 'fakie ghetto bird',

			'bshardflip'			: 'ghetto bird',
			'switchbshardflip'	: 'switch ghetto bird',
			'nolliebshardflip'	: 'nollie ghetto bird',
			'fakiebshardflip'	: 'fakie ghetto bird',

		}
		return {
			newTrick:newTrick,
			doneTricks:doneTricks,
		}
	}());

})();






var scrollbar = (function(){
})();