import { stringify } from 'querystring';

// const base64js = require('js-base64').Base64;
var base64js = require('js-base64')
const TextEncoderLite = require('text-encoder-lite').TextDecoderLite;
const TextDecoderLite = require('text-encoder-lite').TextEncoderLite;
const TextEncoder = require('text-encoder').TextDecoder;
const TextDecoder = require('text-encoder').TextEncoder;

export function Base64Encode(file, encoding = 'utf-8') {
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = function(){
      console.log(reader.result)
      return stringify(reader.result)
    }
}

export function Base64Decode(str, encoding = 'utf-8') {
    var bytes = base64js.toByteArray(str);
    return new (typeof TextDecoder === "undefined" ? TextDecoderLite : TextDecoder)(encoding).decode(bytes);
}

export function binEncode(data) {
    var binArray = []
    var datEncode = "";

    for (var i=0; i < data.length; i++) {
        binArray.push(data[i].charCodeAt(0).toString(2)); 
    } 
    for (var j=0; j < binArray.length; j++) {
        var pad = padding_left(binArray[j], '0', 8);
        datEncode += pad + ' '; 
    }
    function padding_left(s, c, n) { if (! s || ! c || s.length >= n) {
        return s;
    }
    var max = (n - s.length)/c.length;
    for (var i = 0; i < max; i++) {
        s = c + s; } return s;
    }
    console.log(binArray);
}