(function() {
  const rock = document.getElementById('choice_rocks');
  const paper = document.getElementById('choice_paper');
  const scissor = document.getElementById('choice_scissor');
  const lizard = document.getElementById('choice_lizard');
  const spock = document.getElementById('choice_spock');

  const start = document.getElementById('play');
  const restart = document.getElementById('replay');
  const result_wrap = document.getElementById('result_wrap');
  const error_wrap = document.getElementById('error_wrap');

  const choiceClass = document.getElementsByClassName("choice_option");


  var choices  =  {
      rock : {name: "rock", win: ["scissor","lizard"]},
      paper: {name: "paper", win: ["rock", "spock"]},
      scissor: {name: "scissor", win: ["paper", "lizard"]},
      lizard: {name: "lizard", win:["paper","spock"]},
      spock: {name: "spock", win:["scissor","rock"]}
                };

  let my_choice = ``;
  let bot_choice = ``;

  function get_bot_choice() {
    const values = Object.values(choices)
    const randomValue = values[parseInt(Math.random() * values.length)]
    return randomValue.name;
  }

  function setMyChoice(choice) {
    my_choice = choice;
  }

  Array.from(choiceClass).forEach(function(item) {
      item.addEventListener('click', function() {
        my_choice = this.getAttribute(`data-choice`);
      });
  });


  function rule(mine, bots) {

    if(mine == bots) {
      result = 'tie'
    }
    else {
      mine = choices[mine];
      if(mine.win.indexOf(bots) !== -1){
        result = 'win';
      } else {
          result = 'lose';
      }

    }

    return result;
  }
  start.addEventListener('click', function() {
    result_wrap.classList.add('hidden');
    error_wrap.classList.add('hidden');
    if(my_choice == ``) {
      error_wrap.classList.remove('hidden');
      error_wrap.innerHTML = "Please make your choice";
      return;
    }
    bot_choice = get_bot_choice();
    var result = rule(my_choice, bot_choice);
    if(result == `tie`) {
      var result_text = `Oops! it's a tie. Play again`;
      result_wrap.classList.remove(`bg-green-200`,`border-green-400`,`bg-red-200`,`border-red-400`);
      result_wrap.classList.add(`bg-yellow-200`,`border-yellow-400`);
    }
    if(result == `win`) {
      var result_text = `Congratulation! You won. Your opponent choose ${bot_choice}`;
      result_wrap.classList.remove(`bg-yellow-200`,`border-yellow-400`,`bg-red-200`,`border-red-400`);
      result_wrap.classList.add(`bg-green-200`,`border-green-400`);
    }
    if(result == `lose`) {
      var result_text = `Sorry! You lost. Your opponent choose ${bot_choice}`;
      result_wrap.classList.remove(`bg-green-200`,`border-green-400`,`bg-yellow-200`,`border-yellow-400`);
      result_wrap.classList.add(`bg-red-200`,`border-red-400`);
    }

    result_wrap.classList.remove('hidden');
    result_wrap.innerHTML = result_text;

    my_choice = ``;
    bot_Choice = ``;
  })
})();
