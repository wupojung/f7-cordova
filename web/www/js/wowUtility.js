var wowUtility = (function () {

    //ref: https://gist.github.com/pparadis/3071037
    String.IsNullOrEmpty = function(value) {
        var isNullOrEmpty = true;
        if (value) {
            if (typeof (value) == 'string') {
                if (value.length > 0)
                    isNullOrEmpty = false;
            }
        }
        return isNullOrEmpty;
    }

    // Toast Tools
    function _ToastFactory(text, position, timeout) {
        position = (typeof position !== 'undefined') ? position : 'center';
        timeout = (typeof timeout !== 'undefined') ? timeout : 2000;
        return app.toast.create({
            text: text,
            position: position,
            closeTimeout: timeout,
        });
    }

    function _Toast(text, timeout, position) {
        position = (typeof position !== 'undefined') ? position : 'center';
        _ToastFactory(text, position, timeout).open();
    }

    return {
        Toast: _Toast,
    }
}());