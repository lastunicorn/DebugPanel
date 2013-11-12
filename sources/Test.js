/**
 * Created by alez on 11/10/13.
 */

window.lu = window.lu || {};

(function () {

    var debugPanel1;
    var debugPanelConfiguration;

    function writeSomeExampleMessages() {
        debugPanel1.writeInfo("An innocent info message.");
        debugPanel1.writeInfo('Some potentially harmfull html code: <input type="text" value="ha ha ha"/>. It is displayed as text and not randered. Cool!');
        debugPanel1.writeWarning("This is a warning! Be careful!");
        debugPanel1.writeError("Sadly an error occured: Obviously there is a problem. :(");
        debugPanel1.writeInfo([
            "This is an info message on multiple lines...",
            "Second line...",
            "Third line..."
        ]);
        debugPanel1.writeError([
            "And an error on multiple lines:",
            "Cause of error: unknown. Probably voodoo.",
            "Call stack: absent",
            "Line: 1000"
        ]);
        debugPanel1.writeText("This is a text without type. You can do this, too.");
    }

    function writeRandomNumber() {
        debugPanel1.writeInfo("Some random numbers generated every second: " + Math.random());
    }

    function writeMessagesUsingASecondTemporaryObject() {
        var debugPanel2 = new lu.debug.DebugPanel(debugPanelConfiguration);

        debugPanel2.writeInfo("This is a message written using a second DebugPanel object. Looks no different from the others.");
    }

    function writeASecondWaveOfMessages() {
        debugPanel1.writeInfo("A message written using again the first DebugPanel object.");
        debugPanel1.writeItem({
            type: lu.debug.DebugItemType.warning,
            message: "A custom warning message without timestamp.",
            addTimestamp: false
        })
    }

    function startTimerToWriteMessagesEverySecond() {
        setInterval(function timerRun() {
            writeRandomNumber();
        }, 1000);
    }

    $(function () {
        debugPanelConfiguration = {
            locationOfNewItems: lu.debug.DebugItemLocation.bottom,
            addTimestamp: true,
            addSeparator: true
        };

        debugPanel1 = new lu.debug.DebugPanel(debugPanelConfiguration);

        writeSomeExampleMessages();
        writeMessagesUsingASecondTemporaryObject();
        writeASecondWaveOfMessages();
        startTimerToWriteMessagesEverySecond();
    });

}());