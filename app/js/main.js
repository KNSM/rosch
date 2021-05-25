$(document).ready(function () {
    var ov = $('.ov');

    //Склонение падежей
    function declOfNum(n, text_forms) {
        n = Math.abs(n) % 100;
        var n1 = n % 10;
        if (n > 10 && n < 20) {
            return text_forms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return text_forms[1];
        }
        if (n1 === 1) {
            return text_forms[0];
        }
        return text_forms[2];
    }

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
                                arrows: false,
                            }
                        }
                    ]
                });
            }

            if (currentSlider.length && currentSlider.hasClass('slider-nav')) {
                sliderWrapper.slick({
                    infinite: true,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false,
                    speed: 300,
                    slidesToShow: 1,
                    variableWidth: true,
                    swipeToSlide: true
                });
            }

            if (currentSlider.length && currentSlider.hasClass('slider-images')) {
                sliderWrapper.slick({
                    infinite: true,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    slidesToShow: 1,
                    fade: true,
                    cssEase: 'linear'
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

    //box-checkbox-count
    $(function () {
        var box = $('.box-checkbox-count-white');

        if (box.length) {
            box.each(function () {
                var checkbox = $(this).find('.input-checkbox'),
                    number = $(this).find('.input-number');

                $(this).click(function () {
                    if (checkbox.prop("checked")) {
                        number.prop('disabled', false);
                        number.focus();
                    } else {
                        number.prop('disabled', true);
                    }
                });
            });
        }
    });

    //form-inner-search
    $(function () {
        var form = $('.form.form-inner-search');

        if (form.length) {
            form.each(function () {
                var currentForm = $(this),
                    openButton = currentForm.find('.field-open-button .link'),
                    formFilter = currentForm.find('.item-filter');

                openButton.click(function () {
                    $(this).parents('.form__wrapper').toggleClass('-opened');
                    formFilter.slideToggle();
                });
            });
        }
    });

    //list-tags
    $(function () {
        var list = $('.list-tags');

        if (list.length) {
            list.each(function () {
                var currentList = $(this),
                    listMore = currentList.find('.item-more'),
                    listItems = currentList.find('.list__item'),
                    maxCount = 5;

                for (var i = 0; i < listItems.length; i++) {
                    if ($(listItems[i]).index() >= maxCount && !$(listItems[i]).hasClass('item-more')) {
                        $(listItems[i]).addClass('-hidden-item');
                    }
                }

                listMore.click(function () {
                    if ($(this).hasClass('-opened')) {
                        $(this).removeClass('-opened');
                        $(this).parent().find('.-hidden-item').css('display', 'none');
                        $(this).find('.text').text('Еще')
                    } else {
                        $(this).addClass('-opened');
                        $(this).parent().find('.-hidden-item').css('display', 'flex');
                        $(this).find('.text').text('Скрыть')
                    }
                });
            });
        }
    });

    //list-tags-close script
    $(function () {
        var list = $('.list-tags-close');

        list.each(function () {
            var currentList = $(this),
                listItem = currentList.find('.list__item');

            $(this).on('click', '.list__item .icon-close', function () {
                $(this).parent().addClass('-removed');

                if ($(this).parents('.list-tags-close').find('.list__item').not('.item-clear').length === 1) {
                    $(this).parents('.list-tags-close').find('.list__item').remove();
                } else {
                    $(this).parent().remove();
                }


            });

            $(this).on('click', '.list__item.item-clear', function () {
                $(this).parents('.list-tags-close').find('.list__item').remove();
            });
        });
    });

    //form give review
    $(function () {
        var form = $('.form.form-give-review');

        form.each(function () {
            var currentForm = $(this),
                fieldStarItem = currentForm.find('.field-star-count'),
                selector = currentForm.find('.selector'),
                tagList = currentForm.find('.item-tags .list-tags-close');

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
            });

            selector.on('click', '.selector-menu__item', function () {
                var menuItemText = $(this).html(),
                    menuItemId = $(this).data('id');

                if (!$(this).hasClass('-added')) {
                    $(this).addClass('-added');
                    tagList.append('<li class="list__item" data-id="' + menuItemId + '"><span class="text">' + menuItemText + '</span><i class="icon icon-close"></i></li>')
                }
            });

            tagList.on('click', '.list__item .icon-close', function () {
                var removedId = $(this).parent().data('id');

                selector.find('.selector-menu__item').each(function () {
                    if ($(this).data('id') === removedId) {
                        $(this).removeClass('-added');
                    }
                });
            });
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
                    captionWin = $(this).parents('.quiz__content').find('.item-win'),
                    captionLose = $(this).parents('.quiz__content').find('.item-lose'),
                    itemTrue;

                if (quiz.hasClass('quiz-sidebar')) {
                    itemTrue = 2;
                }

                items.click(function () {

                    if (!$(this).hasClass('-disabled')) {
                        items.addClass('-disabled');

                        if ($(this).data('item') === itemTrue) {
                            $(this).addClass('item-true');

                            if (captionWin.length) {
                                captionWin.fadeIn();
                            }
                        } else {
                            $(this).addClass('item-false');

                            for (var i = 0; i < items.length; i++) {
                                if ($(items[i]).data('item') === itemTrue) {
                                    $(items[i]).addClass('item-true');
                                }
                            }

                            if (captionLose.length) {
                                captionLose.fadeIn();
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

            var currentSelector = $(this),
                select = $(this).find('.select'),
                selectorMenu = $(this).find('.selector-menu'),
                selectorMenuInner = selectorMenu.find('.menu'),
                selectItems = select.find('option'),
                selectItemCaptionText = select.find('option.caption').html();

            $(this).append('<div class="selector-block"><button type="button" class="button"></button></div>');
            select.wrap('<div class="form-data"></div>');


            var selectorBlock = $(this).find('.selector-block'),
                selectorButton = selectorBlock.find('.button');

            selectItems.each(function () {

                if ($(this).attr('selected') && !$(this).hasClass('caption')) {
                    selectorMenuInner.append('<li data-id="' + $(this).attr('value') + '" class="selector-menu__item selected">' + $(this).html() + '</li>');

                    var selectorMenuItem = selectorMenuInner.find('.selector-menu__item.selected');

                    selectorButton.html($(this).html());
                    selectorButton.attr('data-id', selectorMenuItem.attr('data-id'));
                } else if ($(this).attr('selected') && $(this).hasClass('caption')) {
                    var selectorMenuItem = selectorMenuInner.find('.selector-menu__item.selected');

                    selectorButton.html($(this).html());
                    selectorButton.attr('data-id', selectorMenuItem.attr('data-id'));
                } else if (!$(this).hasClass('caption')) {
                    selectorMenuInner.append('<li data-id="' + $(this).attr('value') + '" class="selector-menu__item">' + $(this).html() + '</li>');
                }
            });

            var selectorMenuItem = selectorMenuInner.find('.selector-menu__item');

            $(document).mouseup(function (e) {
                if (!currentSelector.is(e.target) && currentSelector.has(e.target).length === 0 && selectorMenu.hasClass('-open')) {
                    selectorMenu.removeClass('-open');
                }
            });

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

                if ($(this).hasClass('selected') && selectItemCaptionText.length) {
                    selectorMenuItem.removeClass('selected');
                    selectorButton.html(selectItemCaptionText);
                    selectorMenu.removeClass('-open');
                    selectItems.each(function () {
                        if ($(this).hasClass('caption')) {
                            $(this).attr('selected', 'selected');
                        }
                    });
                } else {
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
                }
            });
        });
    });

    //form-assessment
    $(function () {
        var form = $('.form.form-assessment');

        if (form.length) {
            form.each(function () {
                var currentForm = $(this),
                    selector = currentForm.find('.selector'),
                    inputWrapper = currentForm.find('.input__field-wrapper'),
                    inputField = inputWrapper.find('.input__field'),
                    inputFieldClone = inputField.clone(),
                    addSelectorButton = currentForm.find('.form__button .link');

                selector.each(function () {
                    var currentSelector = $(this),
                        selectorOption = currentSelector.find('.select option'),
                        inputNumber = currentSelector.parent().find('.input[type=number]'),
                        selectorMenu = currentSelector.find('.selector-menu .menu');

                    for (var i = 0; i < inputField.length; i++) {
                        if (i > 0) {
                            $(inputField[i]).addClass('-hidden-item');
                        }
                    }

                    selectorMenu.on('click', '.selector-menu__item', function () {
                        var currentMenuItem = $(this);

                        selectorOption.each(function () {
                            if (($(this).attr('selected') === 'selected') && !$(this).hasClass('caption')) {
                                $(inputNumber[0]).removeAttr('disabled');
                                $(inputNumber[0]).focus();
                            } else if (($(this).attr('selected') === 'selected')) {
                                $(inputNumber[0]).attr('disabled', 'disabled');
                            }
                        });
                    })
                });

                var countFields = 1;

                addSelectorButton.click(function () {
                    if (countFields < inputField.length - 1) {
                        $(inputField[countFields]).removeClass('-hidden-item');
                        $(inputField[countFields]).show();

                        countFields = countFields + 1;
                    } else if (countFields === inputField.length - 1) {
                        $(inputField[countFields]).removeClass('-hidden-item');
                        $(inputField[countFields]).show();
                        addSelectorButton.prop('disabled', true);
                        addSelectorButton.html('Максимум 5 предметов');
                    }
                });
            });
        }
    });

    //table-catalog-count
    $(function () {
        var table = $('.table-catalog-count');

        if (table.length) {
            table.each(function () {
                var tableItems = $(this).find('tbody tr'),
                    tableBody = $(this).find('tbody'),
                    tableOpenButton = $(this).find('thead .col-name .link');

                tableOpenButton.find('.text').html(tableItems.length + ' ' + declOfNum(tableItems.length, ['факультет', 'факультета', 'факультетов']));

                tableOpenButton.click(function () {
                    $(this).toggleClass('-active');
                    tableBody.fadeToggle();
                });
            });
        }
    });

    //main catalog
    $(function () {
        var catalogWrapper = $('.catalog-main .catalog__wrapper');

        if (catalogWrapper != null) {

            catalogWrapper.each(function () {
                var catalogButton = $(this).parent().find('.catalog__button .link'),
                    currentWrapper = $(this),
                    catalogItem = $(this).find('.catalog__item'),
                    mobileOpenButton = $(this).find('.item__mobile-button .link');

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

                mobileOpenButton.click(function () {
                    var list = $(this).parents('.col-content').find('.item__list'),
                        text = $(this).parents('.col-content').find('.item__text');
                    if ($(this).hasClass('-opened')) {
                        $(this).removeClass('-opened');
                        $(this).find('.text').html('Развернуть');
                        if (list.length) {
                            list.slideUp();
                        }
                        if (text.length) {
                            text.slideUp();
                        }
                    } else {
                        $(this).addClass('-opened');
                        $(this).find('.text').html('Свернуть');
                        if (list.length) {
                            list.slideDown();
                        }
                        if (text.length) {
                            text.slideDown();
                        }
                    }
                });
            });
        }
    });

    //catalog detail item
    $(function () {
        var catalogWrapper = $('.catalog-detail-item .catalog__wrapper');

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

    //catalog detail olympiads
    function catalogDetailOlympiads() {
        var catalog = $('.catalog.catalog-detail-olympiads'),
            catalogItem = catalog.find('.catalog__item');

        catalogItem.each(function () {
            var list = $(this).find('.list-text-count-grid'),
                listItems = list.find('.list__item'),
                openButton = $(this).find('.item__mobile-button .link-text-primary');

            if ($(window).width() < 481) {
                if (listItems.length > 2) {
                    openButton.show();
                }

                for (var i = 0; i < listItems.length; i++) {
                    if (i > 1) {
                        $(listItems[i]).addClass('-hidden');
                    } else {
                        $(listItems[i]).css('display', 'grid');
                    }
                }

                openButton.click(function () {

                    var button = $(this),
                        items = list.find('.-hidden');

                    if (button.hasClass('-open')) {
                        console.log(2);
                        items.hide();
                        button.removeClass('-open');
                        button.find('.text').html('Развернуть');
                    } else {
                        console.log(1);
                        items.css('display', 'grid');
                        button.addClass('-open');
                        button.find('.text').html('Скрыть');
                    }
                });
            } else {
                openButton.hide();
            }
        });
    }

    catalogDetailOlympiads()
    $(window).on('resize', function () {
        catalogDetailOlympiads()
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

                $(this).parent().find('.catalog__title .count').html(catalogItem.length);

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

                catalogItem.each(function () {
                    var catalogItemWrapper = $(this).find('.catalog__item-wrapper');

                    catalogItemWrapper.each(function () {
                        var answerButtonOpen = $(this).find('.button-opener'),
                            answerForm = $(this).find('.item__form-answer'),
                            itemName = $(this).find('.item__name .text').text(),
                            itemNameAnswer = answerForm.find('.answer-count .count');

                        itemNameAnswer.text(itemName);

                        answerButtonOpen.click(function () {
                            var answerFormText = $(this).find('.text');
                            if ($(this).hasClass('-opened')) {
                                $(this).removeClass('-opened');
                                answerForm.fadeOut();
                                answerFormText.html('Ответить');
                            } else {
                                $(this).addClass('-opened');
                                answerForm.fadeIn();
                                answerFormText.html('Скрыть');
                            }
                        });
                    });
                });
            });
        }
    });

    //comments catalog
    $(function () {
        var catalogWrapper = $('.catalog-comments .catalog__wrapper');

        if (catalogWrapper != null) {

            catalogWrapper.each(function () {
                var catalogItemWrapper = $(this).find('.catalog__item-wrapper');

                $(this).parent().find('.catalog__title .count').html(catalogItemWrapper.length);
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

    // anchor link
    $(function () {
        var anchorLink = $("a.anchor-link[href^='#']");
        anchorLink.click(function () {
            var elementClick = $(this).attr("href");
            if ($(elementClick).length) {
                var destination = $(elementClick).offset().top;

                $('html,body').animate({scrollTop: destination - 80}, 1100);

                return false;
            }
        });
    });

    // input number ege
    $(function () {
        var input = $('.input-number-ege'),
            count = 0,
            maxlimit = 3,
            maxvalue = 100;

        input.keyup(function () {
            if ($(this)[0].value.length > maxlimit) {
                $(this)[0].value = $(this)[0].value.substring(0, maxlimit);
                if (Number($(this)[0].value) > maxvalue) {
                    $(this)[0].value = $(this)[0].value.substring(0, maxlimit - 1);
                }
            } else if (Number($(this)[0].value) > maxvalue) {
                $(this)[0].value = $(this)[0].value.substring(0, maxlimit - 1);
            } else {
                count = $(this)[0].value.length;
            }
        });
    });

    //grade item
    $(function () {
        var item = $('.grade__item');

        if (item.length) {
            item.each(function () {
                $(this).find('.icon').click(function () {
                    if ($(this).parent().hasClass('-active')) {
                        $(this).parent().removeClass('-active');
                    } else {
                        $(this).parent().parent().find('.grade__item').removeClass('-active');
                        $(this).parent().addClass('-active');
                    }
                });
            });
        }
    });
});