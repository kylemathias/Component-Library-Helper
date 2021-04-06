(function() {

var allComponents = $('n-call-out,n-card-band,n-fancy-callout,n-feature-tiles,n-hero,n-image-3tabs,n-image-with-tiles,n-intro,n-offset-cards,n-prose,n-quote-band,n-quote-band-tabbed,n-section-header,n-showcase,n-side-x-side,n-side-x-side-2-tabs,n-tabbed-band,n-tabbed-band-tiles,n-title'); //all components
console.log("icon clicked");
console.log(allComponents);

var arrayOfComponents = [];

for(var i = 0; i < allComponents.length; i++ ){

}
 
})();

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    
    console.log(response.farewell);
  });
  