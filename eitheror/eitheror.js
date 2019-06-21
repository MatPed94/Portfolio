const  endPoint = "https://eitheror-e084.restdb.io/rest/links";
const key = "5d0cc89852556062830a4674";

function sendRequest(data) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": endPoint,
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "x-apikey": key,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(data)
      }

    $.ajax(settings).done(function (response) {
        window.location.hash = response['_id'];
        $('button').after('<p>Your link: <a href="'+window.location.href+'">'+window.location.href+'</a></p>');
    });

    console.log("Sendeded!")

}

function getUrls() {
    let eitherUrl = $("#eitherUrlInput").val();
    let orUrl = $("#orUrlInput").val();

    eitherUrl = protocol_ok(eitherUrl);
    orUrl = protocol_ok(orUrl);
    
    const dataPackage = { either_url: eitherUrl, or_url: orUrl }
    console.log(dataPackage)

    sendRequest(dataPackage);
}

const protocol_ok = function(url) {
    let protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
    } else {
        return url;
    }
}



const fiftyFifty = function() {
   let num = Math.floor(Math.random() * 2)
   return num;
}

const hashh = window.location.hash.substr(1);

if (window.location.hash != "") {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": endPoint + '/' + hashh,
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": key,
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        if (fiftyFifty() === 1) {
            if (response != null) {
               window.location.href = response['either_url'];
            }
        } else {
            if (response != null) {
               window.location.href = response['or_url'];
            }
        }    
      });  
}

