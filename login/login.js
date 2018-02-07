(function(global) {

  global.auth = function() {
    var user = document.getElementById("name").value;
    var pass = document.getElementById('pass').value

    var user = {
      name: user,
      password: pass
    }
    
    var settings = {
      data: user,
      type: 'POST',
      url: 'http://localhost/PulseServices/Authenticate.svc/Login',
      xhrFields: {
        withCredentials: true
      }
    }

 //    global.$.ajax(settings)
 //    .then(function(resp) {
 //      if(resp.success) {
 //        for(var key in resp.cookies) {
 //          // .NET doesn't allow - in keynames, so _ are used instead.
 //          global.Cookies.set(key.replace(/_/g, '-'), resp.cookies[key])
 //        }
 //        global.$("#success").text("Authentication Success. You may proceed to the app")
 // location.reload(true)
 //      } else {
 //        console.log(resp);
 //        global.$("#loginErrorMessage").text("Error: " + resp.errMsg)
 //      }
 //    })
 //    .catch(function(err) {
 //      global.$("#loginErrorMessage").text("Execution error")
 //    })
function getData(){
    return new Promise(function(resolve,reject){
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost/PulseServices/Authenticate.svc/Login?q='+user);
        request.onload = function() {
          if (request.status == 200) {
            resolve(request.response); //we get the data here.So, resolve the Promise
          }
          else {
            reject(Error(request.statusText)); //if status is not 200 OK, reject.
          }
        };
    
        request.onerror = function() {
          reject(Error("Error fetching data.")); //error occurred, reject the Promise
        };
    
        request.send(); //send the request
    });
}
function fetchData(){
        var userName=document.getElementById('name').value;
        getData(userName).then(function(data){
        document.getElementById('name')="Welcome"+document.getElementById('name').innerHTML;
        });
    
    }

  }
}(window))
