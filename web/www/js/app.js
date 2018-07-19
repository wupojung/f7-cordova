// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
    id: 'io.framework7.testapp',
    root: '#app',
    theme: theme,
    data: function () {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
            },
        };
    },
    methods: {
        helloWorld: function () {
            app.dialog.alert('Hello World!');
        },
    },
    routes: routes,
    // Enable panel left visibility breakpoint
    panel: {
        leftBreakpoint: 960,
    },
    vi: {
        placementId: 'pltd4o7ibb9rc653x14',
    },
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
    on: {
        pageInit: function () {
            //每一次都call到
            //console.log('page init')
        }
    },
    url: '/'
});
// 宣告變數
var $$ = app.$;

//參考文獻:  http://framework7.io/docs/page.html
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
    //console.log(e.detail.name);
    switch (e.detail.name.toLowerCase()) {
        case "today":
            self.processToday();
            console.log("今天");
            break;
        case "addresv":
            console.log("訂位");
            break;
    }
    ;
});

function processToday() {
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

}
