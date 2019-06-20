const endPoint = "https://www.jsonstore.io/fe2ed6d34e04b6aa3f1fefab71301a0264d78cd42d636801d29312cd1a565b21";

function send_request(eitherUrl, orUrl) {
    this.eitherUrl = eitherUrl;
    this.orUrl = orUrl;

    $.ajax({
        'url': endPoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': {
           'eitherUrl': JSON.stringify(this.eitherUrl),
           'orUrl': JSON.stringify(this.orUrl)
        },
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
    });
    console.log("Sendeded!")
}

function getRandom() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function getUrls() {
    let eitherUrl = $("#eitherUrlInput").val();
    let orUrl = $("#orUrlInput").val();

    eitherUrl = protocol_ok(eitherUrl);
    orUrl = protocol_ok(orUrl);
    console.log(eitherUrl, orUrl)
    genHash();
    send_request(eitherUrl, orUrl);
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

function genHash(){
    if (window.location.hash == "") {
        window.location.hash = getRandom();
    }
}

