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

    function reloadIndex() {
      $("#index").empty()
      storage.getData('unpapered', 'index', function(error, data) {
        if(error)
          console.log(error)
        else {
          var index = JSON.parse(data)
          var ul = $("#index")
          for(var i=0; i<index.length; i++) {
            ul.append($('<li>').append(index[i]).on('click', function(){loadContent($(this).text())}))
          }
        }
      })
    }

    reloadIndex()

    function createBookmarklet() {
      var authData = storage.authData()
      var bookmarklet = "javascript:(function(){_my_script=document.createElement('script');_my_script.type='text/javascript';_my_script.src='"
      bookmarklet += "//"+location.host+"/src/unpapered.js"
      bookmarklet += "?'+Math.random();_my_script.onload=function(){var storageInfo="
      bookmarklet += authData.storage
      bookmarklet += ";var token=\""+authData.token+"\""
      bookmarklet += ";var user=\""+authData.address+"\""
      bookmarklet += ";uploader(storageInfo,token,user);};document.getElementsByTagName('head')[0].appendChild(_my_script);})();"

      return bookmarklet;
    }
    $("#bookmarklet").empty().append($("<a>").attr("href", createBookmarklet()).text("Unhost this"))
    /*$('#publishPublic').on('click', function() {
      var key = $('#publicKey').val();
      var value = $('#publicValue').val();

      helper.showSpinner('publishPublicSpinner');

      storage.putData('public', key, value, function(error) {
        if (!error) {
          $('#publicValue').val('');
        }

        helper.hideSpinner('publishPublicSpinner');
      });

      return false;
    });


    $('#publishTutorial').on('click', function() {
      var key = $('#tutorialKey').val();
      var value = $('#tutorialValue').val();

      helper.showSpinner('publishTutorialSpinner');

      storage.putData('tutorial', key, value, function(error) {
        if (!error) {
          $('#tutorialValue').val('');
        }

        helper.hideSpinner('publishTutorialSpinner');
      });

      return false;
    });

    $('#fetchTutorialKey').on('click', function() {
      var key = $('#tutorialKey').val();

      helper.showSpinner('fetchTutorialSpinner');

      storage.getData('tutorial', key, function(error, data) {
        if(!error && data !== "null") {
          $('#tutorialValue').val(data);
        }

        helper.hideSpinner('fetchTutorialSpinner');
      });

      return false;
    });*/

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
