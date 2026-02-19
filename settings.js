let name=null;
let birthday=null;
let search_engine= null;
chrome.storage.local.get('firstStart', function(data) {
    if(data.firstStart){
        console.log("not the first start");
    }else{
        chrome.storage.local.set({'name':"Timo"});
        chrome.storage.local.set({'search_engine':"https://search.brave.com/search"});
        chrome.storage.local.set({'birthday':"1998-12-04"});
        chrome.storage.local.set({"firstStart":"true"});
    }
});
chrome.storage.local.get('name', function(data) {
    name=data.name;
});
chrome.storage.local.get('birthday', function(data) {
    birthday=data.birthday;
    console.log(birthday);
});
chrome.storage.local.get('search_engine', function(data) {
    if(data.search_engine.includes("brave")){
        search_engine="brave";
    }else if(data.search_engine.includes("google")){
        search_engine="google";
    }else if(data.search_engine.includes("duckduckgo")){
        search_engine="duckduckgo";
    }else if (data.search_engine.includes("yahoo")){
        search_engine="yahoo";
    }else if(data.search_engine.includes("bing")){
        search_engine="bing";
    }else{
        search_engine="google";
    }
});
window.onload=function() {
    let button = document.getElementById("saveSettings");
    document.getElementById("name").value=name;
    document.getElementById("birthday").value = birthday;
    document.getElementById(search_engine).checked=true;
    button.addEventListener("click", function saveSettings(e) {
        e.preventDefault();
        let formData = new FormData(document.querySelector('form'));
        formData = [...formData.values()];
        console.log(formData);
        chrome.storage.local.set({'name': formData[0]});
        chrome.storage.local.set({'birthday': formData[1]});
        chrome.storage.local.set({'search_engine': formData[2]});
    });
}