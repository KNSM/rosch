$(document).ready(function () {
    var ov = $('.ov');

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
                    responsive: [
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                arrows:false,
                            }
                        }
                    ]
                });
            }

            if (currentSlider.length && currentSlider.hasClass('slider-nav')) {
                sliderWrapper.slick({
                    infinite: false,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false,
                    speed: 300,
                    slidesToShow: 1,
                    variableWidth: true,
                    swipeToSlide: true
                });
            }
        });
    });

    //fakeScroll
    $(function () {
        var fakeScrolls = document.querySelectorAll('.selector-menu'), fakeScroll;
        for (fakeScroll = 0; fakeScroll < fakeScrolls.length; fakeScroll++) {
            fakeScrolls[fakeScroll].fakeScroll();
        }
    });

    //modal
    $(function () {
        var modal = $('.modal'),
            modalClose = modal.find('modal__close');
            link = $('[data-window]');

        link.click(function () {
            if ($('#' + $(this).data('window')).length) {
                ov.addClass('-window-active');
                $('#' + $(this).data('window')).addClass('-window-active');
            }
        });

        modalClose.click(function () {
            $('.-window-active').removeClass('-window-active');
        });
    });

    //list-tags-close script
    $(function () {
        var list = $('.list-tags-close');

        list.each(function () {
            var currentList = $(this),
                listItem = currentList.find('.list__item'),
                listItemClose = listItem.find('.icon-close');

            listItemClose.click(function () {
                $(this).parent().addClass('-removed');
                $(this).parent().remove();

                if (listItem.not('.-removed').length === 0) {
                    currentList.hide();
                }
            });
        });
    });

    //form give review
    $(function () {
        var form = $('.form.form-give-review');

        form.each(function () {
            var currentForm = $(this),
                fieldStarItem = currentForm.find('.field-star-count');

            fieldStarItem.each(function () {
                var currentItem = $(this),
                    currentItemData = $(this).data('field'),
                    listItem = $(this).find('.list-rating-stars .list__item');

                for (var i = 0; i < listItem.length; i++) {
                    $(listItem[i]).mouseover(function () {
                        var listItemActive = listItem.slice(0, ($(this).index() + 1));
                        if (!listItemActive.find('.icon').hasClass('-active-clicked')) {
                            listItemActive.find('.icon').addClass('-active');
                        }
                    });
                    $(listItem[i]).mouseout(function () {
                        var listItemActive = listItem.slice(0, ($(this).index() + 1));
                        if (!listItemActive.find('.icon').hasClass('-active-clicked')) {
                            listItemActive.find('.icon').removeClass('-active');
                        }
                    });

                    $(listItem[i]).click(function () {
                        var listItemActive = listItem.slice(0, ($(this).index() + 1)),
                            listItemDisactive = listItem.slice(($(this).index() + 1), i);

                        listItemActive.find('.icon').addClass('-active -active-clicked');
                        listItemDisactive.find('.icon').removeClass('-active -active-clicked');
                    });
                }
            })
        });
    });

    //header control menu opener
    $(function () {
        var headerMenu = $('.header__user-control .item-menu'),
            headerMenuArrow = headerMenu.find('.open-icon');

        headerMenuArrow.click(function () {
            if (headerMenu.hasClass('-window-active')) {
                headerMenu.removeClass('-window-active');
            } else {
                $('.-window-active').removeClass('-window-active');
                $('.header__menu').removeClass('-active');
                headerMenu.addClass('-window-active');
            }
        });
    });

    //header menu opener
    $(function () {
        var headerMenu = $('.header__menu'),
            headerNav = $('.header__nav'),
            headerNavItem = headerNav.find('.list__item'),
            headerNavItemArrow = headerNavItem.find('.icon-arrow-down'),
            htmlBody = $('html, body');

        headerMenu.click(function () {
            $('.header__user-control .item-menu').removeClass('-window-active');

            if ($(this).hasClass('-active')) {
                htmlBody.css('overflow-y', 'auto');
                $(this).removeClass('-active');
                headerNav.removeClass('-window-active');
                ov.removeClass('-window-active');
            } else {
                htmlBody.css('overflow-y', 'hidden');
                $(this).addClass('-active');
                headerNav.addClass('-window-active');
                ov.addClass('-window-active');
            }
        });

        headerNavItemArrow.click(function () {
            if ($(this).parent().find('.sublist').length) {
                $(this).parent().find('.sublist').slideToggle();
                $(this).toggleClass('-active');
            }
        });
    });

    //recommend special
    function recommendSpecial() {
        var recommendWrapper = $('.recommend-special .recommend__wrapper'),
            wWidth = $(window).width();
        if (recommendWrapper != null && wWidth > 991) {
            if (recommendWrapper.hasClass('slick-slider')) {
                recommendWrapper.slick('unslick');
            }

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
        } else if (recommendWrapper != null && wWidth <= 991) {
            var recommendItem = recommendWrapper.find('.recommend__item'),
                recommendButton = recommendWrapper.parent().find('.recommend__button');

            recommendButton.hide();

            recommendItem.show();
            recommendItem.removeClass('-hidden-item');

            recommendWrapper.not('.slick-initialized').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                variableWidth: true,
                swipeToSlide: true
            });
        }
    }

    recommendSpecial();
    $(window).on('resize', function () {
        recommendSpecial();
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

    //main catalog form mobile script
    $(function () {
        var formTitle = $('.form.form-catalog-main .form__title'),
            formWrapper = $('.form.form-catalog-main .form__item-wrapper');

        formTitle.click(function () {
            formWrapper.slideToggle();
        });
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
                var tableButton = $(this).parents('.section__table-wrapper').find('.table__button .link'),
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

    //promo copy script
    $(function () {
        new ClipboardJS('.promo-copy');

        $('.promo-copy').click(function () {
            var innerHtml = $(this).html();
            event.preventDefault();
            $(this).html('Скопировано!');
            setTimeout(function () {
                $('.promo-copy').html(innerHtml);
            }, 2000);
        });
    });

    //ov
    $(function () {
        ov.click(function () {
            $('.-window-active').removeClass('-window-active');
        });
    });

    //back to top link
    function backLink() {
        var showHeight = $('html, body').outerHeight(true) / 3,
            backLink = $('.back-to-top');

        if ($(window).scrollTop() > showHeight) {
            backLink.addClass('-active');
        } else {
            backLink.removeClass('-active');
        }
    }

    backLink();

    $(window).on('scroll', function () {
        backLink();
    });

    $('.back-to-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 1100);
    });
});