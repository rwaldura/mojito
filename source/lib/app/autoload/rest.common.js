/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


/*jslint anon:true, sloppy:true, nomen:true*/
/*global YUI*/


/**
 * Common Library
 * @module CommonLibs
 */
YUI.add('mojito-rest-lib', function(Y, NAME) {

    Y.namespace('mojito.lib');

    /**
     * @private
     */
    function ResponseObject(resp) {
        this._resp = resp;
    }


    ResponseObject.prototype = {
        getStatusCode: function() {
            return this._resp.status;
        },
        getStatusMessage: function() {
            return this._resp.statusText;
        },
        getHeader: function() {
            return this._resp.getResponseHeader.apply(this._resp, arguments);
        },
        getHeaders: function() {
            return this._resp.getAllResponseHeaders();
        },
        getBody: function() {
            return this._resp.responseText;
        }
    };


    /**
     * The Rest module for Mojito provides an easy way to make RESTful calls to
     * URLs without messing about with Y.io.
     * @class REST
     * @namespace Y.mojito.lib
     */
    Y.mojito.lib.REST = {

        /**
         * @private
         */
        _doRequest: function(method, url, params, config, callback) {
            // TODO: [Issue 72] Figure out why 'params' values are attaching
            // themselves to headers!
            var ioConfig = {
                method: method,
                data: params,
                on: {}
            };
            if (config) {
                ioConfig.headers = config.headers;
                ioConfig.timeout = config.timeout;
            }
            if (callback) {
                ioConfig.on.success = function(txid, resp) {
                    var responseObj = new ResponseObject(resp);
                    callback(null, responseObj);
                };
                ioConfig.on.failure = function(txid, resp) {
                    callback(resp);
                };
            }

            Y.io(url, ioConfig);
        },


        /**
         * Makes a RESTful GET request to specified URL
         * @method GET
         * @param {String} url RESTful URL to hit.
         * @param {Object} params parameters to add to the request.
         * @param {Object} config may contain 'headers' or 'timeout' values.
         * @param {Function} callback called with response or error.
         */
        GET: function() {
            var args = ['GET'].concat(Array.prototype.slice.call(arguments));
            this._doRequest.apply(this, args);
        },


        /**
         * Makes a RESTful POST request to specified URL
         * @method POST
         * @param {String} url RESTful URL to hit.
         * @param {Object} params parameters to add to the request.
         * @param {Object} config may contain 'headers' or 'timeout' values.
         * @param {Function} callback called with response or error.
         */
        POST: function() {
            var args = ['POST'].concat(Array.prototype.slice.call(arguments));
            this._doRequest.apply(this, args);
        },


        /**
         * Makes a RESTful PUT request to specified URL
         * @method PUT
         * @param {String} url RESTful URL to hit.
         * @param {Object} params parameters to add to the request.
         * @param {Object} config may contain 'headers' or 'timeout' values.
         * @param {Function} callback called with response or error.
         */
        PUT: function() {
            var args = ['PUT'].concat(Array.prototype.slice.call(arguments));
            this._doRequest.apply(this, args);
        },


        /**
         * Makes a RESTful DELETE request to specified URL
         * @method DELETE
         * @param {String} url RESTful URL to hit.
         * @param {Object} params parameters to add to the request.
         * @param {Object} config may contain 'headers' or 'timeout' values.
         * @param {Function} callback called with response or error.
         */
        DELETE: function() {
            var args = ['DELETE'].concat(Array.prototype.slice.call(arguments));
            this._doRequest.apply(this, args);
        },


        /**
         * Makes a RESTful HEAD request to specified URL
         * @method HEAD
         * @param {String} url RESTful URL to hit.
         * @param {Object} params parameters to add to the request.
         * @param {Object} config may contain 'headers' or 'timeout' values.
         * @param {Function} callback called with response or error.
         */
        HEAD: function() {
            var args = ['HEAD'].concat(Array.prototype.slice.call(arguments));
            this._doRequest.apply(this, args);
        }
    };

}, '0.1.0', {requires: [
    'io',
    'mojito'
]});
