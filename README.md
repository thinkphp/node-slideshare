# node-slideshare

Wrapper SlideShare REST API for Node.js

# Installation

```
$ git clone git://github.com/thinkphp/node-slideshare.git

$ npm install node-slideshare
```

# Usage

```js

   var require("slideshare");

   var s = new SlideShare("api-key", "shared_secret");

       s.getSlideshowsByUser("thinkphp", function( data ) {

           if(window.console) console.log( data );
       });
```


## License

  MIT