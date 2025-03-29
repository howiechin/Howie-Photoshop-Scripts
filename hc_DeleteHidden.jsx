function deleteHiddenLayers() {
    var doc = app.activeDocument;
    
    function deleteHidden(layerSet) {
        for (var i = layerSet.layers.length - 1; i >= 0; i--) {
            var layer = layerSet.layers[i];
            
            if (layer.typename === "LayerSet") {
                deleteHidden(layer);
                if (!layer.visible && layer.layers.length === 0) {
                    layer.remove();
                }
            } else {
                if (!layer.visible) {
                    layer.remove();
                }
            }
        }
    }
    
    deleteHidden(doc);
    alert("Hidden layers and groups deleted.");
}

deleteHiddenLayers();
