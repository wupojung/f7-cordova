var TodayServices = (function () {
    var $$ = Dom7;
    var $ = jQuery;


    function _Init() {
        _BindingEvent();
        //_InitTodayPanel();
        _ListResv()
    }

    function _BindingEvent() {
        $("#today_tag").html(moment().format("MM/DD(ddd)"))
        //手機失焦處理
        $("#hour_range").focusout(_ListResv);
    }


    function _ListResv() {
        //重新計算時間
        var tradedate = moment().format('YYYY/MM/DD');
        var starttime = moment().format('HH:00');
        var endtime = ($('#hour_range').val() == 0) ? '23:59' : moment().add($('#hour_range').val(), 'h').format('HH:59');
        //產生連接
        var url = ApiConfig.StoreWCF + '/resvlist/?storeno=' + StoreNo + '&tradedate=' + tradedate + '&starttime=' + starttime + '&endtime=' + endtime;

        console.log(url);//for debug

        $('#list_data').empty();

        //呼叫API
        ApiServices.Get(url, _OnListSuccess, _OnListError);
    }

    function _OnListSuccess(data) {
        Debug.enter("TodayServices._OnListSuccess");
        //console.log("data==>" + JSON.stringify(data)); //for debug

        var html = '<div class="card"><div class="card-content"><p style="font-size: 5vh!important; text-align: center;color: red;">查無資料！</p></div></div>';
        if (typeof data == undefined || data.length == 0) {            //空白資料
            _GenerateEmptyContentHtml();
        } else {
            //組合資料
            html = '<ul>';
            for (var i = 0; i < data.length; i++) {
                html += _GenerateEachCardHtml(data[i]);
            }
            html += '</ul>';
        }
        //抽換資料
        $('#list_data').html(html);
        Debug.leave();
    }

    function _GenerateEmptyContentHtml() {
        wowUtility.Toast("查無資料！");
    }

    function _GenerateEachCardHtml(viewModel) {
        //Debug.log("Generate Card Html ...");
        //解析tags
        var tagHtml = '';
        var tags = viewModel.tag.split(",");
        for (var i in tags) {

            if(String.IsNullOrEmpty(tags[i])){
                continue;
            }
            tagHtml += '<div class="chip"><div class="chip-label">' + tags[i] + '</div></div>';
        }
        //產生html
        return '<li id="' + viewModel.tttPkey + '">' +
            '<div class="card"><div class="card-content row"><div class="col-30" style="display:inherit"><div class="row" style="width: 100%">' +
            '<div class="startHour">' + viewModel.startHour + '</div>' +
            '<div class="info"><p>' + viewModel.name + '</p>' +
            '<p>' + viewModel.mobile + '</p></div>' +
            '</div></div>' +
            '<div class="col-70"><div class="row"><div class="resv_qty">' +
            '<p>' + viewModel.qtyAdult + '大' + viewModel.qtyChild + '小' + '</p></div>' +
            '<div class="resv_tags">' +
            // '<div class="chip"><div class="chip-label">慶生</div></div>' +
            tagHtml +
            '</div><div class="resv_func">' +
            '<button class="button button-fill button-big" onclick="TodayServices.ShowTable(\'' + viewModel.tttPkey + '\')">入桌</button>' +
            '<i class="f7-icons resv_func_btn">social_facebook</i>' +
            '<button class="button button-fill button-big">已買單</button>' +
            '<img class="resv_func_btn" src="img/sms.png" onclick="TodayServices.SMS(\'' + viewModel.tttPkey + '\')"/>' +
            '<img class="resv_func_btn" src="img/invisible.png" onclick="TodayServices.SetHide(\'' + viewModel.tttPkey + '\')"/>' +
            '</div></div></div></div></div>' +
            '</li>';
    }

    function _OnListError(data) {
        console.log("data==>" + JSON.stringify(data));
    }

    function _InitTodayPanel() {
        Debug.enter('TodayServices.constructor');

        // Dummy items array
        var items = [];
        for (var i = 1; i <= 10000; i++) {
            items.push({
                title: 'Item ' + i,
                subtitle: 'Subtitle ' + i
            });
        }
        var virtualList = app.virtualList.create({
            // List Element
            el: '.virtual-list',
            // Pass array with items
            items: items,
            // Custom search function for searchbar
            searchAll: function (query, items) {
                var found = [];
                for (var i = 0; i < items.length; i++) {
                    if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
                }
                return found; //return array with mathced indexes
            },
            // List item Template7 template
            itemTemplate:
            '<li>' +
            '<a href="#" class="item-link item-content">' +
            '<div class="item-inner">' +
            '<div class="item-title-row">' +
            '<div class="item-title">{{title}}</div>' +
            '</div>' +
            '<div class="item-subtitle">{{subtitle}}</div>' +
            '</div>' +
            '</a>' +
            '</li>',
            // Item height
            height: app.theme === 'ios' ? 63 : 73,
        });
        Debug.leave();
    }

    //送簡訊
    function _Sms(tttpkey) {
        Debug.log(tttpkey);
    }

    //設定隱藏
    function _SetHide(tttpkey) {
        Debug.log(tttpkey);
    }

    //入桌
    function _ShowTable(tttpkey) {
        Debug.log(tttpkey);
    }

    return {
        Init: _Init,
        SMS: _Sms,
        SetHide: _SetHide,
        ShowTable: _ShowTable
    };
}());