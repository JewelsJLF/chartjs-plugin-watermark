/**
 *  (c) 2017 Julie Farkas
 *  @author: Julie Farkas
 *  @description: Chart.js watermark plugin
 *  @license: MIT
 */
 (function(Chart) {
'use strict';

    // watermark service
    Chart.plugins.register({

        defaultOptions: {

            // where to draw the text (if null, center text on chart)
            x: null,
            y: null,

            // how many degrees to rotate the text
            rotate: 0,

            // format of the text
            font: Chart.helpers.fontString(48, 'bold', Chart.defaults.global.defaultFontFamily),
            fillStyle: 'rgba(0,0,0,0.4)',
            textAlign: 'center',
            textBaseline: 'middle',

            // the text to draw on the canvas
            text: ''
        },

        afterDraw: function(chartInstance) {
            var watermark = chartInstance.watermark;
            if (watermark.text) {
                // get the chart context
                var ctx = chartInstance.chart.ctx;

                // save the context so we can restore later
                ctx.save();

                // set the style of the text
                ctx.font = watermark.font;
                ctx.fillStyle = watermark.fillStyle;
                ctx.textAlign = watermark.textAlign;
                ctx.textBaseline = watermark.textBaseline;

                // determine the position and rotation
                var canvas = chartInstance.chart;
                var x = watermark.x || (canvas.width / 2);
                var y = watermark.y || (canvas.height / 2);
                ctx.translate(x, y);
                ctx.rotate(watermark.rotate*Math.PI/180);

                // draw watermark
                ctx.fillText(watermark.text, 0, 0);

                // restore the context back to original
                ctx.restore();
            }
        },

        beforeInit: function (chartInstance) {
            var plugin = this;
            chartInstance.watermark = {};
            var helpers = Chart.helpers,
                options = chartInstance.options;
            if (options.watermark) {
                var clonedDefaultOptions = helpers.clone(plugin.defaultOptions),
                    watermark = helpers.extend(clonedDefaultOptions, options.watermark);
                chartInstance.watermark = watermark;
            }
        }
    });

})(Chart);
