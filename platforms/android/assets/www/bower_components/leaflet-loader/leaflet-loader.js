(function() {

L.Control.Loader = L.Control.extend({
	onAdd: function(map) {
		this._map = map;
		this._container = L.DomUtil.create('div','leaflet-control-loader');
		this.hide();
		return this._container;
	},
	addTo: function (map) {
		this._container = this.onAdd(map);
		map.getContainer().appendChild(this._container);
		return this;
	},
	show: function() {
		this._container.style.display = 'block';
		return this;
	},
	hide: function() {
		this._container.style.display = 'none';
		return this;		
	}
});

L.Map.addInitHook(function () {
    if (this.options.loaderControl) {
        this.loaderControl = L.control.loader(this.options.loaderControl);
        this.addControl(this.loaderControl);
    }
});

L.control.loader = function (options) {
    return new L.Control.Loader(options);
};

}).call(this);
