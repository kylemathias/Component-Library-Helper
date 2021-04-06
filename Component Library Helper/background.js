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
        },

    );


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
    ['Side by Side 2 Tab', 'Side_x_Side_2_Tabs.html'],
    ['Accordions', 'Accordions.html'],
    ['Back to Top', 'Back_to_Top.html'],
    ['Callout', 'Callout.html'],
    ['Card Band With Images', 'Card_Band_Images.html'],
    ['Card Band', 'Card_Band.html'],
    ['Fancy Callout', 'Fancy_Callout.html'],
    ['Feature Tiles', 'Feature_Tiles.html'],
    ['Hero', 'Hero_Full.html'],
    ['Image with 3 Tabs', 'Image_with_3_Tabs.html'],
    ['Image with Tiles', 'Image_with_Tiles.html'],
    ['Intro', 'Intro.html'],
    ['Logo Band', 'Logo_Band.html'],
    ['Offset Cards', 'Offset_Cards.html'],
    ['Product Comparison Table', 'Product_Comparison_Table.html'],
    ['Prose Block Quote', 'Prose_Block_Quote.html'],
    ['Prose Full-Width Illustration', 'Prose_Full-Width_Illustration.html'],
    ['Prose II', 'Prose_II.html'],
    ['Prose Inline Media Player', 'Prose_Inline_Media_Player.html'],
    ['Prose Listicle', 'Prose_Listicle.html'],
    ['Prose Table of Contents', 'Prose_Table_of_Contents.html'],
    ['Prose', 'Prose.html'],
    ['ProseGroup Region', 'ProseGroup_Region.html'],
    ['Quote Band', 'Quote_Band.html'],
    ['Section Header', 'Section_HEader.html'],
    ['Showcase Product', 'Showcase_Product.html'],
    ['Stat Band', 'Stat_Band.html'],
    ['Tabbed Band with Tiles', 'Tabbed_Band_Tiles.html'],
    ['Tabbed Band', 'Tabbed_Band.html']
]

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

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    //console.log(tab);
    //console.log(info);

    var text;
    for (var j = 0; j < listOfComponents.length; j++) {
        if (info.menuItemId == listOfComponents[j][0] || info.menuItemId == (listOfComponents[j][0] + " ")) {
            //console.log("info.menuItemId: ");
            //console.log(info.menuItemId);
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
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, { file: "jquery-3.6.0.slim.min.js" }, function() {
        chrome.tabs.executeScript(null, { file: "getDomComponentTabs.js" },);
	});

});

