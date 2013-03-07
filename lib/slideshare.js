var rest = require('restler');
var crypto = require('crypto');
var fs = require('fs');

function sha1( data ) {
     var generator = crypto.createHash('sha1');
     generator.update( data )  
     return generator.digest('hex') 
}

function SlideShare(api_key, secret) {
 
     this.api_key = api_key;
     this.secret = secret; 
     this.debug = false;
}

SlideShare.prototype = {

     api_key: '',

     secret: '',

     endpoint: 'https://slideshare.net/api/2/',

     timestamp: function() { return Math.round(new Date().getTime() / 1000) },

     current_hash: function() {

         return sha1(this.secret + this.timestamp())

     },

     coreParams: function() {
           return {
               data: {
                  api_key: this.api_key,
                  ts: this.timestamp(),
                  hash: this.current_hash()
               },
               parser: rest.parsers.xml
           }
     } 
}

/**
 *  Get Slideshow by User
 *  @param  (String) username_for username of owner.
 *  @param  (Object) optional parameters (limit,offset, username, password, unconverted).
 *  @return (Object) An object containing an array of slideshows.
 */

SlideShare.prototype.getSlideshowsByUser = function(username_for, opts, callback) {

          var params = this.coreParams()
              params.data.username_for = username_for

          if(opts != null) {

             //username of requesting user && password of requesting user
             if(opts.username != undefined && opts.password != undefined) {
                  
             } 
             //specify the number of slideshows to return
             params.data.limit = opts.limit || 10
             //specify the offset
             params.data.offset = opts.offset || 0
             //set it to 1 if you want a detailed response
             params.data.detailed = opts.detailed || 1
             //whether or not to include uncoverted slideshows. 1 to include them, 0 (default) otherwise
             params.data.get_unconverted = opts.get_unconverted || 1
          } 

          var p = '?';

          var par = params.data 

          var paramsdata = params.data

          for(var prop in par) {

              p = p + prop + '='+ par[prop] + '&'
          }


          var endpoint = this.endpoint + 'get_slideshows_by_user' + p

           //debug for endpoint
          if(this.debug) {

             fs.writeFile("endpoint.txt", endpoint, function(err) {
               if(err) {
                  console.log(err);
               } else {
                 console.log("The file was saved!");
               }
             }); 
 
             console.log( endpoint )
          }
          
          rest.get( endpoint ).on('complete', function( data ){
                 console.log( data )    
          })         
          
}

module.exports = SlideShare