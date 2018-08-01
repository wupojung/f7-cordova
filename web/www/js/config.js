var _appVer = "1.1.3";

var _cordovaMode = false;

var StoreNo = '107010';

var ApiConfiguration = function () {
    this.StoreWCF="";
};

var ReleaseConfig = new ApiConfiguration();
ReleaseConfig.StoreWCF = "http://esmobile.wowprime.com/eipMobileAPI";


var DebugConfig = new ApiConfiguration();
DebugConfig.StoreWCF = "http://localhost:1234/api/";

var ApiConfig = DebugConfig;