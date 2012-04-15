var CH = {
    map: null,
    map_options: {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    setupMap: function() {
        this.map = new google.maps.Map(document.getElementById("map_canvas"), this.map_options);
    }
};