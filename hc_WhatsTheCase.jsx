//What's the case - v1.2 by howiechin ;)

#target photoshop
app.bringToFront();

// Function to convert text to different cases
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function toUpperCase(str) {
    return str.toUpperCase();
}

function toLowerCase(str) {
    return str.toLowerCase();
}

function toSentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Create a window using a different type that should stay open
var win = new Window("dialog", "Text Case Converter");
win.orientation = "column";
win.alignChildren = "center";
win.spacing = 10;
win.margins = 16;

// Radio button group
var caseGroup = win.add("panel", undefined, "Choose Case");
caseGroup.orientation = "column";
caseGroup.alignChildren = "left";
caseGroup.margins = 20;
caseGroup.spacing = 5;

// Add radio buttons
var titleCaseBtn = caseGroup.add("radiobutton", undefined, "Title Case");
var upperCaseBtn = caseGroup.add("radiobutton", undefined, "UPPERCASE");
var lowerCaseBtn = caseGroup.add("radiobutton", undefined, "lowercase");
var sentenceCaseBtn = caseGroup.add("radiobutton", undefined, "Sentence case");

// Set default selection to Title Case
titleCaseBtn.value = true;

// Status text
var statusText = win.add("statictext", undefined, "Ready to apply changes");
statusText.alignment = "center";
statusText.preferredSize.width = 200;

// Button group
var btnGroup = win.add("group");
btnGroup.orientation = "row";
btnGroup.alignChildren = "center";
btnGroup.spacing = 10;

// Create buttons without specific property names
var applyBtn = btnGroup.add("button", undefined, "Apply");
var closeBtn = btnGroup.add("button", undefined, "Close");
applyBtn.preferredSize = [100, 30];
closeBtn.preferredSize = [100, 30];

// Function to apply the selected transformation
function changeTextCase(caseType) {
    if (!app.documents.length) {
        alert("No document is open.");
        return;
    }
    
    try {
        var doc = app.activeDocument;
        var layers = doc.activeLayer;
        
        function processLayer(layer) {
            if (layer.kind === LayerKind.TEXT) {
                var textItem = layer.textItem;
                switch (caseType) {
                    case "title":
                        textItem.contents = toTitleCase(textItem.contents);
                        break;
                    case "upper":
                        textItem.contents = toUpperCase(textItem.contents);
                        break;
                    case "lower":
                        textItem.contents = toLowerCase(textItem.contents);
                        break;
                    case "sentence":
                        textItem.contents = toSentenceCase(textItem.contents);
                        break;
                }
            }
        }
        
        if (layers.typename === "ArtLayer") {
            processLayer(layers);
        } else if (layers.typename === "LayerSet") {
            for (var i = 0; i < layers.artLayers.length; i++) {
                processLayer(layers.artLayers[i]);
            }
        }
        
        statusText.text = "Applied " + caseType + " case!";
        app.refresh(); // Force UI update
    } catch (e) {
        statusText.text = "Error: " + e.message;
    }
}

// Apply button action
applyBtn.onClick = function() {
    var caseType = "title"; // Default to Title Case
    if (upperCaseBtn.value) caseType = "upper";
    if (lowerCaseBtn.value) caseType = "lower";
    if (sentenceCaseBtn.value) caseType = "sentence";
    
    changeTextCase(caseType);
};

// Close button action
closeBtn.onClick = function() {
    win.close();
};

// Center and show the dialog - use "palette" type which should stay open
win.center();
win.show();
