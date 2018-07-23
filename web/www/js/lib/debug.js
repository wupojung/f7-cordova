console.logCopy = console.log.bind(console);
console.log = function () {
    var timestamp = new Date().toISOString().substring(11, 23);
    if (arguments.length) {
        var args = Array.prototype.slice.call(arguments, 0);
        if (typeof arguments[0] === "string") {
            args[0] = "%o: " + arguments[0];
            args.splice(1, 0, timestamp);
            this.logCopy.apply(this, args);
        } else {
            this.logCopy(timestamp, args);
        }
    }
};
var Debug = ( function () {
    "use strict";
    var ENTER_MARK = "==>", LEAVE_MARK = "<==", INDENT_SIZE = 3, INDENT_CHAR = " ", callStack = [];

    function dumpObject(arr, level) {
        var dumped_text = "", level_padding = "", value, item, j;
        if (!level) {
            level = 0;
        }
        for (j = 0; j < level + 1; j += 1) {
            level_padding += "  ";
        }
        if (typeof (arr) === 'object') {
            for (item in arr) {
                value = arr[item];
                if (typeof (value) === 'object') {
                    dumped_text += level_padding + "'" + item + "' ...\n";
                    dumped_text += dumpObject(value, level + 1);
                } else {
                    dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
                }
            }
        } else {
            dumped_text = "==>" + arr + "<==(" + typeof (arr) + ")";
        }
        return dumped_text;
    }

    function output(str) {
        console.log(str);
    }

    function leftPad(padString, length) {
        var result = "";
        while (result.length < length) {
            result = padString + result;
        }
        return result;
    }

    function _repeat(str, count) {
        var array = [];
        for (var i = 0; i <= count;)
            array[i++] = str;
        return array.join('');
    }

    function rightPad(padString, length) {
        var result = "";
        while (result.length < length) {
            result = result + padString;
        }
        return result;
    }

    function writeLog(str) {
        output(rightPad(INDENT_CHAR, callStack.length * INDENT_SIZE) + str);
    }

    return {
        enter: function (funcName) {
            writeLog(ENTER_MARK + funcName);
            callStack.push(funcName);
        },
        leave: function () {
            var funcName = callStack.pop();
            if ((funcName !== null) || (funcName !== undefined)) {
                writeLog(LEAVE_MARK + funcName);
            } else {
                console.trace();
            }
        },
        log: function () {
            var i, msg = "";
            for (i = 0; i < arguments.length; i += 1) {
                msg += arguments[i];
            }
            writeLog(msg);
        },
        logObject: function (obj, level) {
            writeLog(dumpObject(obj, level));
        }
    };
}());