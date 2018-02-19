/**
 * Created by cintec on 19/02/2018.
 */
var loki = require('lokijs');


var db = new loki('loki.json');

var children = db.addCollection('children');


children.insert({name:'Sleipnir', legs: 8});
children.insert({name:'Jormungandr', legs: 0});
children.insert({name:'Hel', legs: 2});

console.log(children.get(1).name); // returns Sleipnir
children.find( {'name':'Sleipnir'} );
children.find( { legs: { '$gt' : 2 } } );