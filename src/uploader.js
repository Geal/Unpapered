var storageInfo = {"type":"pds-remotestorage-00#simple",
                   "href":"https://5apps.com/storage/geal",
                   "auth":{"type":"pds-oauth2-00",
                           "href":"https://5apps.com/oauth/geal"},
                   "rel":"pds-remotestorage-00#simple"};
var token = "87de1829c9ddda04e65b50e404b00ce1";
var user = "geal@5apps.com";

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
