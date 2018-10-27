/*
 * JavaScript Load Image Demo JS
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global loadImage, HTMLCanvasElement, $ */

$(function () {
    'use strict'

    var result = $('#result')
    var exifNode = $('#exif')
    var thumbNode = $('#thumbnail')
    var currentFile


    function displayExifData (exif) {
        var thumbnail = exif.get('Thumbnail')
        var tags = exif.getAll()
        var table = exifNode.find('table').empty()
        var row = $('<tr></tr>')
        var cell = $('<td></td>')
        var prop
        if (thumbnail) {
          thumbNode.empty()
          loadImage(thumbnail, function (img) {
            thumbNode.append(img).show()
          }, {orientation: exif.get('Orientation')})
        }
        for (prop in tags) {
          if (tags.hasOwnProperty(prop)) {
            table.append(
              row.clone()
                .append(cell.clone().text(prop))
                .append(cell.clone().text(tags[prop]))
            )
          }
        }
        exifNode.show()
    }

    function updateResults (img, data) {
        console.log("***img***");
        console.log(img);
        console.log("***data***");
        console.log(data);
        var fileName = currentFile.name
        var href = img.src
        var dataURLStart
        var content
        if (!(img.src || img instanceof HTMLCanvasElement)) {
          content = $('<span>Loading image file failed</span>')
        } else {
          if (!href) {
            href = img.toDataURL(currentFile.type + 'REMOVEME')
            // Check if file type is supported for the dataURL export:
            dataURLStart = 'data:' + currentFile.type
            if (href.slice(0, dataURLStart.length) !== dataURLStart) {
              fileName = fileName.replace(/\.\w+$/, '.png')
            }
          }
          content = $('<a target="_blank">').append(img)
            .attr('download', fileName)
            .attr('href', href)
        }
        result.children().replaceWith(content)
        if (data && data.exif) {
          displayExifData(data.exif)
        }
    }

    function displayImage (file, options) {
        currentFile = file
        /*if (!loadImage(
          file,
          updateResults,
          options
        )) {
          result.children().replaceWith(
            $('<span>' +
              'Your browser does not support the URL or FileReader API.' +
              '</span>')
          )
        }*/

        var res = loadImage( file, updateResults, options)
        console.log("***res***");
        console.log(res);
    }

    function dropChangeHandler (e) {

        e.preventDefault()
        e = e.originalEvent
        var target = e.dataTransfer || e.target
        var file = target && target.files && target.files[0]

        var options = {
          maxWidth: result.width(),
          canvas: true,
          pixelRatio: window.devicePixelRatio,
          downsamplingRatio: 0.5,
          orientation: true
        }
        if (!file) {
          return
        }
        exifNode.hide()
        thumbNode.hide()
        displayImage(file, options)
    }

    function dropChangeHandler1 (file) {
        
        var file = file

        var options = {
          maxWidth: result.width(),
          canvas: true,
          pixelRatio: window.devicePixelRatio,
          downsamplingRatio: 0.5,
          orientation: true
        }
        if (!file) {
          return
        }
        exifNode.hide()
        thumbNode.hide()
        displayImage(file, options)
    }

    // Hide URL/FileReader API requirement message in capable browsers:
       /* if (window.createObjectURL || window.URL || window.webkitURL ||
          window.FileReader) {
            result.children().hide()
        }*/

    $('#file-input')
    .on('change', dropChangeHandler)

    ///////////////////////////////////////////////////////////////////////////////
    var imageSVGUrl = "http://localhost/img_orientation/JavaScript-Load-Image-master/img/%7b8214248b-c55d-497b-a001-aaed3319ecd6%7d.svg";
    var imageUrl = "http://localhost/img_orientation/JavaScript-Load-Image-master/img/%7b4ec1d13c-7e91-45be-b8a3-2691cc7f3fef%7d.jpg";
    
    /*// demo 1
    function getDataUri(url, callback) {
        var image = new Image();

        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
            canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

            canvas.getContext('2d').drawImage(this, 0, 0);

            // Get raw image data
            //callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

            // ... or get as Data URI
            callback(canvas.toDataURL('image/png'));
        };

        image.src = url;
    }
    getDataUri(imageUrl, function(dataUri) {
        
        var dataURI = dataUri

        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ia], {
          type: 'image/jpeg'
        });
        var file = new File([blob], "image.jpg");
        console.log('***file***')
        console.log(file)
        dropChangeHandler1(file)
    });*/

    // demo 2
    loadImage(
        imageSVGUrl,
        function (img) {
            if(img.type === "error") {
                console.log("Error loading image " + imageSVGUrl);
            } else {
                $('#result1').append(img);
            }
        },    
        {
            maxWidth: 400,
            maxHeight: 400,
            canvas: true,
            pixelRatio: window.devicePixelRatio,
            downsamplingRatio: 0.5,
            orientation: true
        }
    );
    loadImage(
        imageUrl,
        function (img) {
            if(img.type === "error") {
                console.log("Error loading image " + imageUrl);
            } else {
                $('#result2').append(img);
            }
        },    
        {
            maxWidth: 400,
            maxHeight: 400,
            canvas: true,
            pixelRatio: window.devicePixelRatio,
            downsamplingRatio: 0.5,
            orientation: true
        }
    );

})
