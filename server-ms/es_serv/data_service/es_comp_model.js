var elasticsearch = require('elasticsearch-odm');


var rolodexCompanySchema = new elasticsearch.Schema({
  company: {
   	name: String,
   	email: String,
   	country: String,
   	state: String,
   	address: String,
   	location: {
   		lat: {type: 'geo_point'},
   		lon: {type: 'geo_point'}
   	}
  },
  poc: [{
  	name: String,
  	phone: String
  }],
  officer: [{
  	name: String,
  	phone: String
  }]

});

var Company = elasticsearch.model('Company', rolodexCompanySchema);

module.exports = Company;