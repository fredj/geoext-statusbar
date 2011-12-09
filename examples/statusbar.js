Ext.onReady(function() {

    var map = new OpenLayers.Map();
    var foo = new GeoExt.ux.LoadingStatusBar({
        map: map
    });
    var mapPanel = new GeoExt.MapPanel({
        renderTo: "content",
        width: 800,
        height: 350,
        map: map,
        layers: [new OpenLayers.Layer.WMS("Global Imagery",
            "http://vmap0.tiles.osgeo.org/wms/vmap0",
            {layers: "basic"})],
        center: [16, 48],
        zoom: 5,
        bbar: foo
    });
});
