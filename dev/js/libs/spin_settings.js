var opts = {
  lines: 7 // The number of lines to draw
, length: 0 // The length of each line
, width: 30 // The line thickness
, radius: 15 // The radius of the inner circle
, scale: 1.75 // Scales overall size of the spinner
, corners: 0.1 // Corner roundness (0..1)
, color: '#fff' // #rgb or #rrggbb or array of colors
, opacity: 0.1 // Opacity of the lines
, rotate: 9 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 0.8 // Rounds per second
, trail: 62 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '50%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: true // Whether to render a shadow
, hwaccel: true // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
}
spinner = new Spinner(opts);