$(document).ready(function () {
    var ov = $('.ov');

    //fakeScroll
    var fakeScrolls = document.querySelectorAll('.selector-menu'), fakeScroll;
    for (fakeScroll = 0; fakeScroll < fakeScrolls.length; fakeScroll++) {
        fakeScrolls[fakeScroll].fakeScroll();
    }

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

    //selector
    $(function () {
        var selector = $('.selector');

        selector.each(function () {

            var select = $(this).find('.select'),
                selectorMenu = $(this).find('.selector-menu'),
                selectorMenuInner = selectorMenu.find('.menu'),
                selectItems = select.find('option');

            $(this).append('<div class="selector-block"><button type="button" class="button"></button></div>');
            select.wrap('<div class="form-data"></div>');


            var selectorBlock = $(this).find('.selector-block'),
                selectorButton = selectorBlock.find('.button');

            selectItems.each(function () {

                if ($(this).attr('selected')) {
                    selectorMenuInner.append('<li data-id="' + $(this).attr('value') + '" class="selector-menu__item selected">' + $(this).html() + '</li>');

                    var selectorMenuItem = selectorMenuInner.find('.selector-menu__item.selected');

                    selectorButton.html($(this).html());
                    selectorButton.attr('data-id', selectorMenuItem.attr('data-id'));
                } else {
                    selectorMenuInner.append('<li data-id="' + $(this).attr('value') + '" class="selector-menu__item">' + $(this).html() + '</li>');
                }
            });

            var selectorMenuItem = selectorMenuInner.find('.selector-menu__item');

            selectorButton.click(function () {
                var menuLength = selectorMenuInner.find('.selector-menu__item').length;

                if (menuLength < 5) {
                    selectorMenu.css('height', 42 * menuLength + 12);
                }

                selectorMenu.toggleClass('-open');
            });

            selectorMenuItem.click(function () {
                var dataId = $(this).attr('data-id'),
                    selectorText = $(this).html();

                selectItems.removeAttr('selected');

                selectItems.each(function () {
                    if ($(this)[0].value === dataId) {
                        $(this).attr('selected', 'selected');
                    }
                });
                selectItems.find('[value]', dataId);
                selectorButton.html(selectorText);
                selectorButton.attr('data-id', dataId);
                selectorMenuItem.removeClass('selected');
                $(this).addClass('selected');
                selectorMenu.removeClass('-open');
            });
        });
    });
});