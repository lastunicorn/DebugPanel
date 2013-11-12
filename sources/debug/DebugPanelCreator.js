/**
 * Created by alez on 11/10/13.
 */

window.lu = window.lu || {};
lu.debug = lu.debug || {};

(function ($) {

    lu.debug.DebugPanelCreator = function () {
        var defaultElementId = "luDebug";
        var className = "lu-debug";
        var $panelElement;

        this.getOrCreate = function (selector) {

            $panelElement = getSpecifiedPanelElement(selector);

            if (!isPanelElementAcceptable()) {
                $panelElement = getDefaultPanelElement();
            }

            if (!isPanelElementAcceptable()) {
                $panelElement = createDefaultPanelElement();
            }

            ensureCssClassOnElement();

            return $panelElement;
        };

        function isPanelElementAcceptable() {
            return $panelElement !== undefined && $panelElement.length !== 0;
        }

        function getSpecifiedPanelElement(selector) {
            return $(selector);
        }

        function getDefaultPanelElement() {
            return $("#" + defaultElementId);
        }

        function createDefaultPanelElement() {
            var $div = $("<div/>")
                .attr("id", defaultElementId);

            $(document.body).append($div);

            return  $div;
        }

        function ensureCssClassOnElement() {
            if (!$panelElement.hasClass(className)) {
                $panelElement.addClass(className);
            }
        }
    };

}(jQuery));