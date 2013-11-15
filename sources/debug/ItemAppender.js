/**
 * DebugPanel
 * Copyright (C) 2013 Last Unicorn
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

window.lu = window.lu || {};
lu.debug = lu.debug || {};

(function () {

    /**
     * Appends an jQuery element to the container.
     *
     * @constructor
     */
    lu.debug.ItemAppender = function () {

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