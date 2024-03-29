/*! Lity - v2.3.1 - 2018-04-20
 * http://sorgalla.com/lity/
 * Copyright (c) 2015-2018 Jan Sorgalla; Licensed MIT */
! function (window, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = factory(window, require("jquery")) : window.lity = factory(window, window.jQuery || window.Zepto)
}("undefined" != typeof window ? window : this, function (window, $) {
    "use strict";
    var document = window.document,
        _win = $(window),
        _deferred = $.Deferred,
        _html = $("html"),
        _instances = [],
        _attrAriaHidden = "aria-hidden",
        _dataAriaHidden = "lity-" + _attrAriaHidden,
        _focusableElementsSelector = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',
        _defaultOptions = {
            esc: !0,
            handler: null,
            handlers: {
                image: imageHandler,
                inline: inlineHandler,
                youtube: youtubeHandler,
                vimeo: vimeoHandler,
                googlemaps: googlemapsHandler,
                facebookvideo: facebookvideoHandler,
                iframe: iframeHandler
            },
            template: '<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'
        },
        _imageRegexp = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
        _youtubeRegex = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
        _vimeoRegex = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
        _googlemapsRegex = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
        _facebookvideoRegex = /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,
        _transitionEndEvent = function () {
            var el = document.createElement("div"),
                transEndEventNames = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var name in transEndEventNames)
                if (void 0 !== el.style[name]) return transEndEventNames[name];
            return !1
        }();

    function transitionEnd(element) {
        var deferred = _deferred();
        return _transitionEndEvent && element.length ? (element.one(_transitionEndEvent, deferred.resolve), setTimeout(deferred.resolve, 500)) : deferred.resolve(), deferred.promise()
    }

    function settings(currSettings, key, value) {
        if (1 === arguments.length) return $.extend({}, currSettings);
        if ("string" == typeof key) {
            if (void 0 === value) return void 0 === currSettings[key] ? null : currSettings[key];
            currSettings[key] = value
        } else $.extend(currSettings, key);
        return this
    }

    function parseQueryParams(params) {
        for (var pairs = decodeURI(params.split("#")[0]).split("&"), obj = {}, p, i = 0, n = pairs.length; i < n; i++) pairs[i] && (obj[(p = pairs[i].split("="))[0]] = p[1]);
        return obj
    }

    function appendQueryParams(url, params) {
        return url + (url.indexOf("?") > -1 ? "&" : "?") + $.param(params)
    }

    function transferHash(originalUrl, newUrl) {
        var pos = originalUrl.indexOf("#");
        return -1 === pos ? newUrl : (pos > 0 && (originalUrl = originalUrl.substr(pos)), newUrl + originalUrl)
    }

    function error(msg) {
        return $('<span class="lity-error"/>').append(msg)
    }

    function imageHandler(target, instance) {
        var desc = instance.opener() && instance.opener().data("lity-desc") || "Image with no description",
            img = $('<img src="' + target + '" alt="' + desc + '"/>'),
            deferred = _deferred(),
            failed = function () {
                deferred.reject(error("Failed loading image"))
            };
        return img.on("load", function () {
            if (0 === this.naturalWidth) return failed();
            deferred.resolve(img)
        }).on("error", failed), deferred.promise()
    }

    function inlineHandler(target, instance) {
        var el, placeholder, hasHideClass;
        try {
            el = $(target)
        } catch (e) {
            return !1
        }
        return !!el.length && (placeholder = $('<i style="display:none !important"/>'), hasHideClass = el.hasClass("lity-hide"), instance.element().one("lity:remove", function () {
            placeholder.before(el).remove(), hasHideClass && !el.closest(".lity-content").length && el.addClass("lity-hide")
        }), el.removeClass("lity-hide").after(placeholder))
    }

    function youtubeHandler(target) {
        var matches = _youtubeRegex.exec(target);
        return !!matches && iframeHandler(transferHash(target, appendQueryParams("https://www.youtube" + (matches[2] || "") + ".com/embed/" + matches[4], $.extend({
            autoplay: 1
        }, parseQueryParams(matches[5] || "")))))
    }

    function vimeoHandler(target) {
        var matches = _vimeoRegex.exec(target);
        return !!matches && iframeHandler(transferHash(target, appendQueryParams("https://player.vimeo.com/video/" + matches[3], $.extend({
            autoplay: 1
        }, parseQueryParams(matches[4] || "")))))
    }

    function facebookvideoHandler(target) {
        var matches = _facebookvideoRegex.exec(target);
        return !!matches && (0 !== target.indexOf("http") && (target = "https:" + target), iframeHandler(transferHash(target, appendQueryParams("https://www.facebook.com/plugins/video.php?href=" + target, $.extend({
            autoplay: 1
        }, parseQueryParams(matches[4] || ""))))))
    }

    function googlemapsHandler(target) {
        var matches = _googlemapsRegex.exec(target);
        return !!matches && iframeHandler(transferHash(target, appendQueryParams("https://www.google." + matches[3] + "/maps?" + matches[6], {
            output: matches[6].indexOf("layer=c") > 0 ? "svembed" : "embed"
        })))
    }

    function iframeHandler(target) {
        return '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + target + '"/></div>'
    }

    function winHeight() {
        return document.documentElement.clientHeight ? document.documentElement.clientHeight : Math.round(_win.height())
    }

    function keydown(e) {
        var current = currentInstance();
        current && (27 === e.keyCode && current.options("esc") && current.close(), 9 === e.keyCode && handleTabKey(e, current))
    }

    function handleTabKey(e, instance) {
        var focusableElements = instance.element().find(_focusableElementsSelector),
            focusedIndex = focusableElements.index(document.activeElement);
        e.shiftKey && focusedIndex <= 0 ? (focusableElements.get(focusableElements.length - 1).focus(), e.preventDefault()) : e.shiftKey || focusedIndex !== focusableElements.length - 1 || (focusableElements.get(0).focus(), e.preventDefault())
    }

    function resize() {
        $.each(_instances, function (i, instance) {
            instance.resize()
        })
    }

    function registerInstance(instanceToRegister) {
        1 === _instances.unshift(instanceToRegister) && (_html.addClass("lity-active"), _win.on({
            resize: resize,
            keydown: keydown
        })), $("body > *").not(instanceToRegister.element()).addClass("lity-hidden").each(function () {
            var el = $(this);
            void 0 === el.data(_dataAriaHidden) && el.data(_dataAriaHidden, el.attr(_attrAriaHidden) || null)
        }).attr(_attrAriaHidden, "true")
    }

    function removeInstance(instanceToRemove) {
        var show;
        instanceToRemove.element().attr(_attrAriaHidden, "true"), 1 === _instances.length && (_html.removeClass("lity-active"), _win.off({
            resize: resize,
            keydown: keydown
        })), (show = (_instances = $.grep(_instances, function (instance) {
            return instanceToRemove !== instance
        })).length ? _instances[0].element() : $(".lity-hidden")).removeClass("lity-hidden").each(function () {
            var el = $(this),
                oldAttr = el.data(_dataAriaHidden);
            oldAttr ? el.attr(_attrAriaHidden, oldAttr) : el.removeAttr(_attrAriaHidden), el.removeData(_dataAriaHidden)
        })
    }

    function currentInstance() {
        return 0 === _instances.length ? null : _instances[0]
    }

    function factory(target, instance, handlers, preferredHandler) {
        var handler = "inline",
            content, currentHandlers = $.extend({}, handlers);
        return preferredHandler && currentHandlers[preferredHandler] ? (content = currentHandlers[preferredHandler](target, instance), handler = preferredHandler) : ($.each(["inline", "iframe"], function (i, name) {
            delete currentHandlers[name], currentHandlers[name] = handlers[name]
        }), $.each(currentHandlers, function (name, currentHandler) {
            return !currentHandler || (!(!currentHandler.test || currentHandler.test(target, instance)) || (!1 !== (content = currentHandler(target, instance)) ? (handler = name, !1) : void 0))
        })), {
            handler: handler,
            content: content || ""
        }
    }

    function Lity(target, options, opener, activeElement) {
        var self = this,
            result, isReady = !1,
            isClosed = !1,
            element, content;

        function ready(result) {
            content = $(result).css("max-height", winHeight() + "px"), element.find(".lity-loader").each(function () {
                var loader = $(this);
                transitionEnd(loader).always(function () {
                    loader.remove()
                })
            }), element.removeClass("lity-loading").find(".lity-content").empty().append(content), isReady = !0, content.trigger("lity:ready", [self])
        }
        options = $.extend({}, _defaultOptions, options), element = $(options.template), self.element = function () {
            return element
        }, self.opener = function () {
            return opener
        }, self.options = $.proxy(settings, self, options), self.handlers = $.proxy(settings, self, options.handlers), self.resize = function () {
            isReady && !isClosed && content.css("max-height", winHeight() + "px").trigger("lity:resize", [self])
        }, self.close = function () {
            if (isReady && !isClosed) {
                isClosed = !0, removeInstance(self);
                var deferred = _deferred();
                if (activeElement && (document.activeElement === element[0] || $.contains(element[0], document.activeElement))) try {
                    activeElement.focus()
                } catch (e) {}
                return content.trigger("lity:close", [self]), element.removeClass("lity-opened").addClass("lity-closed"), transitionEnd(content.add(element)).always(function () {
                    content.trigger("lity:remove", [self]), element.remove(), element = void 0, deferred.resolve()
                }), deferred.promise()
            }
        }, result = factory(target, self, options.handlers, options.handler), element.attr(_attrAriaHidden, "false").addClass("lity-loading lity-opened lity-" + result.handler).appendTo("body").focus().on("click", "[data-lity-close]", function (e) {
            $(e.target).is("[data-lity-close]") && self.close()
        }).trigger("lity:open", [self]), registerInstance(self), $.when(result.content).always(ready)
    }

    function lity(target, options, opener) {
        target.preventDefault ? (target.preventDefault(), target = (opener = $(this)).data("lity-target") || opener.attr("href") || opener.attr("src")) : opener = $(opener);
        var instance = new Lity(target, $.extend({}, opener.data("lity-options") || opener.data("lity"), options), opener, document.activeElement);
        if (!target.preventDefault) return instance
    }
    return imageHandler.test = function (target) {
        return _imageRegexp.test(target)
    }, lity.version = "2.3.1", lity.options = $.proxy(settings, lity, _defaultOptions), lity.handlers = $.proxy(settings, lity, _defaultOptions.handlers), lity.current = currentInstance, $(document).on("click.lity", "[data-lity]", lity), lity
});