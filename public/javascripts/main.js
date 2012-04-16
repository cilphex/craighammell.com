var Where = {
    map: null,
    map_options: {
        center: new google.maps.LatLng(27.0, 14.0),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    places: [
        {
            name: 'Paris, France',
            loc: new google.maps.LatLng(48.8742, 2.3470)
        },
        {
            name: 'London, England',
            loc: new google.maps.LatLng(51.5171, 0.1062)
        },
        {
            name: 'Cusco, Peru',
            loc: new google.maps.LatLng(-13.525, -71.972222)
        },
        {
            name: 'Switzerland',
            loc: new google.maps.LatLng(46.8637, 8.1028)
        }
    ],
    markers: [],
    initialize: function() {
        this.setupMap();
        this.setupMarkers();
    },
    setupMap: function() {
        this.map = new google.maps.Map(document.getElementById("map_canvas"), this.map_options);
    },
    setupMarkers: function() {
        // $.each fucks with 'this' unless you bind it; screw that.
        for (var i = 0, place; place = this.places[i]; i++) {
            console.log('place', place);
            this.markers.push(new google.maps.Marker({
                title: place.name,
                position: place.loc,
                map: this.map
            }));
        }
    }
};

var CH = {
    map: null,
    map_options: {
        center: new google.maps.LatLng(27.0, 14.0),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    setupMap: function() {
        this.map = new google.maps.Map(document.getElementById("map_canvas"), this.map_options);
    }
};




