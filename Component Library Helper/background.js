var welcomeapitemplates = "https://api.welcomesoftware.com/v2/feed/fec5e597c79e11ea999d0a8145379887?format=json"
//var xhr = new XMLHttpRequest();

//xhr.open("GET", welcomeapitemplates, false);
//xhr.send();

//var result = JSON.parse(xhr.responseText);
//var result = eval('(' + xhr.responseText + ')');

//console.log(result); //work print json data
var contextMenus = {};
var currentDom;

function sendPasteToContentScript(toBePasted) {

    toBePasted = "test Value";
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            data: toBePasted
        });
    });
}

contextMenus.createCounterString =

    chrome.contextMenus.create({
        "title": "Component Library",
        "id": "parent"
    }, )


chrome.contextMenus.create({
    "title": "Templates",
    "id": "Templates",
    "parentId": "parent"

}, )
chrome.contextMenus.create({
    "title": "Templates with Guidelines",
    "id": "Templates with Guidelines",
    "parentId": "parent"

}, )
//Variable Structure
//listOfComponents[i][0] this is the Name in the menu
//listOfComponents[i][1] this is the file inside the component folder
var listOfComponents = [
    ['Accordions', 'Accordions.html', 'n-accordion-band', ''],
    ['Back to Top', 'Back_to_Top.html', 'n-back-to-top', ''],
    ['Callout', 'Callout.html', 'n-call-out', ''],
    ['Card Band With Images', 'Card_Band_Images.html', 'n-card-band-images', ''],
    ['Card Band', 'Card_Band.html', 'n-card-band', ''],
    ['Fancy Callout', 'Fancy_Callout.html', 'n-fancy-callout', ''],
    ['Feature Tiles', 'Feature_Tiles.html', 'n-feature-tiles', ''],
    ['Hero', 'Hero_Full.html', 'n-hero', ''],
    ['Image with 3 Tabs', 'Image_with_3_Tabs.html', 'n-image-tabs', ''],
    ['Image with Tiles', 'Image_with_Tiles.html', 'n-image-with-tiles', ''],
    ['Intro', 'Intro.html', 'n-intro', ''],
    ['Logo Band', 'Logo_Band.html', 'n-logo-band', ''],
    ['Offset Cards', 'Offset_Cards.html', 'n-offset-cards', ''],
    ['Product Comparison Table', 'Product_Comparison_Table.html', ' ', ''],
    ['Prose Block Quote', 'Prose_Block_Quote.html', ' ', ''],
    ['Prose Full-Width Illustration', 'Prose_Full-Width_Illustration.html', 'n-prose-illustration-full-width', ''],
    ['Prose II', 'Prose_II.html', ' ', ''],
    ['Prose Inline Media Player', 'Prose_Inline_Media_Player.html', 'n-prose-inline-media', ''],
    ['Prose Listicle', 'Prose_Listicle.html', 'n-prose-listicle', ''],
    ['Prose Table of Contents', 'Prose_Table_of_Contents.html', 'n-prose-table-of-contents', ''],
    ['Prose', 'Prose.html', 'n-prose', ''],
    ['ProseGroup Region', 'ProseGroup_Region.html', ' ', ''],
    ['Quote Band', 'Quote_Band.html', 'n-quote-band', ' '],
    ['Section Header', 'Section_HEader.html', 'n-section-header', ''],
    ['SEO - URL & Breadcrumb', 'SEO-_URL_Breadcrumb.html', ' ', ''],
    ['Showcase Product', 'Showcase_Product.html', 'n-showcase', ''],
    ['Side x Side', 'Side_x_Side.html', 'n-side-x-side', ''],
    ['Side by Side 2 Tab', 'Side_x_Side_2_Tabs.html', 'n-side-x-side-tabs', ''],
    ['Stat Band', 'Stat_Band.html', 'n-stat-band', ''],
    ['Tabbed Band with Tiles', 'Tabbed_Band_Tiles.html', 'n-tabbed-band-tiles', ''],
    ['Tabbed Band', 'Tabbed_Band.html', 'n-tabbed-band', ''],
    ['Title', 'Title.html', 'n-title', '']
]




listOfComponents.sort(); //put the array in order so the menu is in alphabetical order

