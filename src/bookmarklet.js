javascript:(function(){
  _my_script=document.createElement('script');
  _my_script.type='text/javascript';
  _my_script.src='http://lolcatho.st/src/unpapered.js?'+Math.random();
  _my_script.onload=function(){
    var storageInfo = {"type": "pds-remotestorage-00#webdav",
                       "href": "https://owncube.com/apps/remoteStorage/WebDAV.php/geal/remoteStorage",
                       "auth": {"type": "pds-oauth2-00",
                                "href": "https://owncube.com/apps/remoteStorage/auth.php/geal"
                               }
                      };
    var token = "cmVtb3RlU3RvcmFnZTo0ZmNkMDI1MmM4Y2I3";
    var user = "geal@owncube.com";
    uploader(storageInfo, token, user);
  };
  document.getElementsByTagName('head')[0].appendChild(_my_script);
})();
