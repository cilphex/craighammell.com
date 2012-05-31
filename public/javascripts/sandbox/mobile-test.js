var MobileTest = {
    refresh: function(frame_id) {
        var frame_el = $('#' + frame_id + '_frame');
        var src = frame_el.attr('src');
        frame_el.attr('src', src);
    }
};