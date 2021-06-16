/*==============================================================================
 * PRELOAD ING 3D DESIGN 
 *==============================================================================*/
function drawCanvasBase(gauge, W, H) {
    gauge.clearRect(0, 0, W, H);
    gauge.beginPath();
    gauge.strokeStyle = "transparent";
    gauge.lineWidth = 4;
    gauge.arc(W / 2, H / 2, 30, 0, Math.PI * 2, false);
    gauge.stroke();
}
function initCanvasStaff(gauge, color_gauge, color_font, width, height) {
    arcIncrement.startCanvas = arcIncrement.startCanvas + (Math.PI / 180);
    drawCanvasStaff(gauge, arcIncrement.startCanvas, color_gauge, color_font, width, height);
    var end1 = drawCanvasStaff(gauge, arcIncrement.startCanvas, color_gauge, color_font, width, height);
}
function drawCanvasStaff(gauge, arcEndStaff, color_gauge, color_font, W, H) {
    gauge.clearRect(0, 0, W, H);
    gauge.beginPath();
    gauge.strokeStyle = color_gauge;
    gauge.lineWidth = 4;
    gauge.arc(W / 2, H / 2, 30, 0 - 90 * Math.PI / 180, arcEndStaff - 90 * Math.PI / 180, false);
    gauge.stroke();

    gauge.fillStyle = color_font;
    gauge.font = "14px Century Gothic";
    var val = Math.floor((arcEndStaff / (2 * Math.PI)) * 100);
    if (val > 100)
        val = 100;
    var text = val + "%";
    var text_width = gauge.measureText(text).width;
    gauge.fillText(text, W / 2 - text_width / 2, H / 2 + 5);

    return arcEndStaff;
}