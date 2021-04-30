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

    //main catalog
    $(function () {
        var catalogWrapper = $('.catalog-main .catalog__wrapper');

        if (catalogWrapper != null) {

            catalogWrapper.each(function () {
                var catalogButton = $(this).parent().find('.catalog__button .link'),
                    currentWrapper = $(this),
                    catalogItem = $(this).find('.catalog__item');

                if (catalogItem.length > 4) {
                    catalogButton.parent().show();
                }

                for (var i = 0; i < catalogItem.length; i++) {
                    if (i > 3) {
                        $(catalogItem[i]).addClass('-hidden-item');
                    } else {
                        $(catalogItem[i]).show();
                    }
                }

                catalogButton.click(function () {

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

    //accordion
    $(function () {
        var accordion = $('.accordion');

        accordion.each(function () {
            var accordionItem = $(this).find('.accordion__item');

            accordionItem.each(function () {
                var accordionInner = $(this).find('.accordion__inner'),
                    accordionArrow = $(this).find('.accordion__arrow'),
                    accordionHeader = $(this).find('.accordion__header'),
                    currentItem = $(this);

                if (accordionHeader.length) {
                    accordionHeader.click(function () {
                        if (currentItem.hasClass('-active')) {
                            accordionInner.slideUp();
                            currentItem.removeClass('-active');
                        } else {
                            accordionInner.slideDown();
                            currentItem.addClass('-active');
                        }
                    });
                } else {
                    accordionArrow.click(function () {
                        if (currentItem.hasClass('-active')) {
                            currentItem.removeClass('-active');
                            accordionInner.slideUp();
                        } else {
                            currentItem.addClass('-active');
                            accordionInner.slideDown();
                        }
                    });
                }
            });
        });
    });

    //control-favorite
    $('.control-favorite').click(function () {
        $(this).toggleClass('-active');
    })

    //sliders
    $(function () {
        var slider = $('.slider');

        slider.each(function () {
            var currentSlider = $(this),
                sliderWrapper = $(this).find('.slider__wrapper');

            if (currentSlider.length && currentSlider.hasClass('slider-teachers')) {
                sliderWrapper.slick({
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: true,
                    prevArrow: $(this).find('.slider-button-prev'),
                    nextArrow: $(this).find('.slider-button-next'),
                });
            }
        });
    });


    //reviews catalog
    $(function () {
        var catalogWrapper = $('.catalog-reviews .catalog__wrapper');

        if (catalogWrapper != null) {

            catalogWrapper.each(function () {
                var catalogButton = $(this).parent().find('.catalog__button .link'),
                    currentWrapper = $(this),
                    catalogItem = $(this).find('.catalog__item');

                if (catalogItem.length > 2) {
                    catalogButton.parent().show();
                }

                for (var i = 0; i < catalogItem.length; i++) {
                    if (i > 1) {
                        $(catalogItem[i]).addClass('-hidden-item');
                    } else {
                        $(catalogItem[i]).show();
                    }
                }

                catalogButton.click(function () {
                    var items = currentWrapper.find('.-hidden-item'),
                        hiddenItems = [];

                    for (var i = 0; i < items.length; i++) {
                        if (!$(items[i]).hasClass('-opened')) {
                            hiddenItems.push(items[i]);
                        }
                    }

                    if (hiddenItems.length > 2) {
                        for (i = 0; i < 2; i++) {
                            $(hiddenItems[i]).fadeIn();
                            $(hiddenItems[i]).addClass('-opened');
                        }
                    } else if (hiddenItems.length <= 2 && hiddenItems.length > 0) {
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


    //services detail table
    $(function () {
        var tableWrapper = $('.section__table-search .section__table-wrapper .table-info');

        if (tableWrapper != null) {

            tableWrapper.each(function () {
                var tableButton = $(this).parent().find('.table__button .link'),
                    currentWrapper = $(this),
                    tableItem = $(this).find('tr');

                if (tableItem.length > 5) {
                    tableButton.parent().show();
                }

                for (var i = 0; i < tableItem.length; i++) {
                    if (i > 5) {
                        $(tableItem[i]).addClass('-hidden-item');
                    } else {
                        $(tableItem[i]).show();
                    }
                }

                tableButton.click(function () {
                    var items = currentWrapper.find('.-hidden-item');

                    if (items.hasClass('-opened')) {
                        items.removeClass('-opened');
                        items.fadeOut();
                        tableButton.text('Показать весь список');
                    } else {
                        items.addClass('-opened');
                        items.fadeIn();
                        tableButton.text('Скрыть список')
                    }
                });
            });
        }
    });
});