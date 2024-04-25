//<<<<<<< HEAD
buzz.defaults.formats = ['ogg', 'mp3', 'wav'];

buzz.defaults.formats = ['ogg', 'mp3', 'wav']; // adicionamos mais uma extensão de audio

buzz.defaults.preload = 'metadata';

// array de objetos com as informações do animal (imagem, cor, palavra e som)
var games = [
  { img: 'img/koala.png', color: '#176580', word: 'koala', sound: '' },
  {
    img: 'img/elephant1.png',
    color: '#a36513',
    word: 'elephant',
    sound: 'sounds/elephant',
  },
  {
    img: 'img/monkey.png',
    color: '#ffc48b',
    word: 'monkey',
    sound: 'sounds/monkey',
  },
  { img: 'img/bear.png', color: '#807148', word: 'bear', sound: 'sounds/bear' },
  {
    img: 'img/horse.png',
    color: '#bc9e6c',
    word: 'horse',
    sound: 'sounds/horse',
  },
  { img: 'img/bull.png', color: '#ff5f09', word: 'bull', sound: 'sounds/bull' },
  { img: 'img/rabbit.png', color: '#c81f27', word: 'rabbit', sound: '' },
  {
    img: 'img/tiger.png',
    color: '#b3eef4',
    word: 'tiger',
    sound: 'sounds/tigger',
  },
  { img: 'img/turtle.png', color: '#d5ea86', word: 'turtle', sound: '' },
  {
    img: 'img/lion1.png',
    color: '#dd992d',
    word: 'lion',
    sound: 'sounds/lion',
  },
  //objetos novos
  { img: 'img/cow.png', color: '#fffff', word: 'cow', sound: 'sounds/cow' },
  {
    img: 'img/rooster.png',
    color: '#ffca8a',
    word: 'rooster',
    sound: 'sounds/rooster',
  },
  { img: 'img/dog.png', color: '#c27e4e', word: 'dog', sound: 'sounds/dog' },
  { img: 'img/owl.png', color: '#783e22', word: 'owl', sound: 'sounds/owl' },
  { img: 'img/duck.png', color: '#fbdd56', word: 'duck', sound: 'sounds/duck' },
  { img: 'img/bee.png', color: '#ffbe0b', word: 'bee', sound: 'sounds/bee' },
  { img: 'img/giraffe.png', color: '#ee9b00', word: 'giraffe', sound: '' },
  {
    img: 'img/hipoppotamus.png',
    color: '#6c757d',
    word: 'hipoppotamus',
    sound: '',
  },
  {
    img: 'img/leopard.png',
    color: '#fb8b24',
    word: 'leopard',
    sound: 'sounds/leopard',
  },
  { img: 'img/cat.png', color: '#f18701', word: 'cat', sound: 'sounds/meow' },
];

//criou um group dos sons
//<<<<<<< HEAD
var winSound = new buzz.sound('sounds/win'),
  errorSound = new buzz.sound('sounds/error'),
  alphabetSounds = {},
  alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

var winSound = new buzz.sound('sounds/win'),
  errorSound = new buzz.sound('sounds/error'),
  alphabetSounds = {}, //objeto que irá armazenar o som referente a cada letra do alfabeto
  alphabet = 'abcdefghijklmnopqrstuvwxyz'.split(''); // string com as letras do alfabeto em que é feito um split para pegar cada letra separadamente


// percorre a string alphabet e reproduz o som referente a cada letra
for (var i in alphabet) {
  var letter = alphabet[i]; // letra do alfabeto
  alphabetSounds[letter] = new buzz.sound(
    'sounds/kid/' + letter
  ); /*letra dentro do objeto alphabetSounds, onde será instanciado um objeto que chama o som referente a letra*/
}

