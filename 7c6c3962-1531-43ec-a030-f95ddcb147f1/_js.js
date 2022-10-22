$(document).ready(function () {
    var url = "https://gethelp.live.com/Pages/Feeds/";
    var provider = new DataAccess.Provider();
    var logic = new Logic.Controller(provider);
    logic.Init();
    var render = new Gui.Render(logic);
    render.Init();

    logic.LoadedAction(url, function (data) {
        if (data != false) {
            if (logic.contactUsData != undefined) {
                render.RendercontactUsData(logic.contactUsData);
            } else {
                render.RenderError();
                logic.noData();
            }
            render.WindowsResize();
        } else {
            render.RenderError();
            logic.noData();
            render.WindowsResize();
        }
    });
});

var DataAccess;
(function (DataAccess) {
    var Provider = (function () {
        function Provider() {
        }
        Provider.prototype.GetData = function (url, dataCallback) {
            var contactUsData;
            $.ajax({
                url: url,
                type: 'GET',
                async: false,
                jsonpCallback: 'jsonCallback',
                contentType: "application/json",
                dataType: 'jsonp',
                cache: false,
                success: function (data) {
                    if (data != null) {
                        contactUsData = data.category_groups;
                        dataCallback(data.category_groups);
                    } else {
                        dataCallback(false);
                    }
                },
                error: function (jqXHR, status, errorThrown, data) {
                    //alert(errorThrown + '\n' + status + '\n' + xhr.statusText);
                    dataCallback(false);
                }
            });
        };
        return Provider;
    })();
    DataAccess.Provider = Provider;
})(DataAccess || (DataAccess = {}));

