$(document).ready(function () {

    var animating = false;
    var cardsCounter = 0;
    var numOfCards = 6;
    var decisionVal = 80;
    var pullDeltaX = 0;
    var deg = 0;
    var $card, $cardReject, $cardLike;

    function pullChange() {
        animating = true;
        deg = pullDeltaX / 10;
        $card.css("transform", "translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)");

        var opacity = pullDeltaX / 100;
        var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
        var likeOpacity = (opacity <= 0) ? 0 : opacity;
        $cardReject.css("opacity", rejectOpacity);
        $cardLike.css("opacity", likeOpacity);
    };

    function release() {

        if (pullDeltaX >= decisionVal) {
            $card.addClass("to-right");
        } else if (pullDeltaX <= -decisionVal) {
            $card.addClass("to-left");
        }

        if (Math.abs(pullDeltaX) >= decisionVal) {
            $card.addClass("inactive");

            setTimeout(function () {
                $card.addClass("below").removeClass("inactive to-left to-right");
                cardsCounter++;
                if (cardsCounter === numOfCards) {
                    cardsCounter = 0;
                    $(".demo__card").removeClass("below");
                }
            }, 300);
        }

        if (Math.abs(pullDeltaX) < decisionVal) {
            $card.addClass("reset");
        }

        setTimeout(function () {
            $card.attr("style", "").removeClass("reset")
                .find(".demo__card__choice").attr("style", "");

            pullDeltaX = 0;
            animating = false;
        }, 300);
        livro4 = todosLivros.shift();
        $card.html("");
        if (todosLivros.length <= 4)
            getBooksFromGoogle();

        let divActual = $card[0].parentElement.id;
        let idGosto = 0;
        let idNaoGosto = 0;
        if (divActual == "col1") {
            idGosto = 1;
            idNaoGosto = 4;
        }
        if (divActual == "col2") {
            idGosto = 2;
            idNaoGosto = 5;
        }
        if (divActual == "col3") {
            idGosto = 3;
            idNaoGosto = 6;
        }


        $card.append(`<div class="demo__card"><div class="row"><div class="col-sm-12">
            <img src="${livro4.thumbnail}" alt="${livro4.nome}" class="w-75" style="height: 255px"></div>
            <div class="col-sm-12 mt-3"><h5>${livro4.nome}</h5></div>
            <div class="col-sm-12"><p style="height: 120px; overflow: auto;">${livro4.description}</p></div></div>
            <div class="row">
            <div class="col-sm-6"><div class="Ring" id="div${idGosto}" onclick="addBook('${livro4.bookId}', true, ${idGosto})"><i class="fas fa-heart"></i></div></div>
            <div class="col-sm-6"><div class="Ring" id="div${idNaoGosto}" onclick="addBook('${livro4.bookId}', false, ${idGosto})"><i class="fas fa-times"></i></div></div></div>`);
        console.log("Todos Livros: ");
        console.log(todosLivros);
        console.log("Todos Livros exc: ");
        console.log(todosLivrosIncExcluidos);
        console.log("----------------------------------------- NOVO LOG ----------------------------------------------");
    };

    $(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function (e) {
        if (animating) return;

        $card = $(this);
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        var startX = e.pageX || e.originalEvent.touches[0].pageX;

        $(document).on("mousemove touchmove", function (e) {
            var x = e.pageX || e.originalEvent.touches[0].pageX;
            pullDeltaX = (x - startX);
            if (!pullDeltaX) return;
            pullChange();
        });

        $(document).on("mouseup touchend", function () {
            $(document).off("mousemove touchmove mouseup touchend");
            if (!pullDeltaX) return; // prevents from rapid click events
            release();
        });
    });
});