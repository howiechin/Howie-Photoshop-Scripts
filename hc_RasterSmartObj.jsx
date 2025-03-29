// Function to rasterize smart objects while preserving hidden state
function rasterizeSmartObjects(doc) {
    for (var i = doc.layers.length - 1; i >= 0; i--) {
        var layer = doc.layers[i];

        // Store the layer's visibility state
        var wasVisible = layer.visible;

        // Check if the layer is a smart object
        if (layer.kind == LayerKind.SMARTOBJECT) {
            layer.rasterize(RasterizeType.ENTIRELAYER);
        }

        // If it's a group, process its layers
        if (layer.typename == "LayerSet") {
            rasterizeSmartObjects(layer);
        }

        // Restore original visibility state
        layer.visible = wasVisible;
    }
}

// Run the script on the active document
if (app.documents.length > 0) {
    rasterizeSmartObjects(app.activeDocument);
} else {
    alert("No open documents!");
}
