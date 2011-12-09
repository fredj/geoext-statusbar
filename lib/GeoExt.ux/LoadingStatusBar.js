/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

Ext.namespace("GeoExt.ux");

GeoExt.ux.LoadingStatusBar = Ext.extend(Ext.ux.StatusBar, {

    /** api: config[map]
     *  ``OpenLayers.Map`` or :class:`GeoExt.MapPanel`
     */
    map: null,

    /** private: property[counter]
     *  ``Integer``
     */
    counter: 0,

    /** private: method[constructor]
     *  Construct the component.
     */
    constructor: function(config) {
        if (config.map && config.map instanceof GeoExt.MapPanel) {
            config.map = config.map.map;
        }
        GeoExt.ux.LoadingStatusBar.superclass.constructor.call(this, config);
    },

    /** private: method[initComponent]
     *  Initialize the component.
     */
    initComponent: function() {
        GeoExt.ux.LoadingStatusBar.superclass.initComponent.call(this);
        this.bind();
        this.on("beforedestroy", this.unbind, this);
    },

    /** private: method[bind]
     */
    bind: function() {
        if (this.map) {
            this.map.events.on({
                preaddlayer: this.registerLayer,
                removelayer: this.unregisterLayer,
                scope: this
            });
            for (var i = 0, len = this.map.layers.length; i < len; i++) {
                this.registerLayer({layer: this.map.layers[i]});
            }
        }
    },

    /** private: method[unbind]
     */
    unbind: function() {
        if (this.map) {
            this.map.events.un({
                preaddlayer: this.registerLayer,
                removelayer: this.unregisterLayer,
                scope: this
            });
            for (var i = 0, len = this.map.layers.length; i < len; i++) {
                this.unregisterLayer({layer: this.map.layers[i]});
            }
        }
    },

    /** private: method[increaseCounter]
     */
    increaseCounter: function(evt) {
        this.counter++;
        this.showBusy();
    },

    /** private: method[decreaseCounter]
     */
    decreaseCounter: function(evt) {
        this.counter--;
        if (this.counter == 0) {
            this.clearStatus();
        }
    },

    /** private: method[registerLayer]
     */
    registerLayer: function(evt) {
        evt.layer.events.on({
            loadstart: this.increaseCounter,
            loadend: this.decreaseCounter,
            scope: this
        });
    },

    /** private: method[unregisterLayer]
     */
    unregisterLayer: function(evt) {
        evt.layer.events.un({
            loadstart: this.increaseCounter,
            loadend: this.decreaseCounter,
            scope: this
        });
    }
});

/** api: xtype = gxux_statusbar */
Ext.reg('gxux_statusbar', GeoExt.ux.LoadingStatusBar);