var Logic;
(function (Logic) {
    var Controller = (function () {
        //constants: WP7, WP8, EN-US, #9B4F96  #333
        function Controller(provider) {
            this.provider = provider;
            this.lang = "";
            this.phoneType = "";
            Controller.prototype.provider = provider;
        }
        Controller.prototype.Init = function () {
            $.ajaxSetup({ cache: false });
            $("#support_landing_wp7, #support_landing_wp8").hide();
            $("#support_wp7, #support_wp8").show();
            $("#support_wp7").click(function () {
                window.open("http://" + location.host + location.pathname + "?wp7", "_self");
            });
            $("#support_wp8").click(function () {
                window.open("http://" + location.host + location.pathname + "?wp8", "_self");
            });

            Controller.prototype.lang = Controller.prototype.getLanguage();
            Controller.prototype.phoneType = Controller.prototype.getphoneType();
            Controller.prototype.styleSupportNav();
            Controller.prototype.noData();
        };

        Controller.prototype.LoadedAction = function (link, callback) {
            var articleslink = Controller.prototype.buildLink(link, Controller.prototype.lang, Controller.prototype.phoneType );
            //var articleslink = link;
            Controller.prototype.provider.GetData(articleslink, function (data) {
                if (data != false) {
                    Controller.prototype.contactUsData = data;
                    callback(Controller.prototype.contactUsData);
                } else {
                    if (Controller.prototype.lang != "EN-US") {
                        Controller.prototype.lang = "EN-US";
                        articleslink = Controller.prototype.buildLink(link, Controller.prototype.phoneType, Controller.prototype.lang);
                        Controller.prototype.provider.GetData(articleslink, function (data) {
                            if (data != false) {
                                Controller.prototype.contactUsData = data;
                                callback(Controller.prototype.contactUsData);
                            } else {
                                callback(false);
                            }
                        });
                    } else {
                        callback(false);
                    }
                }
            });
        };

        Controller.prototype.noData = function () {
            var wp7link = "http://go.microsoft.com/fwlink/p/?LinkId=226241";
            var wp8link = "http://go.microsoft.com/fwlink/p/?LinkId=261804";
            if (Controller.prototype.phoneType.toUpperCase() === "WP8") {
                $("#continueBtn").attr("href", wp8link);
            } else if (Controller.prototype.phoneType.toUpperCase() === "WP7") {
                $("#continueBtn").attr("href", wp7link);
            }
        };

        Controller.prototype.buildLink = function (link, lang, phoneType) {
            return (link + "/" + phoneType.toUpperCase() + "/" + phoneType.toLowerCase() + "_contactus_" + lang.toUpperCase() + "_js.js");
        };

        Controller.prototype.buildCommunityUrl = function (link, lang, phoneType) {
            return (link + "/" + lang.toLowerCase() + "/feed/f/winphone/" + phoneType.toLowerCase() + "?tab=QnA&status=answered&callback=jsoncallback");
        };

        Controller.prototype.styleSupportNav = function () {
            if (Controller.prototype.phoneType != "") {
                if (Controller.prototype.phoneType.toUpperCase() === "WP8") {
                    $("#support_wp8").css("color", "#9B4F96");
                    $("#support_wp7").css("color", "#333 ");
                    $('#support_wp8').unbind('mouseenter mouseleave');
                    $("#support_wp7").hover(function () {
                        $(this).css("color", "#9B4F96 ");
                    }, function () {
                        $(this).css("color", "#333 ");
                    });
                } else if (Controller.prototype.phoneType.toUpperCase() === "WP7") {
                    $("#support_wp7").css("color", "#9B4F96 ");
                    $("#support_wp8").css("color", "#333 ");
                    $('#support_wp7').unbind('mouseenter mouseleave');
                    $("#support_wp8").hover(function () {
                        $(this).css("color", "#9B4F96 ");
                    }, function () {
                        $(this).css("color", "#333 ");
                    });
                }
            }
        };

        Controller.prototype.getphoneType = function () {
            if (location.search.indexOf("wp8") != -1)
                return "WP8";
else if (location.search.indexOf("wp7") != -1)
                return "WP7";
else {
                if (s.prop17 != undefined && s.prop17 != "none") {
                    return s.prop17;
                } else
                    return "WP8";
            }
        };

        Controller.prototype.getLanguage = function () {
            var lang = $(document.getElementsByTagName('html')[0]).attr("lang").toUpperCase();
            if (lang === "" || lang === undefined)
                lang = s.eVar11.toUpperCase();
            return lang;
        };

        //Instrumentation for SiteCatalyst
        Controller.prototype.TrackCategory = function (catego_value) {
            s.trackExternalLinks = false;
            s.trackDownloadLinks = false;
            s.linkTrackEvents = "event71";
            s.linkTrackVars = 'eVar40,eVar71,events';
            s.events = "event71";
            s.eVar22 = s.pageName;
            s.eVar71 = catego_value;
            s.eVar40 = Controller.prototype.phoneType;
            s.tl(this, 'o', catego_value);
            s.eVar71 = "";
            s.linkTrackEvents = "None";
            s.linkTrackVars = "None";
            setTimeout(function () {
                s.trackExternalLinks = true;
                s.trackDownloadLinks = true;
            }, 1000);
        };

        Controller.prototype.TrackLinks = function (link, catego_value) {
            var catego_link_text = $(link)[0].text;
            s.trackExternalLinks = false;
            s.trackDownloadLinks = false;
            s.linkTrackEvents = "event3";
            s.linkTrackVars = 'eVar22,prop34,eVar34,eVar40,eVar71,events';
            s.events = "event3";
            s.eVar22 = s.pageName;
            s.eVar34 = s.prop34 = catego_link_text;
            s.eVar71 = catego_value;
            s.eVar40 = Controller.prototype.phoneType;
            s.tl(this, 'o', catego_link_text);
            s.eVar71 = "";
            s.linkTrackEvents = "None";
            s.linkTrackVars = "None";
            setTimeout(function () {
                s.trackExternalLinks = true;
                s.trackDownloadLinks = true;
            }, 1000);
        };

        Controller.prototype.TrackButton = function (catego_value) {
            s.trackExternalLinks = false;
            s.trackDownloadLinks = false;
            s.linkTrackEvents = "event72";
            s.linkTrackVars = 'eVar40,eVar71,events';
            s.events = "event72";
            s.eVar22 = s.pageName;
            s.eVar71 = catego_value;
            s.eVar40 = Controller.prototype.phoneType;
            s.tl(this, 'o', catego_value);
            s.eVar71 = "";
            s.linkTrackEvents = "None";
            s.linkTrackVars = "None";
            setTimeout(function () {
                s.trackExternalLinks = true;
                s.trackDownloadLinks = true;
            }, 1000);
        };
        return Controller;
    })();
    Logic.Controller = Controller;
})(Logic || (Logic = {}));

