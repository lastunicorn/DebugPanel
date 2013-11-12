/**
 * Created by alez on 11/10/13.
 */

window.lu = window.lu || {};
lu.debug = lu.debug || {};

(function () {

    /**
     * Appends an jQuery element to the container.
     *
     * @constructor
     */
    lu.debug.DebugItemAppender = function () {

        var $item,
            $element,
            _insertSeparator;

        this.appendElement = function ($childElement, $parentElement, location, insertSeparator) {
            $item = $childElement;
            $element = $parentElement;
            _insertSeparator = insertSeparator;

            if (location === lu.debug.DebugItemLocation.bottom) {
                insertItemAtBottom();
            }
            else {
                insertItemAtTop();
            }
        };

        function insertItemAtBottom() {
            var initialTopScroll = $element.scrollTop();
            var initialElementScrollHeight = $element.prop("scrollHeight");
            var elementHeight = $element.innerHeight();
            var isInitialBottomMostScroll = initialTopScroll + elementHeight === initialElementScrollHeight;

            if (isSeparatorNeeded()) {
                createSeparator().appendTo($element);
            }

            $element.append($item);

            if (isInitialBottomMostScroll) {
                var latestElementScrollHeight = $element.prop("scrollHeight");
                var latestTopScroll = latestElementScrollHeight - elementHeight;
                $element.scrollTop(latestTopScroll);
            }
        }

        function insertItemAtTop() {
            var initialTopScroll = $element.scrollTop();
            var initialElementScrollHeight = $element.prop("scrollHeight");
            var initialBottomScroll = initialElementScrollHeight - initialTopScroll;
            var isInitialTopMostScroll = initialTopScroll === 0;

            if (isSeparatorNeeded()) {
                createSeparator().prependTo($element);
            }

            $element.prepend($item);

            if (isInitialTopMostScroll) {
                $element.scrollTop(0);
            } else {
                var latestElementScrollHeight = $element.prop("scrollHeight");
                var latestTopScroll = latestElementScrollHeight - initialBottomScroll;
                $element.scrollTop(latestTopScroll);
            }
        }

        function isSeparatorNeeded() {
            var containsChildren = $element.children().length > 0;
            return _insertSeparator && containsChildren;
        }

        function createSeparator() {
            return $("<div/>")
                .addClass("separator");
        }
    };

}());