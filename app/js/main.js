$(document).ready(function () {

    //header menu opener
    $(function () {
        var headerMenu = $('.header__user-control .item-menu'),
            headerMenuArrow = headerMenu.find('.arrow');

        headerMenuArrow.click(function () {
            headerMenu.toggleClass('-menu-opened');
        });
    });

    //recommend special
    $(function () {
        var recommendWrapper = $('.recommend-special .recommend__wrapper');

        if (recommendWrapper != null) {

            recommendWrapper.each(function () {
                var recommendButton = $(this).parent().find('.recommend__button .link'),
                    currentWrapper = $(this),
                    recommendItem = $(this).find('.recommend__item');

                if (recommendItem.length > 4) {
                    recommendButton.parent().show();
                }

                for (var i = 0; i < recommendItem.length; i++) {
                    if (i > 3) {
                        $(recommendItem[i]).addClass('-hidden-item');
                    } else {
                        $(recommendItem[i]).show();
                    }
                }

                recommendButton.click(function () {

                    var items = currentWrapper.find('.-hidden-item'),
                        hiddenItems = [];

                    for (var i = 0; i < items.length; i++) {
                        if (!$(items[i]).hasClass('-opened')) {
                            hiddenItems.push(items[i]);
                        }
                    }

                    if (hiddenItems.length > 4) {
                        for (i = 0; i < 4; i++) {
                            $(hiddenItems[i]).fadeIn();
                            $(hiddenItems[i]).addClass('-opened');
                        }
                    } else if (hiddenItems.length <= 4 && hiddenItems.length > 0) {
                        for (i = 0; i < hiddenItems.length; i++) {
                            $(hiddenItems[i]).fadeIn();
                            $(hiddenItems[i]).addClass('-opened');
                            $(this).text('Скрыть');
                        }
                    } else if (hiddenItems.length === 0) {
                        items.fadeOut();
                        items.removeClass('-opened');
                        $(this).text('Показать еще');
                    }
                });
            });
        }
    });

    //quiz
    $(function () {
        var quiz = $('.list.list-quiz');

        if (quiz != null) {
            quiz.each(function () {
                var items = $(this).find('.list__item'),
                    itemTrue;

                if (quiz.hasClass('quiz-sidebar')) {
                    itemTrue = 2;
                }

                items.click(function () {

                    if (!$(this).hasClass('-disabled')) {
                        items.addClass('-disabled');

                        if ($(this).data('item') === itemTrue) {
                            $(this).addClass('item-true');
                        } else {
                            $(this).addClass('item-false');

                            for (var i = 0; i < items.length; i++) {
                                if ($(items[i]).data('item') === itemTrue) {
                                    $(items[i]).addClass('item-true');
                                }
                            }
                        }
                    }
                });
            });
        }
    });
});