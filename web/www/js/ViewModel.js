var OpenPeriodViewModel = /** @class */ (function () {
    //實例化物件(資料模形)
    function _Instantiate(StartHour, Available, Rate) {
        //OpenPeriodViewModel
        var _obj = new Object();
        _obj.StartHour = StartHour;
        _obj.Available = Available;
        _obj.Rate = Rate;
        return _obj;
    }

    //取得時段資訊(Ajax)
    function _GetOpenPeriodListWithAjax(url) {
        var _result = [];
        var i;
        for (i = 0; i < 10; i++) {
            var _period = _Instantiate("10:00", i, i / 10);
            _result.push(_period);
        }
        return _result;
    }

    return {
        Instantiate: _Instantiate,
        GetOpenPeriodList: _GetOpenPeriodListWithAjax,
    };
}());


//002007
var ReservationHistoryViewModel = (function () {
    //實例化物件(資料模形)
    function _Instantiate(TTTPKey, Date, StartHour, StoreNo) {
        //ReservationHistoryViewModel
        var _obj = new Object();
        _obj.TTTPKey = TTTPKey;
        _obj.Date = Date;
        _obj.StartHour = StartHour;
        _obj.StoreNo = StoreNo;
        return _obj;
    }

    function _GetReservationHistoryListWithAjax(url){
    }

    //測試資料
    function _GetReservationHistoryListWithAjaxFake(url){
        var _result = [];
        var i;
        for (i = 0; i < 2; i++) {
            var _period = _Instantiate("0000-1", "2018/07/01", "01:02","11206");
            _result.push(_period);
        }
        return _result;
    }

    return {
        Instantiate: _Instantiate,
        //GetReservationHistoryList: _GetReservationHistoryListWithAjax,
        GetReservationHistoryList: _GetReservationHistoryListWithAjaxFake,//for test

    };
}());




//002004
var ReservationViewModel =(function () {
    //實例化物件(資料模形)
    function _Instantiate(TTTPKey, TradeDate, StartHour, StoreNo,QtyAdult,QtyChild,QtyChildChair,Memo) {
        //ReservationHistoryViewModel
        var _obj = new Object();
        _obj.TTTPKey = TTTPKey;
        _obj.Date = TradeDate;
        _obj.StartHour = StartHour;
        _obj.StoreNo = StoreNo;
        _obj.QtyAdult = QtyAdult;
        _obj.QtyChild = QtyChild;
        _obj.QtyChildChair = QtyChildChair;
        _obj.Memo = Memo;
        _obj.Tags =[];
        return _obj;
    }
    return {
        Instantiate: _Instantiate,
    };
}());