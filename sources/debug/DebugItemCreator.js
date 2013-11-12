/**
 * Created by alez on 11/10/13.
 */

/**
 * - writes simple, info, warning and error messages.
 * - optionally writes a timestamp.
 * - can write at the beginning or at the end of the list.
 */

window.lu = window.lu || {};
lu.debug = lu.debug || {};

(function ($) {

    /**
     * Creates jQuery elements for the messages that needs to be displayed.
     *
     * @constructor
     */
    lu.debug.DebugItemCreator = function () {

        this.createItem = function (item) {
            var $element = createItem(item.message, item.addTimestamp);

            addCssClass($element, item);

            return $element;
        };

        function createItem(message, addTimestamp) {
            var $message;

            var $item = $("<div/>")
                .addClass("item");

            if (typeof message === "string") {
                $message = createMessageItem(message, addTimestamp);
                $item.append($message);
            }

            if (typeof message === "object" && typeof message.length === "number") {
                for (var i = 0; i < message.length; i++) {
                    $message = createMessageItem(message[i], i === 0 && addTimestamp);
                    $item.append($message);
                }
            }

            return $item;
        }

        function createMessageItem(message, addTimestamp) {
            var messageItem = $("<div/>")
                .text(message);

            if (addTimestamp) {
                var $timestampElement = createTimestampElement();
                messageItem.prepend($timestampElement);
            }

            return  messageItem;
        }

        function createTimestampElement() {
            var timestamp = formatDate(new Date());

            return $("<span/>")
                .addClass("timestamp")
                .text("[" + timestamp + "]");
        }

        function formatDate(date) {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            var hour = date.getHours();
            var minute = date.getMinutes();
            var seconds = date.getSeconds();

            return year + "-" + toTwoDigitString(month) + "-" + toTwoDigitString(day) +
                " " + toTwoDigitString(hour) + ":" + toTwoDigitString(minute) + ":" + toTwoDigitString(seconds);
        }

        function toTwoDigitString(number) {
            return number < 10
                ? "0" + number
                : "" + number;
        }

        function addCssClass($element, item) {
            switch (item.type) {
                case lu.debug.DebugItemType.info:
                    $element.addClass("info");
                    break;

                case lu.debug.DebugItemType.warning:
                    $element.addClass("warning");
                    break;

                case lu.debug.DebugItemType.error:
                    $element.addClass("error");
                    break;
            }
        }
    };

}(jQuery));