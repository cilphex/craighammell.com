//"use strict";

var Where = {
    map: null,
    map_options: {
        center: new google.maps.LatLng(27.0, 14.0),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    // locs should be {x: 48.234, y: 2.340}, not LatLng objects
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

var ImageMagnifier = {
    
    is_open:    false,
    
    panel:      '#imagemagnify',
    image_area: '#imagemagnify .image',
    loader:     '#imagemagnify .loader',
    
    initialize: function() {
        this.setupDom();
        this.setupListeners();
    },
    setupDom: function() {
        // Take the html and put it here
    },
    setupListeners: function() {
        
        // Observe all 'img' tags with 'magnify' attribute
        $('img[magnify]').each(function(index, el) {
            var img_url = $(el).attr('magnify');
            $(el).click(this.show.bind(this, img_url));
        }.bind(this));
        
        // Observe black background for click to close
        $(this.image_area).click(this.close.bind(this));
        
        // Observe scroll for zoom
        $(this.image_area).bind('mousewheel', this.zoom.bind(this));
    },
    show: function(img_url, event) {
        this.is_open = true;
        $(this.panel).fadeIn(200);
        $(this.image_area).find('img').remove();
        $(this.loader).show();
        
        var img = new Image();
        $(img)
            .load(this.show_cb.bind(this, img))
            .error(this.show_error.bind(this))
            .attr('src', img_url);
    },
    show_cb: function(img, event) {
        $(this.loader).hide();
        var buffer = 20,
            width  = 100,
            height = 100,
            top    = 0,
            left   = 0;
        var area_width = $(this.image_area).width() - (buffer * 2);
        var area_height = $(this.image_area).height() - (buffer * 2);
        var area_wh_ratio = area_width / area_height;
        var img_wh_ratio = img.width / img.height;
        
        if (img_wh_ratio > area_wh_ratio) {
            width = Math.min(area_width, img.width);
            height = Math.round((1/img_wh_ratio) * width);
            left = Math.max(buffer, Math.round((area_width - width)/2) + buffer);
            top = Math.round((area_height - height)/2) + buffer;
        }
        else {
            height = Math.min(area_height, img.height);
            width = Math.round(img_wh_ratio * height);
            top = Math.max(buffer, Math.round((area_height - height)/2) + buffer);
            left = Math.round((area_width - width)/2) + buffer;
        }
        
        $(img).css({
            top: top,
            left: left,
            width: width,
            height: height
        }).draggable();
        
        $(this.image_area).append(img);
    },
    show_error: function() {
        alert('The image could not be loaded.');  
    },
    zoom: function(event) {
        if (event.originalEvent.wheelDelta >= 0) {
            console.log('zoom in');
        }
        else {
            console.log('zoom out');
        }
        event.preventDefault();
    },
    close: function() {
        this.is_open = false;
        $(this.panel).fadeOut(200);
    },
    // Will this be needed?  (event for window resizing)
    resize: function() {
        
    }
};

var Main = {
    initialize: function() {
        ImageMagnifier.initialize();
        this.setupListeners();
    },
    setupListeners: function() {
        this.setupScrollListener();
    },
    setupScrollListener: function() {
        $(document).scroll(this.scroll.bind(this));
    },
    scroll: function() {
        this.scroll_imageLoad();
    },
    scroll_imageLoad: function() {
        var scroll_top = $(window).scrollTop();
        var window_height = $(window).height();
        $('[_src]:not([src])').each(function(index, el) {
            el = $(el);
            var offset = el.offset().top;
            if (offset < scroll_top + window_height) {
                el.css({display: 'none'});
                el.bind('load', function() {
                    $(this).fadeIn(500);
                });
                el.attr('src', el.attr('_src'));
            }
        }.bind(this));
    }
};

$(Main.initialize.bind(Main));


