var routes = [
    {
        path: '/',
        url: './index.html',
    },
    {
        path: '/addResv/',
        url: './pages/addResv.html',
    },
    {
        path: '/today/',
        url: './pages/today.html'
    },
    {
        path: '/seats/',
        url: './pages/seats.html',
    },
    {
        path: '/query/',
        url: './pages/query.html',
    },
    {
        path: '/analz/',
        url: './pages/analz.html',
    },
    {
        path: '/setting/',
        url: './pages/setting.html'
    },
    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];
