'use strict';

import convert2geojson from 'convert2geojson';
import path from 'path';

(() => {
  $(".simple-map-input").hide();
/*
  You must set a map, first.
  If You do not set `zoom`, it will set `zoom` as default.
  default:
    zoom.normal -> 8
    zoom.min -> 1
    zoom.max -> 17
*/
  let map = convert2geojson.Init("map", {
    lat: 23.619, 
    lon: 120.795,
    zoom: {
      normal: 8, 
      min: 1,
      max: 17
    }
  });

/*
  If you need to add GPS positioning in your button, you can do this.
  This is default at 12.
*/
  $(".simple-map-set").click(() => { convert2geojson.Set(map); });
/*
  If you need to add resetting in your buttonm you can do this.
*/
  $(".simple-map-reset").click(() => {
    convert2geojson.Reset(map, {
      lat: 23.619, 
      lon: 120.795,
      zoom: 8
    });
  });
/*
  Show input
*/
  $(".simple-map-data").click(() => {
    $(".simple-map-input").toggle(400);
  });
/*
 check input
*/
  $(".simple-map-input").change(() => {
    let lon = $("#data-lon").val();
    let lat = $("#data-lat").val();
    let filePath = $("#data-file").val();

    if(lon != "" && lat != "" && filePath != "") {
      let symbol = { lon: lon, lat: lat, unit: { } };
      let file = $('#data-file').get(0).files[0];
      let filename = file.name;

      let reader = new FileReader();
      reader.readAsText(file, "utf8");
      reader.onload = (evt) => {
        let data = evt.target.result;
        let output = convert2geojson.Input(data, filename, symbol);
        convert2geojson.Add(map, undefined, [
          {'temp': {data: output}}
        ]); 
        $(".simple-map-input").toggle(400);
      };
    }
  });
})();