$(function () {
  if (!buzz.isSupported()) {
    $('#warning').show();
  }

  // idx inicia com 0. Quando a função buildGame é chamada essa variavel é incrementada ou decrementada
  var idx = 0, // variavel
    $container = $('#container'),
    $picture = $('#picture'),
    $models = $('#models'),
    $letters = $('#letters');

  $('body').bind('selectstart', function () {
    return false;
  });

  // muda para o proximo animal
  $('#next').click(function () {
    refreshGame();
    buildGame(++idx);
    return false;
  });

  // muda para o animal anterior 
  $('#previous').click(function () {
    refreshGame();
    buildGame(--idx);
    return false;
  });

  // muda o nivel do jogo
  $('#level').click(function () {
    if ($(this).text() == 'easy') {
      $(this).text('hard');
      $models.addClass('hard');
    } else {
      $(this).text('easy');
      $models.removeClass('hard');
    }
    return false;
  });

  // deixa os valores de models e letters zerados 
  function refreshGame() {
    $('#models').html('');
    $('#letters').html('');
  }

  //constroi o jogo (nome do animal, imagem , som, letras)
  function buildGame(x) {
    // verifica
    if (x > games.length - 1) {
      idx = 0;
    }
    if (x < 0) {
      idx = games.length - 1;
    }

    var game = games[idx],
      score = 0;

    var gameSound = new buzz.sound(game.sound);
    gameSound.play();

    // Fade the background color

    // animação do animal e da cor (dura 1 segundo)
    $('body').stop().animate(
      {
        backgroundColor: game.color,
      },
      1000
    );
    $('#header a').stop().animate(
      {
        color: game.color,
      },
      1000
    );

    // Update the picture
    $picture
      .attr('src', game.img)
      .unbind('click')
      .bind('click', function () {
        gameSound.play();
      });

    // cria as caixas de letras que vão ser arrastadas (drag and drop) -> as letras sao li dentro da ul
    // Build model
    var modelLetters = game.word.split('');

    for (var i in modelLetters) {
      var letter = modelLetters[i];
      $models.append('<li>' + letter + '</li>');
    }

    var letterWidth = $models.find('li').outerWidth(true);

    $models.width(letterWidth * $models.find('li').length);

    // Build shuffled letters

    // embaralha as letras com o math random
    var letters = game.word.split(''),
      shuffled = letters.sort(function () {
        return Math.random() < 0.5 ? -1 : 1;
      });

    for (var i in shuffled) {
      $letters.append('<li class="draggable">' + shuffled[i] + '</li>');
    }

    // embaralha o angulo e posição das caixinhas das letras (tambem com o math.random)
    $letters.find('li').each(function (i) {
      var top = $models.position().top + Math.random() * 100 + 80,
        left =
          $models.offset().left -
          $container.offset().left +
          Math.random() * 20 +
          i * letterWidth,
        angle = Math.random() * 30 - 10;

      $(this).css({
        top: top + 'px',
        left: left + 'px',
      });

      rotate(this, angle);

      // quando voce pega a letra ja emite o som especifico daquela  letra
      $(this).mousedown(function () {
        var letter = $(this).text();
        if (alphabetSounds[letter]) {
          alphabetSounds[letter].play();
        }
      });
    });

    $letters.find('li.draggable').draggable({
      zIndex: 9999,
      stack: '#letters li',
    });

    // quando voce solta a letra e os possiveis cenarios para essa ação
    $models.find('li').droppable({
      accept: '.draggable',
      hoverClass: 'hover',
      drop: function (e, ui) {
        var modelLetter = $(this).text(), // letra fixa (que ja esta na posição certa)
          droppedLetter = ui.helper.text(); // letra que o usuario soltou na caixa da letra fixa

        // --- condição para caso voce acerte a letra ----
        if (modelLetter == droppedLetter) {
          ui.draggable
            .animate({
              top: $(this).position().top,
              left: $(this).position().left,
            })
            .removeClass('draggable')
            .draggable('option', 'disabled', true);

          //rotação das letras quando se acerta a palavra
          rotate(ui.draggable, 0);

          score++; // incrementa a variavel score

          if (score == modelLetters.length) {
            // caso a variavel score seja igual ao tamanho da palavra, a função wingame é chamada
            winGame();
          }
        } else {
          // caso nao, ou seja, voce nao completou a caixinha das letras, é emitido o som de erro e a letra volta para seu lugar original
          ui.draggable.draggable('option', 'revert', true);

          errorSound.play(); // som de erro

          setTimeout(function () {
            ui.draggable.draggable('option', 'revert', false); // letras voltam ao lufgar original
          }, 100);
        }
      },
    });
  }

  /*Função chamada quando voce acerta a palavra, ou seja, ganha o jogo */
  function winGame() {
    // função chamada quando voce acerta a palavra
    winSound.play(); // som de vitoria é emitido

    // animação das letras quando a palavra esta correta
    $('#letters li').each(function (i) {
      var $$ = $(this);
      setTimeout(function () {
        $$.animate({
          top: '+=60px',
        });
      }, i * 300);
    });

    // a função refreshGame é chamada para "zerar" os elementos model e letters do html e a função buildgame é chamada com o idx sendo incrementado, passando para o proximo animal dentro do objeto "games" que contem os animais
    setTimeout(function () {
      refreshGame();
      buildGame(++idx);
    }, 3000);
  }

  // função que faz a animação de rotação das letras (?)
  function rotate(el, angle) {
    $(el).css({
      '-webkit-transform': 'rotate(' + angle + 'deg)',
      '-moz-transform': 'rotate(' + angle + 'deg)',
      '-ms-transform': 'rotate(' + angle + 'deg)',
      '-o-transform': 'rotate(' + angle + 'deg)',
      transform: 'rotate(' + angle + 'deg)',
    });
  }

  buildGame(idx);
});
