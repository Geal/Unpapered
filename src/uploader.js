var storageInfo = {"type":"pds-remotestorage-00#webdav",
                   "href":"https://owncube.com/apps/remoteStorage/WebDAV.php/geal/remoteStorage",
                   "auth":{"type":"pds-oauth2-00",
                           "href":"https://owncube.com/apps/remoteStorage/auth.php/geal"},
                   "rel":"pds-remotestorage-00#webdav"};
var token = "cmVtb3RlU3RvcmFnZTo0ZmM3ZTBlNGI2Yjc4";
var user = "geal@owncube.com";

console.log(token);
var client = remoteStorage.createClient(storageInfo, "tutorial", token);

var value = readability.init(); 
console.log(value);
var content = JSON.stringify(value);
var key = "text";
client.put(key, content, function(error) {
  if (error) {
    //alert('Could not store "' + key + '" in "' + category + '" category');
    console.log(error);
  } else {
    //console.log('Stored "' + value + '" for key "' + key + '" in "' + category + '" category');
  }

  //callback(error);
});
