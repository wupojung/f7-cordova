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
    //console.log(e);
    //console.log(e.detail.name);
    switch (e.detail.name.toLowerCase()){
        case "today":
            console.log("今天");
            break;
        case "addresv":
            console.log("訂位");
            break;
    };
});