var Gui;
(function (Gui) {
    var Render = (function () {
        function Render(logic) {
            this.logic = logic;
            Render.prototype.logic = logic;
        }
        Render.prototype.Init = function () {
            Render.prototype.maxPosts = 5;
            if ($("body").attr("data-mobileBrowser") === "true") {
                $("#heroimage").attr("src", "http://cmsresources.windowsphone.com/windowsphone/en-US/how-to/support-hero-mobile-480.png");
                $("body").css("margin", "0");
                $("#heroimage").css("margin-top", "20px");
                $("#textContainer, .supportDiv,#ErrorLoading,#contactDiv, #marketingPage h1, #footer").css("margin-left", "20px");
                $("#textContainer, .supportDiv,#ErrorLoading,#contactDiv").css("margin-right", "20px");
                $(".supportDiv").width(440);
                $("#header").css("margin-top", "20px");
                $("#header").css("margin-left", "20px");
                $("#main").css("margin-top", "0px");
                $("#supportSubnav").css("margin-top", "-70px");
                $("#supportSubnav").css("margin-left", "20px");
                $("#supportSubnav li").css("display", "inline");
                $("#supportSubnav li").css("margin-right", "5px;");
            }
        };

        Render.prototype.RenderError = function () {
            $(".supportDiv, #marketingPage, .titleFeedStyle, #defaultText").hide();
            $("#ErrorLoading").show();
        };

        Render.prototype.RendercontactUsData = function (contactUsData) {
            $("#ErrorLoading").hide();
            $(".supportDiv, #marketingPage, .titleFeedStyle, #defaultText").show();
            Render.prototype.populateCategories(contactUsData);
            Render.prototype.getselectChanges(contactUsData);
        };

        Render.prototype.populateCategories = function (data) {
            $(".optionCategory").remove();
            for (var i = 0; i < data.length; i++) {
                $("#topic").append("<option class='optionCategory' id='category_" + i + "' value='" + data[i].category_value + "'>" + data[i].category_value + "</option>");
            }
        };

        Render.prototype.getselectChanges = function (data) {
            $("select").change(function () {
                $("select option:selected").each(function () {
                    Render.prototype.showRelatedArticles(data, $(this).text());
                    Render.prototype.logic.TrackCategory($(this).text());
                    if ($("select option:selected")[0].id != "category_0") {
                        $("#continueBtn").show();
                        $("#defaultText").hide();
                    } else {
                        $("#defaultText").show();
                        $("#continueBtn").hide();
                    }
                });
            }).trigger('change');
        };

        Render.prototype.showRelatedArticles = function (data, category) {
            $(".relatedArticlesListStyle").remove();
            $(".communityListStyle").remove();
            $("#communityTitle").hide();
            var catego = $.grep(data, function (e) {
                return e.category_value === category;
            });
            if (catego.length != 0)
                if (catego[0].category_links != undefined) {
                    $("#articlesTitle").show();
                    $("#relatedArticles").append("<ul class='relatedArticlesListStyle' id='relatedArticlesList'></ul>");
                    $("#relatedCommunityPosts").append("<ul class='communityListStyle' id='communityList'></ul>");
                    for (var i = 0; i < catego[0].category_links.length; i++) {
                        if (catego[0].category_links[i].link_type === "_help") {
                            if (catego[0].category_links[i].link_url.indexOf("windowsphone.com") > -1) {
                                $("#relatedArticlesList").append("<li  id='articleLink_" + i + "' class='articleLink'><a href='" + catego[0].category_links[i].link_url + "'>" + catego[0].category_links[i].link_text + "</a></li>");
                            } else {
                                $("#relatedArticlesList").append("<li  id='articleLink_" + i + "' class='articleLink'><a href='" + catego[0].category_links[i].link_url + "' target='_blank'>" + catego[0].category_links[i].link_text + "</a></li>");
                            }
                            $("#articleLink_" + i + " a").unbind('mousedown').bind("mousedown", function () {
                                Render.prototype.logic.TrackLinks(this, catego[0].category_value);
                            });
                        }
                        if (catego[0].category_links[i].link_type === "_contact") {
                            $("#continueBtn").attr("href", catego[0].category_links[i].link_url);
                            $("#continueBtn").unbind('mousedown').bind("mousedown", function () {
                                Render.prototype.logic.TrackButton(catego[0].category_value);
                            });
                        }
                        if (catego[0].category_links[i].link_type === "_community") {
                            $("#communityTitle").show();
                            $("#communityList").append("<li id='communitypost_" + i + "' class='communiypost'><a href='" + catego[0].category_links[i].link_url + "' target='_blank'>" + catego[0].category_links[i].link_text + "</a></li>");
                            $("#communityList a").unbind('mousedown').bind("mousedown", function () {
                                Render.prototype.logic.TrackLinks(this, catego[0].category_value);
                            });
                        }
                    }
                }
        };

        Render.prototype.WindowsResize = function () {
            var winWidth = $(window).width(), winHeight = $(window).height();
            $(window).resize(function () {
                var width = $(this).width();

                //New height and width
                var winNewWidth = $(window).width(), winNewHeight = $(window).height();

                if (winWidth != winNewWidth || winHeight != winNewHeight) {
                    if ($("body").attr("data-mobileBrowser") === "true") {
                        $(".supportDiv, #marketingPage, #ErrorLoading, #main").width(width);
                    } else {
                        if (width < 896) {
                            $(".supportDiv, #marketingPage, #ErrorLoading, #main").width(width);
                        } else {
                            $(".supportDiv, #marketingPage, #ErrorLoading, #main").width(896);
                        }
                    }
                }

                //Update the width and height
                winWidth = winNewWidth;
                winHeight = winNewHeight;
            });
        };
        return Render;
    })();
    Gui.Render = Render;
})(Gui || (Gui = {}));
//# sourceMappingURL=app.js.map
