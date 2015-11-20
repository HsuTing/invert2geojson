/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _convert2geojson = __webpack_require__(1);

	var _convert2geojson2 = _interopRequireDefault(_convert2geojson);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	  /*
	    You must set a map, first.
	    If You do not set `zoom`, it will set `zoom` as default.
	    default:
	      zoom.normal -> 8
	      zoom.min -> 1
	      zoom.max -> 17
	  */
	  var map = _convert2geojson2.default.Init("map", {
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
	  $(".simple-map-set").click(function () {
	    _convert2geojson2.default.Set(map);
	  });
	  /*
	    If you need to add resetting in your buttonm you can do this.
	  */
	  $(".simple-map-reset").click(function () {
	    _convert2geojson2.default.Reset(map, {
	      lat: 23.619,
	      lon: 120.795,
	      zoom: 8
	    });
	  });
	  /*
	    Then you can add Data.
	    The second argument is the path for your files, form is (your path)/[name].(your file extension)
	    The third argumet is add your data, and it need to be in array. You can see [https://github.com/HsuTing/convert2geojson/wiki/open-a-simple-map].
	  */
	  _convert2geojson2.default.Add(map, "./example/data/[name].geojson", [{ 'data': {} }]);
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let convert2geojson = {};

	convert2geojson.Input = __webpack_require__(2);
	convert2geojson.Map = __webpack_require__(6);
	convert2geojson.Init = __webpack_require__(8);
	convert2geojson.Add = __webpack_require__(10);
	convert2geojson.Reset = __webpack_require__(9).resetView;
	convert2geojson.Set = __webpack_require__(9).setPlace;

	module.exports = convert2geojson;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let path = __webpack_require__(3);
	let jsonProcessor = __webpack_require__(5);

	module.exports = (data, filename, symbol) => {
	  let type = path.extname(filename).replace('.', '');
	  let output = "";

	  switch(type) {
	    case 'json':
	      output = jsonProcessor(JSON.parse(data), symbol);
	      break;
	    default:
	      let colors = require('colors');
	      console.log(("Can not convert this type. If you need to convert to this type, you can open issue in here[").red + ("https://github.com/HsuTing/convert2geojson/issues").underline.blue + ("].").red);
	      break;
	  }

	  return output;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	let compare = (input, symbol) => {
	  for(let key in symbol) {
	    if(input[key] == undefined || typeof(input[key]) != typeof(symbol[key]))
	      return false;
	  }
	  return true;
	}

	let reSort = (input, symbolData, arraySymbol, symbol) => {
	  if(!compare(input, symbol)) {
	    if(typeof(input) == "object") {
	      for(let key in input) {
	        if(symbol.path != undefined && symbol.path == key) {
	          symbolData[key] = input[key];
	        }
	        else if(symbol.lat == key) {
	          symbolData[key] = input[key];
	        }
	        else if(symbol.lon == key) {
	          symbolData[key] = input[key];
	        }
	        else {
	          reSort(input[key], symbolData, arraySymbol, symbol);
	          if(typeof(input[key]) != "object") {
	            if(symbolData[key] == undefined) {
	              symbolData[key] = input[key];
	            }
	            else {
	              if(typeof(symbolData[key]) == "object") {
	                let temp = {};
	                temp[key] = input[key];
	                symbolData[key].push(temp);
	              }   
	              else {
	                let temp1 = {};
	                let temp2 = {};
	                temp1[key] = symbolData[key];
	                temp2[key] = input[key];
	                symbolData[key] = [];
	                symbolData[key].push(temp1);
	                symbolData[key].push(temp2);
	              }
	            }
	          }
	        }
	      }
	    }
	  }
	  else {
	    arraySymbol.push(input);
	  }
	}

	let combine = (tempSymbol, symbolData, symbol) => {
	  for(let key in tempSymbol) {
	    if(typeof(tempSymbol[key]) == "object") {
	      if(symbol.path != undefined && symbol.path == key) {
	        symbolData[key] = tempSymbol[key];
	      }
	      else if(symbol.lon == key) {
	        symbolData[key] = tempSymbol[key];
	      }
	      else if(symbol.lat == key) {
	        symbolData[key] = tempSymbol[key];
	      }
	      else {
	        combine(tempSymbol[key], symbolData);
	      }
	    }
	    else {
	      if(symbolData[key] == undefined) {
	        symbolData[key] = tempSymbol[key];
	      }
	      else {
	        if(typeof(symbolData[key]) == "object") {
	          let temp = {};
	          temp[key] = tempSymbol[key];
	          symbolData[key].push(temp);
	        }
	        else {
	          let temp1 = {};
	          let temp2 = {};
	          temp1[key] = symbolData[key];
	          temp2[key] = tempSymbol[key];
	          symbolData[key] = [];
	          symbolData[key].push(temp1);
	          symbolData[key].push(temp2);
	        }
	      }
	    }
	  }
	}

	let findSymbol = (input, output, symbol) => {
	  for(let key in input) {
	    if(typeof(input[key]) == "object") {
	      if(symbol.path != undefined && symbol.path == key) {
	        for(let pId in input[key]) {
	          output.symbol.path.push(input[key][pId]);
	        }
	      }
	      else if(symbol.lon == key) {
	        output.symbol.lon = [];
	        for(let lonId in input[key]) {
	          output.symbol.lon.push(input[key][lonId]);
	        }
	      }
	      else if(symbol.lat == key) {
	        output.symbol.lat = [];
	        for(let latId in input[key]) {
	          output.symbol.lat.push(input[key][latId]);
	        }
	      }
	      else {
	        findSymbol(input[key], output, symbol);
	      }
	    }
	    else {
	      if(key == symbol.lon)
	        output.symbol.lon = input[key];
	      else if(key == symbol.lat)
	        output.symbol.lat = input[key];
	      else {
	        if(symbol.include != undefined) {
	          for(let includeKey in symbol.include) {
	            if(key == includeKey) {
	              output.data[ symbol.include[includeKey] ] = input[key];
	            }
	          }
	        }
	        else {
	          if(output.data[key] == undefined) {
	            output.data[key] = input[key];
	          }
		  else {
	            if(typeof(output.data[key]) == "object") {
	              output.data[key].push(input[key]);
	            } 
	            else {
	              let tempValue = output.data[key];
	              output.data[key] = [];
	              output.data[key].push(tempValue);
	              output.data[key].push(input[key]);
	            }
	          }
	        }
	      }
	    }
	  }
	}

	let makeTemplate = (data, type, coordinates) => {
	  let template = { type: "Feature", geometry: {} }
	  data.data.lon = data.symbol.lon;
	  data.data.lat = data.symbol.lat;

	  template.geometry.type = type;
	  template.geometry.coordinates = coordinates;
	  template.properties = data.data;

	  return template;
	}

	module.exports = (data, symbol) => {
	  let output = {
	    "type": "FeatureCollection",
	    "features": []
	  };

	  if(data[0] == undefined) {
	    data = [ data ];
	  }

	  if(symbol.lon == undefined || symbol.lat == undefined || symbol.unit == undefined) {
	    console.log("Error, 'lon', 'lat', 'unit' is needed.");
	    process.exit();
	  } 

	  for(let itemId in data) {
	    let item = data[itemId];
	    let symbolData = {};
	    let arraySymbol = [];
	    reSort(item, symbolData, arraySymbol, symbol.unit); 

	    for(let symbolId in arraySymbol) {
	      let outputSymbol = { symbol: { lon: "", lat: "", path: [] }, data: {} };
	      let tempSymbol = arraySymbol[symbolId];
	      let tempSymbolData = JSON.parse(JSON.stringify(symbolData));

	      combine(tempSymbol, tempSymbolData, symbol);
	      findSymbol(tempSymbolData, outputSymbol, symbol);

	      if(outputSymbol.symbol.path.length == 0) {
	        outputSymbol.data.lon = outputSymbol.symbol.lon;
	        outputSymbol.data.lat = outputSymbol.symbol.lat;
	        if(typeof(outputSymbol.symbol.lon) == "object" && typeof(outputSymbol.symbol.lat) == "object") {
	          for(let id in outputSymbol.symbol.lon) {
	            output.features.push( makeTemplate(outputSymbol, "Point", [parseFloat(outputSymbol.symbol.lon[id]), parseFloat(outputSymbol.symbol.lat[id])]) );
	          }
	        }
	        else {
	          output.features.push( makeTemplate(outputSymbol, "Point", [parseFloat(outputSymbol.symbol.lon), parseFloat(outputSymbol.symbol.lat)]) );
	        }
	      }
	      else {
	        if(outputSymbol.symbol.lon != "" && outputSymbol.symbol.lat != "") {
	          outputSymbol.data.lon = outputSymbol.symbol.lon;
	          outputSymbol.data.lat = outputSymbol.symbol.lat;
	          if(typeof(outputSymbol.symbol.lon) == "object" && typeof(outputSymbol.symbol.lat) == "object") {
	            for(let id in outputSymbol.symbol.lon) {
	              output.features.push( makeTemplate(outputSymbol, "Point", [parseFloat(outputSymbol.symbol.lon[id]), parseFloat(outputSymbol.symbol.lat[id])]) );
	            }
	          }
	          else {
	            output.features.push( makeTemplate(outputSymbol, "Point", [parseFloat(outputSymbol.symbol.lon), parseFloat(outputSymbol.symbol.lat)]) );
	          }
	        }

	        outputSymbol.data.path = outputSymbol.symbol.path;
	        let type = (typeof(outputSymbol.symbol.path[0][0]) == "object") ? "Polygon" : "LineString";
	        output.features.push( makeTemplate(outputSymbol, type, outputSymbol.symbol.path) );
	      }
	    }
	  }

	  return JSON.stringify(output);
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let button = __webpack_require__(7);

	let path = __webpack_require__(3);

	let Init = __webpack_require__(8);
	let Reset = __webpack_require__(9).resetView;
	let Set = __webpack_require__(9).setPlace;
	let Add = __webpack_require__(10);

	module.exports = (Config) => {
	  $('#' + Config.simple.id)
	    .addClass('simple-map')
	    .html(button);
	  let map = Init(Config.simple.id, Config.simple.center);
	  let outputPath = path.join(Config.output.path, Config.output.filename);
	  Add(map, outputPath, Config.simple.include);

	  let reset = {
	    lat: Config.simple.center.lat,
	    lon: Config.simple.center.lon,
	    zoom: Config.simple.center.zoom.normal
	  };

	  $(".simple-map-reset").click(() => { Reset(map, reset); });
	  $(".simple-map-set").click(() => { Set(map); });
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"simple-map-button\">\n  <button class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--2dp simple-map-reset\">\n    <i class=\"material-icons\">refresh</i>\n  </button>\n\n  <button class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--2dp simple-map-set\">\n    <i class=\"material-icons\">place</i>\n  </button>\n</div>\n";

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	module.exports = (id, center) => {
	  if(center.zoom == undefined) {
	    center.zoom = {};
	  }
	  else if(typeof(center.zoom) != "object") {
	    center.zoom = {};
	  }
	  if(center.zoom.normal == undefined) {
	    center.zoom.normal = 8;
	  }
	  if(center.zoom.min == undefined) {
	    center.zoom.min = 1;
	  }
	  if(center.zoom.max == undefined) {
	    center.zoom.max = 17;
	  }
	  if(parseInt(center.zoom.min) < 1 || parseInt(center.zoom.min) > 17) {
	    center.zoom.min = 1;
	  }
	  if(parseInt(center.zoom.max) < 1 || parseInt(center.zoom.max) > 17) {
	    center.zoom.max = 17;
	  }
	  if(parseInt(center.zoom.normal) < 1 || parseInt(center.zoom.normal) > 17) {
	    center.zoom.normal = 8;
	  }
	  if(center.zoom.min < center.zoom.normal && center.zoom.max > center.zoom.normal) {
	  }
	  else {
	    center.zoom.normal = center.zoom.max;
	  }
	  if(id == undefined) {
	    id = "map";
	    $("#map").addClass('simple-map');
	  }

	  let map = L.map(id).setView(new L.LatLng(center.lat, center.lon), center.zoom.normal);

	  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
	    maxZoom: center.zoom.max,
	    minZoom: center.zoom.min,
	    attribution: "Imagery from <a href=\"http://giscience.uni-hd.de/\">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
	    id: "hsuting.o5ag6mm2",
	    accessToken: "pk.eyJ1IjoiaHN1dGluZyIsImEiOiJRajF4Y0hjIn0.9UDt8uw_fxEX791Styd-lA"
	  }).addTo(map);

	  return map;
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	let Button = {};
	Button.setPlace = (map) => {
	  function setPosition(position) {
	    map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 12);
	  };

	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(setPosition);
	  }
	}

	Button.resetView = (map, center) => {
	  map.setView(new L.LatLng(center.lat, center.lon), center.zoom);
	};

	module.exports = Button;


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	module.exports = (map, path, files) => {
	  for(let i in files) {
	    let fileName = Object.keys(files[i])[0];
	    let url = path.replace('[name]', fileName);
	    let file = files[i][fileName];

	    $.getJSON(url, (data) => {
	      L.geoJson(data, {
	        onEachFeature(feature, layer) {
	          let html = ""; 

	          if(file.title == undefined && file.content == undefined) {
	            for(let key in feature.properties) {
	              html += "<font class='content'>" + key + "： " + feature.properties[key] + "</font><br/>";
	            }   
	            layer.bindPopup(html);
	          }
	          else {
	            for(let key in file.title) {
	              html += "<font class='header'>" + file.title[key] + (file.title[key] == "" ? "" : "： ") + feature.properties[key] + "</font><br/>"
	            }
	            for(let key in file.content) {
	              html += "<font class='content'>" + file.content[key] + (file.content[key] == "" ? "" : "： ") + feature.properties[key] + "</font><br/>"
	            }
	            layer.bindPopup(html);
	          }
	        },  
	        pointToLayer(feature, point) {
	          let marker = L.marker(point);
	          return marker;
	        }
	      }).addTo(map);
	    });
	  }
	}


/***/ }
/******/ ]);