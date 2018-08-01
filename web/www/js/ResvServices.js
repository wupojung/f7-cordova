//import 'ViewModel.js';

var ResvServices = (function () {
    var $$ = Dom7;

    Debug.enter('ResvServices.constructor');
    var containerEl = "#demo-calendar-inline-container";//目標的tag名稱
    //var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    function _InitCalendar() {
        Debug.enter('ResvServices._InitCalendar');
        var calendarInline = app.calendar.create({
            containerEl: containerEl,
            value: [new Date()],
            weekHeader: true,
            renderToolbar: function () {
                return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
                    '<div class="toolbar-inner">' +
                    '<div class="left">' +
                    '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
                    '</div>' +
                    '<div class="center"></div>' +
                    '<div class="right">' +
                    '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            },
            on: {
                init: function (c) {
                    $$('.calendar-custom-toolbar .center').text(c.currentYear + '/' + monthNames[c.currentMonth]);
                    $$('.calendar-custom-toolbar .left .link').on('click', function () {
                        calendarInline.prevMonth();
                    });
                    $$('.calendar-custom-toolbar .right .link').on('click', function () {
                        calendarInline.nextMonth();
                    });
                },
                monthYearChangeStart: function (c) {
                    $$('.calendar-custom-toolbar .center').text(c.currentYear + '/' + monthNames[c.currentMonth]);
                }
            },
            events: [{
                from: '2018/07/24',
                to: '2018/07/24'
            },
                {
                    from: '2018/07/29',
                    to: '2018/07/29'
                }
            ]
        });
        Debug.leave();
    }

    function _InitPeriod() {
        Debug.enter('ResvServices._InitPeriod');

        $("#period_panel").empty();  //clear

        var html = '';
        //get list
        var _list = OpenPeriodViewModel.GetOpenPeriodList("url");
        for (var i = 0; i < _list.length; i += 3) {
            console.log(i + "<" + _list.length + "=" + (i < _list.length));
            html += '<div class="row">' +
                ((i < _list.length) ? '<a class="button col-33"><p>' + _list[i].StartHour + '</p><p>' + (_list[i].Available) + 'P</p></a>' : '<div class="block col-33 empty"></div>') +
                (((i + 1) < _list.length) ? '<a class="button col-33"><p>' + _list[i + 1].StartHour + '</p><p>' + (_list[i + 1].Available) + 'P</p></a>' : '<div class="block col-33 empty"></div>') +
                (((i + 2) < _list.length) ? '<a class="button col-33"><p>' + _list[i + 2].StartHour + '</p><p>' + (_list[i + 2].Available) + 'P</p></a>' : '<div class="block col-33 empty"></div>') +
                '</div>';
        }
        $("#period_panel").html(html);
        Debug.leave();
    }

    function _SearchResvHistoryWithAjax(url, cellphone, container) {
        Debug.enter('ResvServices._SearchResvHistoryWithAjax');
        try {
            //刪除資料
            container.empty();
            //組合url

            //呼叫ajax
            var _list = ReservationHistoryViewModel.GetReservationHistoryList();

            //container
            var _html = "<ul>";

            for (var i = 0; i < _list.length; i += 3) {
                console.log(i + "<" + _list.length + "=" + (i < _list.length));
                _html +=
                    '<li>' +
                    '<div class="item-content">' +
                    '    <div class="item-inner">' +
                    '        <div class="item-title">' + _list[i].Date + ' ' + _list[i].StartHour + ' ' + _list[i].StoreNo + '</div>' +
                    '        <div class="item-after"><i class="f7-icons">check_round</i></div>' +
                    '    </div>' +
                    '</div>' +
                    '</li>';
            }
            _html += "</ul>";
            container.html(_html);
        }
        catch (err) {
            Debug.logObject(err);
        }
        Debug.leave();
    }

    function _GenHistoryPanel(ResvHistoryList) {
//ResvHistory
    }

    //binding event
    function _BindingEvent() {
        //手機失焦處理
        $("#cellphone").focusout(function () {
            //console.log($("#cellphone").val());
            _SearchResvHistoryWithAjax(ApiConfig.StoreWCF,
                $("#cellphone").val(),
                $("#history"));
        });

        $("#btnSave").click(_InsertResvWithAjax);

        $$('#detail_form')[0].reset();
    }

    function _InsertResvWithAjax() {
        var model = ReservationViewModel.Instantiate();
        model.Name = $("#Name").val();
        model.Mobile = $("#Mobile").val();
        model.Gender = $("input[name='Gender']:checked").val();
        model.QtyAdult = $("#QtyAdult").val();
        model.QtyChild = $("#QtyChild").val();
        model.QtyChildChair = $("#QtyChildChair").val();
        model.Memo = $("#Memo").val();
        Debug.log("sending..." + Name);
        Debug.logObject(model);
    }


    function _Test() {
        var _list = OpenPeriodViewModel.GetOpenPeriodList("aaa");
        //Debug.log(_list.length);
        //var i;
        for (var i = 0; i < _list.length; i++) {
            Debug.log(_list[i].Available);
        }
    }

    function _Init() {
        Debug.enter('ResvServices._Create');
        _BindingEvent();
        _InitCalendar();
        _InitPeriod();

        Debug.leave();
    }

    return {
        Init: _Init,
        Insert: _InsertResvWithAjax,
    };

    Debug.leave();

}());