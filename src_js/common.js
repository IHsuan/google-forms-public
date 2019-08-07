var windowWidth = $(window).width();

var breakpoint = {};
var modePc, modePhone;

breakpoint.getValue = function () {
    this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');

    modePhone = ['xs', 'sm'].indexOf(this.value) !== -1;
    modePc = !modePhone;
};

$(function () {

    breakpoint.getValue();

});



$(window).on('load', function () {

});



$(window).resize(function () {

    if ($(window).width() !== windowWidth) {
        location.reload();
    }

});



$(window).scroll(function () {

});
