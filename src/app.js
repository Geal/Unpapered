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
    });;

    $('#fetchText').on('click', function() {
      var key = $('#publicKey').val();

      //helper.showSpinner('fetchPublicSpinner');

      storage.getData('unpapered', 'index', function(error, data) {
        if(error)
          console.log(error)
        else {
          var index = JSON.parse(data)
          var key = index[1]
          storage.getData('unpapered', key, function(error, data) {
            if(!error && data != "null") {
              var d = JSON.parse(data);
              $('#dataTitle').html(d.title);
              $('#dataContent').html(d.content);
            }
          })
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

      return false;
    });

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
