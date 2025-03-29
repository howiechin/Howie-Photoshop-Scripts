function renameTextLayer() {
    var doc = app.activeDocument;
    if (!doc) {
        alert("No document open.");
        return;
    }
    
    var layer = doc.activeLayer;
    if (!layer || layer.kind !== LayerKind.TEXT) {
        alert("Please select a text layer.");
        return;
    }
    
    var textContent = layer.textItem.contents;
    var maxLength = 15;
    
    var newName = textContent.length > maxLength ? textContent.substring(0, maxLength) + "..." : textContent;
    
    try {
        layer.name = newName;
    } catch (e) {
        alert("Failed to rename layer: " + e.message);
    }
}

renameTextLayer();