for (var j = 0; j < listOfComponents.length; j++) {
    chrome.contextMenus.create({
            "title": listOfComponents[j][0],
            "id": listOfComponents[j][0] + " ",
            "parentId": "Templates with Guidelines",
            "contexts": ["all"],
        },

    )
}
for (var j = 0; j < listOfComponents.length; j++) {
    chrome.contextMenus.create({
            "title": listOfComponents[j][0],
            "id": listOfComponents[j][0],
            "parentId": "Templates",
            "contexts": ["all"],
        },

    )
}

//load Template pages into the component array from local source files.
var client = [],
    i;
console.log("Loading Local Templates...");

for (i = 0; i < listOfComponents.length; i++) {
    //console.log("current i");
    //console.log(i);
    (function (i) {
        client[i] = new XMLHttpRequest();
        //path is the parent menu item id + the file name
        client[i].open('POST', 'Templates' + '/' + listOfComponents[i][1]);
        client[i].onreadystatechange = function () {
            //console.log("client ");
            //console.log(client[i]);
            if (client[i].readyState == 4 && client[i].status == 200) {
                listOfComponents[i][3] = client[i].response;

                //console.log(listOfComponents[i][0]);
                //console.log(listOfComponents[i][3]);
                if ((i + 1) >= listOfComponents.length) {
                    console.log("Loaded.");
                }
            }
        }
        client[i].send();
    })(i);
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    //console.log(tab);
    //console.log(info);

    var text;
    for (var j = 0; j < listOfComponents.length; j++) {
        if (info.menuItemId == listOfComponents[j][0] || info.menuItemId == (listOfComponents[j][0] + " ")) {
            console.log("info.menuItemId: ");
            console.log(info.menuItemId);
            var client = new XMLHttpRequest();
            //path is the parent menu item id + the file name
            client.open('POST', info.parentMenuItemId + '/' + listOfComponents[j][1]);
            client.onreadystatechange = function () {
                // console.log("client ");
                //console.log(client);
                if (client.readyState == 4) {
                    copyToClipBoard(client.responseText);
                }
            }
            client.send();
        }
    }


});

function copyToClipBoard(textToCopy) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = textToCopy;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    function copyToClip(str) {
        function listener(e) {
            e.clipboardData.setData("text/html", str);
            e.clipboardData.setData("text/plain", str);
            e.preventDefault();
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
    };
};

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, {
        file: "jquery-3.6.0.slim.min.js"
    }, function () {
        chrome.tabs.executeScript(null, {
            file: "getDomComponentTabs.js"
        }, );
    });


});
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("sender:");
        console.log(sender);
        console.log("sender.tab.url: " + sender.tab.url);
        findComponents(sender.tab.url);
        //console.log("======sendResponse====== ");
        //console.log(sendResponse);
        //console.log("======sender====== ");
        //console.log(sender.tab.url);
        //console.log("======request====== ");
        //console.log(request);
        if (request.greeting == "hello")
            sendResponse({
                farewell: "goodbye"
            });

    }
);

function findComponents(url) {
    console.log("findComponents");

    if (url.includes("quickwires.html")) { //if the url has quickwires.html in its path, find the components in the url
        findComponentsInURL(url);
    }

};

function findComponentsInURL(url) {
    var components = url.split("#"); //get the string after "#" in the URL
    components = components[1].split(".");
    for (var i = 0; i < components.length; i++) {

        components[i] = components[i].replace(/[0-9]|\&/g, '');
        //console.log(components[i]);
        if (components[i] == "" || components[i] == '') {
           
        }
    }
    //remove empty strings 
    components = components.filter(Boolean);   
    console.log(components);
    buildTempltePage(components);
}



function buildTempltePage(components) {
    var pageTemplate = "";
    for (var k = 0; k < listOfComponents.length; k++) {
        if (listOfComponents[k][1] == 'SEO-_URL_Breadcrumb.html') {
            //console.log("seo found");
            pageTemplate = listOfComponents[k][3];
        }
    }

    for (var i = 0; i < components.length; i++) {
        for (var j = 0; j < listOfComponents.length; j++) {
            if (components[i] == listOfComponents[j][2])
                pageTemplate = pageTemplate + listOfComponents[j][3];
        }

    }

    copyToClipBoard(pageTemplate);



};