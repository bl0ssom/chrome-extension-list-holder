let myLeads = {}
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage != undefined) {
    myLeads = leadsFromLocalStorage
    for (var uid in myLeads) { render(uid); }
}

function randomGUID() {
    let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); });
    if (uid in myLeads) randomGUID();
    else return uid;
}

function saveList() { localStorage.setItem("myLeads", JSON.stringify(myLeads)) }

function removeElement(element) {
    delete myLeads[element.parentNode.id];
    document.getElementById(element.parentNode.id).remove();
    saveList();
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads) );
        render(myLeads);
    })
});

function render(uid) {
    let text = myLeads[uid];
    let listElement = document.createElement("li");
    listElement.setAttribute("id", uid);

    let linkElement = document.createElement("a");
    linkElement.setAttribute("target", "_blank");
    linkElement.setAttribute("href", text);
    linkElement.innerText = text;

    let buttonElement = document.createElement("button");
    buttonElement.setAttribute("onclick", "removeElement(this);");
    buttonElement.innerText = "Remove";

    listElement.appendChild(linkElement);
    listElement.appendChild(buttonElement);
    ulEl.appendChild(listElement);
}

inputBtn.addEventListener("click", function() {
    uid = randomGUID();
    myLeads[uid] = inputEl.value;
    inputEl.value = "";
    saveList();
    render(uid);
});

