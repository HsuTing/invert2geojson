# Convert to Geojson

## Install

- You need to install [Node.js](https://nodejs.org/en/) (version >= 5.0.0).

```
  npm install convert2geojson
```

## Use

```
  ./node_modules/.bin/convert2geojson
```

If you want to see your data on a simple map, you can do this.

```
  ./node_modules/.bin/convert2geojson -test
```
- You can see your simple map at `http://localhost:9090/`.
- You need to modify `convert2geojson.config.js`. You can see [Open a simple map](https://github.com/HsuTing/convert2geojson/wiki/convert2geojson.config.js#open-a-simple-map).

## Config example

- File name must be `convert2geojson.config.js`

```
module.exports = { 
  input: [
    {'try': {
      url: './input/test.json',
      symbol: {lon: 'Longitude', lat: 'Latitude', unit: { Village: "Village" }}
    }}  
  ],  
  output: {
    filename: '[name].json',
    path: './output/'
  }   
}
```
You can see other settings in [wiki](https://github.com/HsuTing/convert2geojson/wiki).

## Input and Output Example

- [json](https://github.com/HsuTing/convert2geojson/wiki#json)

## Feature

- [x] Convert evey form to geojson.
- [x] Can choose personal properties.
- [x] File can be online or offline.
- [ ] File can be `json`, `csv`, `shapfile`.
- [x] Can open a simple map.
- [ ] In simple map, data can change on the basis of time.
- [ ] Customize style in simple map.
- [x] Can choose fields which should be included.
- [ ] Can reload config, If user add new file in `include`.
- [ ] Developer can add function before handling data.

## Issue

- Now, this program just can transform `json` to `geojson`.
- Can not compare `{}` and `[]`

## License

[MIT](https://github.com/HsuTing/convert2geojson/blob/master/LICENSE)
