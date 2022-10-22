var gs = {};

(function ($) {
    "use strict"

    var cards = [],
        selectItems,
        comboItems,
        clearButton;

    gs = {
        // initializes the following on the filter page...
        // - card grid object setup
        // - clear button setup
        // - mdf selects events setup
        // - window history change events
        // - mdf combo input initialization
        filterPageInit: function (selectItems) {
            var cardsCollection = document.getElementById('gsCardGrid').children,
                collectionToArr = Array.prototype.slice.call(cardsCollection);

            this.selectItems = selectItems;

            // create array of all cards
            collectionToArr.forEach(function (card) {
                var newCard = {};

                newCard.element = $(card);
                newCard['phase'] = card.dataset.gsPhase;
                newCard['category'] = card.dataset.gsCategory;
                newCard['platform'] = card.dataset.gsPlatform;
                newCard['feature'] = card.dataset.gsFeature;
                cards.push(newCard);
            });

            // initalize the clear button
            this.clearButton = $('#gs-button-clear');
            this.clearButton.on('click', (function () {
                this.addRemoveUrlParams(false, null, null, true);
                this.processSelects();
                this.comboItems[0].comboBoxElement.reset();
            }).bind(this));

            // setup selects
            this.setupSelects();

            // history event to processCardGrid on history change
            window.onpopstate = (function (event) {
                this.processSelects();
            }).bind(this);

            // initalize the combo mdf component
            mwfAutoInit.ComponentFactory.create([{
                component: mwfAutoInit.Combo,
                elements: [document.getElementById('gs-combo')],
                eventToBind: 'DOMContentLoaded',
                callback: (function (comboItems) {
                    this.comboItems = comboItems;
                    this.setupCombo();
                }).bind(this)
            }]);

            $('#filterAndSearchHeader').css('visibility', 'visible')
        },

        // Setup select menu click events
        setupSelects: function () {
            var urlParams = window.location.search.substring(1).split('&'),
                paramsObj = this.getUrlParams();

            this.selectItems.forEach((function (selectItem) {
                // type is used to determine what select we are on
                var selectItemDataType = selectItem.element.dataset.gsType;

                // loop through url params to see if select type exist
                for (var key in paramsObj) {
                    var options = selectItem.select.options;

                    if (selectItemDataType === key) {
                        for (var i = 0; i < options.length; i++) {
                            if (options[i].dataset.gsValue === paramsObj[key]) {
                                selectItem.setSelectedItem(options[i].value);
                                this.addRemoveSelectHightlight(selectItem, paramsObj[key]);
                                break;
                            }
                        }
                    }
                }

                //set click events
                selectItem.subscribe({
                    onSelectionChanged: (function (notification) {
                        var selectedOptionData = selectItem.select.selectedOptions[0].dataset.gsValue,
                            addUrl = true;


                        if (selectedOptionData.indexOf('all') > -1) {
                            addUrl = false;
                        }

                        // calls only performed on user interaction
                        if (notification.userInitiated) {
                            this.comboItems[0].comboBoxElement.reset();
                            this.addRemoveUrlParams(addUrl, selectItemDataType, selectedOptionData);
                            this.processCardGrid();
                        }

                        this.addRemoveSelectHightlight(selectItem, selectedOptionData);
                    }).bind(this)
                });
            }).bind(this));

            this.processCardGrid();
        },

        // Process select menu on history change
        processSelects: function () {
            var urlParams = window.location.search.substring(1).split('&'),
                paramsObj = this.getUrlParams(),
                keys = Object.keys(paramsObj);

            this.selectItems.forEach((function (selectItem) {
                // type is used to determine what select we are on
                var selectItemDataType = selectItem.element.dataset.gsType,
                    options = selectItem.select.options,
                    noParamFound = true;

                // loop through url params to see if select type exist.
                for (var i = 0; i < keys.length; i++) {
                    if (selectItemDataType === keys[i]) {
                        for (var j = 0; j < options.length; j++) {
                            if (options[j].dataset.gsValue === paramsObj[keys[i]]) {
                                selectItem.setSelectedItem(options[j].value);
                                //this.addRemoveSelectHightlight(selectItem, paramsObj[keys[i]]);
                                noParamFound = false;
                                break;
                            }
                        }
                        break;
                    }
                }

                if (noParamFound) {
                    selectItem.setSelectedItem(options[0].value);
                }
            }).bind(this));

            this.processCardGrid();
        },

        // setup the combo mdf componenet
        // @PARAM: comboItems - array (list of combo elements)
        setupCombo: function () {
            this.comboItems[0].subscribe({
                onSelectionChanged: (function (notification) {

                    // calls only performed on user interaction
                    if (notification.userInitiated) {
                        this.processCombo(notification.value);
                    }

                }).bind(this)
            });
        },

        // process the combo input user selection
        // @PARAM: comboValue - string (combo's value)
        processCombo: function (comboValue) {
            var options = this.comboItems[0].listItems,
                optionNotFound = true;

            for (var i = 0; i < options.length; i++) {
                if (options[i].innerText === comboValue) {
                    optionNotFound = false;
                    this.addRemoveUrlParams(true, options[i].dataset.gsType, options[i].dataset.gsValue, true);
                    break;
                }
            }

            if (optionNotFound) {
                this.addRemoveUrlParams(false, null, null, true);
            }

            // Once the combo is finished setting up the url, we need to change the states of the selects
            this.processSelects();
        },

        // Add or Remove query params in the url, uses history.pushState to add history with page reload
        // @PARAM: addUrl - boolean (if false, remove the query if exist)
        // @PARAM: key - string (menu link data-type value)
        // @PARAM: value - string (menu link data-gs-value value)
        // @PARAM: clearAll - boolean (flag to replace all querys with the passed key/value params)
        addRemoveUrlParams: function (addUrl, key, value, clearAll) {
            var baseUrl = [location.protocol, '//', location.host, location.pathname].join(''),
                query = '';

            // if we don't want to clear the existing params from the url, process the url and add new params
            if (!clearAll) {
                var urlParams = document.location.search.substr(1).split('&'),
                    paramObj = {};

                //remove empty arr value if exist
                if (urlParams[0] === '') {
                    urlParams = [];
                }

                if (urlParams.length > 0) {
                    urlParams.forEach(function (val, index) {
                        var arr = val.split('=');
                        paramObj[arr[0]] = arr[1];
                    });
                }

                if (addUrl) {
                    paramObj[key] = value;
                } else {
                    delete paramObj[key];
                }

                var firstKey = true;
                for (var key in paramObj) {
                    // if feature param is detected, disregard and continue
                    if (key === 'feature') {
                        continue;
                    }
                    if (firstKey) {
                        query += "?";
                        firstKey = false;
                    } else {
                        query += "&";
                    }
                    query += [key, "=", paramObj[key]].join('');
                }
            } else {
                if (addUrl) {
                    query = ["?", key, "=", value].join('');
                }
            }

            // set history state
            history.pushState(null, null, [baseUrl, query].join(''));
        },

        // Read url params and show/hide grid items on the filter page
        processCardGrid: function () {
            var paramsObj = this.getUrlParams();

            //loop through cards
            cards.forEach(function (cardObj) {
                var showCard = true;

                // hide cards
                cardObj.element.removeClass('show');

                for (var key in paramsObj) {
                    var cardParam = cardObj[key];

                    // if card param is empty or not found, set flag to not show card
                    if (cardParam.length === 0 || cardParam.indexOf(paramsObj[key]) === -1) {
                        showCard = false;
                        break;
                    }
                }

                if (showCard) {
                    // ui repaint hack
                    setTimeout(function () {
                        cardObj.element.addClass('show');
                    }, 300);
                }
            });

            // show/hide clear button
            if (Object.keys(paramsObj).length === 0) {
                this.clearButton.attr('disabled', true);
                this.clearButton.removeClass('show');
            } else {
                this.clearButton.attr('disabled', false);
                this.clearButton.addClass('show');
            }
        },

        // Add or Remove class "highlight" on select if the word "any" isn't present in the select value
        // @PARAM: selectItem - object
        // @PARAM: selectItem - string (the dataset value for the selected option)
        addRemoveSelectHightlight: function (selectItem, selectedDatasetValue) {
            // add class to show highlight on select
            if (selectedDatasetValue === 'all') {
                $(selectItem.element).removeClass('highlight');
            } else {
                $(selectItem.element).addClass('highlight');
            }
        },

        // Captures the url params
        // @RETURNS: object - key/values of the url params
        getUrlParams: function () {
            var urlParams = window.location.search.substring(1).split("&"),
                paramsFoundObj = {};

            // create key/values of url params
            if (urlParams[0] !== '') {
                urlParams.forEach(function (param) {
                    var arr = param.split('=');

                    // add list of data-gs-type values to cardTypeArr
                    paramsFoundObj[arr[0]] = arr[1];
                });
            }

            return paramsFoundObj;
        },

        // IN DEVELOPMENT
        // Initializes the scroll menu on the landing page
        initScrollMenu: function () {
            var heroElm = document.getElementById('gs-landing-hero'),
                menuContainer = document.getElementById('gs-nav'),
                menuItems = menuContainer.getElementsByTagName('A'),
                navBar = document.getElementById('gs-nav'),
                animateTarget = $("html, body"),
                currentlyActiveLink = null,
                currentlyAnimating = false,
                menuHeight = menuContainer.offsetHeight;

            // Setup waypoint on the hero to remove active state styling on menu item
            var landingHeroWaypoint = new Waypoint({
                element: heroElm,
                handler: function (direction) {
                    if (direction === 'up') {
                        toggleMenuActive(null, true);
                    }
                },
                offset: '-50%'
            });

            for (var i = 0; i < menuItems.length; i++) {
                var menuItem = menuItems[i],
                    section = document.getElementById('gs-section-' + menuItem.dataset.gsValue);

                (function (menuItem, section) {
                    var waypoint = new Waypoint({
                        element: section,
                        handler: function () {
                            if (!currentlyAnimating) {
                                toggleMenuActive(menuItem);
                            }
                        },
                        offset: navBar.clientHeight + 'px'
                    });

                    $(menuItem).on('click', function (e) {
                        e.preventDefault();

                        // Set flag to prevent waypoints events from firing
                        currentlyAnimating = true;

                        // clear previous animation
                        animateTarget.clearQueue();
                        animateTarget.stop();

                        toggleMenuActive(menuItem);
                        animateTarget.animate({
                            scrollTop: $(section).offset().top - (menuHeight - 2)
                        }, {
                            duration: 600,
                            complete: function () {
                                currentlyAnimating = false;
                            }
                        });
                    });
                })(menuItem, section);
            }

            // Add/removes class to visually show menu active state
            // @PARAM: menuItem - element (menu link)
            // @PARAM: removeActiveState - boolean
            function toggleMenuActive(menuItem, removeActiveState) {
                if (removeActiveState) {
                    $(currentlyActiveLink).removeClass('active');
                    currentlyActiveLink = menuItem;
                    return;
                }

                if (currentlyActiveLink) {
                    $(currentlyActiveLink).removeClass('active');
                }

                currentlyActiveLink = menuItem;
                $(currentlyActiveLink).addClass('active');
            }
        }
    }
})(jQuery);