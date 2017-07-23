var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 // var ObjectId = Schema.ObjectId;

var rolocorpSchema = new Schema({
	corpName: 	 String,
  corpPoc:     {
    name:      String, 
    phone:     String,
    email:     String
  },  
  corpAddress: {
    street:    	String,
    city:      	String,
    state:     	String,
    country:   	String,
    postalCode: String
  },
  corpInfo:     {
    webSite:    String,
    phone:      String,
    desc:       String,
    mapCoord:   {
      lat:      String,
      lon:      String
    }
  }, 
  created: {type: Date, default: Date.now}
});

  Rolocorp = mongoose.model('Rolocorp', rolocorpSchema);
 
  module.exports = Rolocorp;