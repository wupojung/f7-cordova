var ApiServices = (function () {

    var $ = jQuery;

    function _AjaxGet(URL, OnSuccess, OnError) {
        Debug.enter("ApiServices._AjaxGet");
        try {
            $.ajax({
                url: URL,
                type: 'GET',
                dataType: "json",
                timeout: 30000,
                beforeSend: function (jqXHR, settings) {
                    //todo: show loading
                },
                success: function (data, textStatus, jqXHR) {
                    //console.log(data); //for debug
                    if (data.code === 200 && data.data.status === 1000) {
                        OnSuccess(data.data.result);
                    } else {
                        OnError();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Debug.logObject(jqXHR)
                    OnError();
                },
                complete: function (jqXHR, textStatus) {
                    //todo: hide loading
                }
            });
        } catch (e) {
            Debug.logObject(e)
        }
        Debug.leave();
    }

    return {Get: _AjaxGet}
}());