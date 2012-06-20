(function(storage, helper) {

  $(function() {

    $('#connect').on('click', function() {
      var userAddress = $('#userAddress').val();

      helper.showSpinner('connectionSpinner');

      storage.connect(userAddress, function(error, storageInfo) {
        if(error) {
          helper.setConnectionState(false);
        } else {
          localStorage.setItem('userStorageInfo', JSON.stringify(storageInfo));
          localStorage.setItem('userAddress', userAddress);
          helper.setConnectionState(true);
        }

        helper.hideSpinner('connectionSpinner');
      });

      return false;
    })

    $('#authorize').on('click', function() {
      storage.authorize(['unpapered']);
      return false;
    })

    function loadContent(title) {
      storage.getData('unpapered', title, function(error, data) {
        if(!error && data != "null") {
          var d = JSON.parse(data);
          $('#dataTitle').html(d.title);
          $('#dataContent').html(d.content);
        }
      })
    }

    $('#fetchText').on('click', function() {
      var key = $('#publicKey').val();

      //helper.showSpinner('fetchPublicSpinner');

      storage.getData('unpapered', 'index', function(error, data) {
        if(error)
          console.log(error)
        else {
          var index = JSON.parse(data)
          var key = index[1]
          loadContent(key)
          /*ùstorage.getData('unpapered', key, function(error, data) {
            if(!error && data != "null") {
              var d = JSON.parse(data);
              $('#dataTitle').html(d.title);
              $('#dataContent').html(d.content);
            }
          })*/
        }
      })

      return false;
    });


    // This should be removed from the production version, replaced by individual item deletion.
    $('#eraseData').on('click', function() {

      //helper.showSpinner('fetchPublicSpinner');

      storage.getData('unpapered', 'index', function(error, data) {
        if(error)
          console.log(error)
        else {
          var index = JSON.parse(data)
          for(var i=0; i<index.length; i++) {
            storage.deleteData('unpapered', index[i], function(error) {
              if(error)
                console.log("couldn't delete element for key="+index[i])
            })
          }
          storage.deleteData('unpapered', 'index', function(error) {
            if(error)
              console.log("couldn't delete the index")
          })
        }
      })
      reloadIndex()
      return false
    });

    function deleteElement(id) {
      storage.getData('unpapered', 'index', function(error, data) {
        if(error)
          console.log(error)
        else {
          var index = JSON.parse(data)
          storage.deleteData('unpapered', index[id], function(error) {
            console.log(error)
          })
          index.splice(id, 1)
          storage.putData('unpapered', 'index', JSON.stringify(index), function(error) {
            if(error)
              console.log(error)
            else
              reloadIndex()
          })
        }
      })
    }

    function reloadIndex() {
      $("#index").empty()
      storage.getData('unpapered', 'index', function(error, data) {
        if(error)
          console.log(error)
        else {
          var index = JSON.parse(data)
          var ul = $("#index")
          for(var i=0; i<index.length; i++) {
            var element = $('<li>').append(index[i])
            var deleteLink = $('<a>').text('X').attr("href", "#").css('float', 'right')
            deleteLink.on('click',
              (function() {
                var id = i
                return function() {
                  console.log('trying to delete element '+id)
                  deleteElement(id)
                }
              })()
            )
            element.append(deleteLink)
            element.on('click',
                (function() {
                  var title = index[i]
                  return function() {
                    loadContent(title)
                  }
                })()
              )

            ul.append(element)
          }
        }
      })
    }

    reloadIndex()

    function createBookmarklet() {
      var authData = storage.authData()
      var bookmarklet = "javascript:(function(){_my_script=document.createElement('script');_my_script.type='text/javascript';_my_script.src='"
      bookmarklet += "http://"+location.host+location.pathname+"src/unpapered.js"
      bookmarklet += "?'+Math.random();_my_script.onload=function(){var storageInfo="
      bookmarklet += authData.storage
      bookmarklet += ";var token=\""+authData.token+"\""
      bookmarklet += ";var user=\""+authData.address+"\""
      bookmarklet += ";uploader(storageInfo,token,user);};document.getElementsByTagName('head')[0].appendChild(_my_script);})();"

      return bookmarklet;
    }
    $("#bookmarklet").empty().append($("<a>").attr("href", createBookmarklet()).text("Unhost this"))

    $('#disconnect').on('click', function() {
      helper.disconnect();
      return false;
    });

    $('#deauthorize').on('click', function() {
      helper.deauthorize();
      return false;
    });

    helper.setConnectionState(helper.isConnected());
    helper.setAuthorizedState(helper.isAuthorized());
  });

})(wrapper, helper);
