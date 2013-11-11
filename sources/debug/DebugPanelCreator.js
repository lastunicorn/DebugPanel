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

            $panelElement = getSpecificElement(selector);

            if (!isPanelElementAcceptable()) {
                $panelElement = getDefaultElement();
            }

            if (!isPanelElementAcceptable()) {
                $panelElement = createDefaultElement();
            }

            ensureCssClassOnElement();

            return $panelElement;
        };

        function isPanelElementAcceptable() {
            return $panelElement !== undefined && $panelElement.length !== 0;
        }

        function getSpecificElement(selector) {
            return $(selector);
        }

        function getDefaultElement() {
            return $("#" + defaultElementId);
        }

        function createDefaultElement() {
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