var numbers = [{
            number: "1",
            Color: "colour-one"
        }, {
            number: "2",
            Color: "colour-two"
        }, {
            number: "3",
            Color: "colour-three"
        }, {
            number: "4",
            Color: "colour-two"
        }, {
            number: "5",
            Color: "colour-three"
        }, {
            number: "6",
            Color: "colour-four"
        }, {
            number: "7",
            Color: "colour-four"
        }, {
            number: "8",
            Color: "colour-one"
        }, {
            number: "9",
            Color: "colour-three"
        },];


        function getNumPad() {
            var numberPad = new Array();

            for (var x = 0; x < numbers.length; x++) {
                var card = {
                    Value: numbers[x].number,
                    Color: numbers[x].Color
                };
                numberPad.push(card);
            }
            return numberPad;
        }
        function shuffle() { 
            for (var i = 0; i < 1000; i++) {
                var location1 = Math.floor((Math.random() * deck.length));
                var location2 = Math.floor((Math.random() * deck.length));
                var tmp = deck[location1];
                deck[location1] = deck[location2];
                deck[location2] = tmp;
            }
            renderNumPad();
        }
        function renderNumPad() {
            document.getElementById('deck').innerHTML = '';
            for (var i = 0; i < deck.length; i++) {
                var card = document.createElement("div");
                card.innerHTML = deck[i].Value;
                card.id = deck[i].Value;
                card.style["background-color"] = deck[i].Color
                card.className = deck[i].Color
                document.getElementById("deck").appendChild(card);
            }
        }
        function load() {
            deck = getNumPad();
            renderNumPad();
        }
        window.onload = load;