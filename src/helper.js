var helper = (function() {
  var connected = false;
  var authorized = false;

  function setConnectionState(state) {
    connected = state;

    elementIds = [
      'publicKey', 'fetchPublicKey', 'authorize', 'disconnect'
    ];

    if (connected) {
      for (var i = 0; i < elementIds.length; i++) {
        $('#' + elementIds[i]).removeAttr('disabled');
      }
      $('#connectionState').html('connected');
      $('#connect').hide();
      $('#connect-form').hide();
      $('#disconnect').show();
      $('#username').html(localStorage.getItem('userAddress'));
      $('#connect-string').show();
      $('#userAddress').val(localStorage.getItem('userAddress'));
      $('#bookmark').show();
      $('#content').show();
    } else {
      for (var i = 0; i < elementIds.length; i++) {
        $('#' + elementIds[i]).attr('disabled', 'disabled');
      }
      $('#connectionState').html('disconnected');
      $('#connect').show();
      $('#disconnect').hide();
      $('#userAddress').val('');
      $('#connect-form').show();
      $('#connect-string').hide();
      $('#username').html('');
      $('#bookmark').hide();
      $('#content').hide();
      deauthorize();
    }
    $('#connectionState').toggleClass('enabled', connected);

    $('#states').show();
  }

  function isConnected() {
    return localStorage.getItem('userStorageInfo') != null;
  }

  function disconnect() {
    localStorage.removeItem('userStorageInfo');
    localStorage.removeItem('userAddress');
    setConnectionState(false);
  }

  function setAuthorizedState(state) {
    authorized = state;

    elementIds = [
      'tutorialKey', 'fetchTutorialKey', 'tutorialValue',
      'publishTutorial', 'publicValue', 'publishPublic', 'deauthorize'
    ];

    if (authorized) {
      for (var i = 0; i < elementIds.length; i++) {
        $('#' + elementIds[i]).removeAttr('disabled');
      }
    } else {
      for (var i = 0; i < elementIds.length; i++) {
        $('#' + elementIds[i]).attr('disabled', 'disabled');
      }
    }
    $('#authorizedState').toggleClass('enabled', authorized);
  }

  function isAuthorized() {
    if(localStorage.getItem('bearerToken') != null) {
      console.log("authorized");
      return true;
    }
    else {
      console.log("not authorized");
      return false;
    }
  }

  function deauthorize() {
    localStorage.removeItem('bearerToken');
    setAuthorizedState(false);
  }


  function showSpinner(id) {
    $('#' + id).show();
  }

  function hideSpinner(id) {
    $('#' + id).hide();
  }

  return {
    setConnectionState: setConnectionState,
    isConnected:        isConnected,
    disconnect:         disconnect,
    setAuthorizedState: setAuthorizedState,
    isAuthorized:       isAuthorized,
    deauthorize:        deauthorize,
    showSpinner:        showSpinner,
    hideSpinner:        hideSpinner
  };
})();
