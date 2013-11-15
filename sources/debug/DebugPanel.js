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

/**
 * Features implemented:
 * - writes messages of type: simple, info, warning and error.
 * - optionally writes a timestamp.
 * - can insert the new message at the beginning or at the end of the list.
 * - optionally can insert separators between messages.
 *
 * Future features:
 * - the types of the items able to display will be configurable.
 */

window.lu = window.lu || {};
lu.debug = lu.debug || {};

(function () {

    /**
     * Provides a way to interact with the Debug panel.
     *
     * @param configuration.containerSelector {String}
     *      The jQuery selector of the element where the debug information will be written.
     *      It can be also a jQuery object representing the element.
     *
     * @param configuration.locationOfNewItems {lu.debug.DebugItemLocation}
     *      The location where the new messages will be inserted.
     *
     * @param configuration.addTimestamp {Boolean}
     *      Specifies if it should prepend the timestamp in front of each line.
     *
     * @param configuration.addSeparator {Boolean}
     *      Specifies if it should insert a separator element between items.
     *
     * @constructor
     */
    lu.debug.DebugPanel = function (configuration) {
        var $panelElement;
        var itemCreator;
        var itemAppender;
        var $clientPanel;

        var options = {
            containerSelector: null,
            locationOfNewItems: lu.debug.DebugItemLocation.bottom,
            addTimestamp: true,
            addSeparator: false
        };

        /**
         * Create and displays a new item into the Debug panel.
         *
         * @param item.type {lu.debug.DebugItemLocation}
         *      The type of the new item to be displayed.
         *
         * @param item.message {String}
         *      The text message to be displayed in the new item.
         *      It may be also an array of strings, in which case every item in the array will be written on a separate line.
         *
         * @param item.addTimestamp {Boolean}
         *      Specifies if a timestamp should be added to the new item.
         */
        this.writeItem = function (item) {
            writeItem(item);
        };

        /**
         * Creates and displays a new item without a specific type.
         *
         * @param message
         *      The text message to be displayed in the new item.
         *      It may be also an array of strings, in which case every item in the array will be written on a separate line.
         */
        this.writeText = function (message) {
            writeItem({
                type: lu.debug.DebugItemType.none,
                message: message,
                addTimestamp: options.addTimestamp
            });
        };

        /**
         * Creates and displays a new item of type info.
         *
         * @param message
         *      The text message to be displayed in the new item.
         *      It may be also an array of strings, in which case every item in the array will be written on a separate line.
         */
        this.writeInfo = function (message) {
            writeItem({
                type: lu.debug.DebugItemType.info,
                message: message,
                addTimestamp: options.addTimestamp
            })
        };

        /**
         * Creates and displays a new item of type warning.
         *
         * @param message
         *      The text message to be displayed in the new item.
         *      It may be also an array of strings, in which case every item in the array will be written on a separate line.
         */
        this.writeWarning = function (message) {
            writeItem({
                type: lu.debug.DebugItemType.warning,
                message: message,
                addTimestamp: options.addTimestamp
            })
        };

        /**
         * Creates and displays a new item of type error.
         *
         * @param message
         *      The text message to be displayed in the new item.
         *      It may be also an array of strings, in which case every item in the array will be written on a separate line.
         */
        this.writeError = function (message) {
            writeItem({
                type: lu.debug.DebugItemType.error,
                message: message,
                addTimestamp: options.addTimestamp
            })
        };

        function writeItem(item) {
            var $item = itemCreator.createItem(item);
            itemAppender.appendElement($item, $clientPanel, options.locationOfNewItems, options.addSeparator);
        }

        (function initialize() {
            $.extend(options, configuration);

            var debugPanelCreator = new lu.debug.DebugPanelCreator();
            $panelElement = debugPanelCreator.getOrCreate();

            $clientPanel = $panelElement.find(".clientPanel");
            if ($clientPanel.length == 0) {
                $clientPanel = $("<div/>")
                    .addClass("clientPanel")
                    .appendTo($panelElement);
            }

            itemCreator = new lu.debug.DebugItemCreator();
            itemAppender = new lu.debug.ItemAppender();
        }());
    };

}());