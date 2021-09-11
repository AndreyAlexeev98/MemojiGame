'use strict';
(function () {
    window.memoji = function () {
        var cardsList = document.getElementById('cardsList');
        var incorrectIndices = [];
        var openedCards = [];

        var correctCards = 0;
        var firstClick = true;

        var emojies = ['image-a', 'image-a', 'image-b', 'image-b', 'image-c', 'image-c', 'image-d', 'image-d', 'image-e', 'image-e', 'image-f', 'image-f'];

        const TIME_LIMIT = 60;
        var timePassed = 0;
        var timeLeft = TIME_LIMIT;
        var timerInterval = null;


        var overlay = document.querySelector('.overlay');
        var winAlert = document.querySelector('.win');
        var loseAlert = document.querySelector('.lose');

        var cards = Array.from(cardsList.querySelectorAll('.card'));

        window.addEventListener('load', function (event) {
            shuffleCards();
        });

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        function shuffleCards() {
            var newEmojies = shuffleArray(emojies);

            cards.forEach(function (item, index) {
                item.dataset.image = newEmojies[index];

            });
        }

        function pressButton() {
            document.getElementById('play_again').addEventListener('click', function (event) {
                overlay.style.display = "none";
                winAlert.style.display = "none";
                removeClasses();
                shuffleCards();
            })
            document.getElementById('try_again').addEventListener('click', function (event) {
                overlay.style.display = "none";
                loseAlert.style.display = "none";
                removeClasses();
                shuffleCards();
            })
        }

        function removeClasses() {
            cards.forEach(function (card) {
                card.classList.remove("rotate");
                card.classList.remove("correct");
                card.classList.remove("incorrect");
            });

            resetVariables();
        }

        function resetVariables() {
            document.getElementById('timer').textContent = '01:00';

            openedCards = [];

            incorrectIndices = [];

            correctCards = 0;

            firstClick = true;

            timePassed = 0;
        }

        cards.forEach(function (card, index) {

            card.addEventListener('click', function (event) {
                event.preventDefault();

                if (firstClick) {
                    firstClick = false;
                    startTimer();
                }

                if (!card.classList.contains('correct') && !card.classList.contains('incorrect') && !card.classList.contains('rotate')) {


                    if (openedCards.length < 2) {
                        incorrectIndices.forEach(function (index) {
                            cards[index].classList.remove("rotate");
                            cards[index].classList.remove("incorrect");

                        });
                        incorrectIndices = [];

                        card.classList.add('rotate');
                        openedCards.push([card.dataset.image, index]);
                    }

                    if (openedCards.length === 2) {
                        var index1 = openedCards[0][1];
                        var index2 = openedCards[1][1];
                        if (openedCards[0][0] === openedCards[1][0]) {

                            cards[index1].classList.add("correct");
                            cards[index2].classList.add("correct");

                            correctCards += 2;
                        } else {
                            cards[index1].classList.add("incorrect");
                            cards[index2].classList.add("incorrect");

                            incorrectIndices = [index1, index2];
                        }
                        openedCards = [];
                    }
                }
            });
        });

        /*Timer*/


        function onTimesUp() {
            clearInterval(timerInterval);
        }

        function startTimer() {

            timerInterval = setInterval(() => {
                timePassed = timePassed += 1;
                timeLeft = TIME_LIMIT - timePassed;
                document.getElementById("timer").innerHTML = formatTime(
                    timeLeft
                );

                if (timeLeft === 0) {
                    onTimesUp();

                    overlay.style.display = "block";
                    loseAlert.style.display = "block";
                    pressButton();

                } else if (timeLeft > 0 && correctCards === 12) {
                    onTimesUp();
                    overlay.style.display = "block";
                    winAlert.style.display = "block";
                    pressButton();

                }

            }, 1000);
        }

        function formatTime(time) {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;

            if (minutes < 10) {
                minutes = `0${minutes}`;
            }

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            return `${minutes}:${seconds}`;
        }

    };
}());





