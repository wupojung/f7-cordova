var _appVer = "1.1.3";

var _cordovaMode = false;

var ApiConfiguration = function () {
    this.EIP = "";
    this.ESMOBILE = "";
    this.APP = "";
    this.HR = "";
    this.BPM = "";
    this.Task = "";
    this.WebDAV = "";
};

var ReleaseConfig = new ApiConfiguration();
ReleaseConfig.EIP = "http://esmobile.wowprime.com/eipMobileAPI";
ReleaseConfig.ESMOBILE = "http://esmobile.wowprime.com/esmobileAPI-New/api";
ReleaseConfig.APP = "http://esmobile.wowprime.com/WebApi/App/api";
ReleaseConfig.HR = "http://esmobile.wowprime.com/WHRIS_API";
ReleaseConfig.BPM = "http://esmobile.wowprime.com/wBPM_API";
ReleaseConfig.Task = "http://esmobile.wowprime.com/wowTaskAPI/api";
ReleaseConfig.WebDAV = "http://esmobile.wowprime.com/WebDavAPI";

var DebugConfig = new ApiConfiguration();
DebugConfig.EIP = "http://esmobile.wowprime.com/eipMobileAPI";
DebugConfig.ESMOBILE = "http://esmobile.wowprime.com/esmobileAPI-New/api";
DebugConfig.APP = "http://192.168.4.102/WebApi/App/api";
DebugConfig.HR = "http://esmobile.wowprime.com/WHRIS_API";
DebugConfig.BPM = "http://esmobile.wowprime.com/wBPM_API";
DebugConfig.Task = "http://esmobile.wowprime.com/wowTaskAPI/api";
DebugConfig.WebDAV = "http://localhost:50638/";


var ApiConfig = ReleaseConfig;