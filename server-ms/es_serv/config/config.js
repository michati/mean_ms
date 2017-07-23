//var cas = require('casual');

var corpData = [];

module.exports = function () {
 

  function esCorpTemplate () {
    return {
      name : "rolodex_template",
      body:{
        "template": "rolodex_*",
          "settings": {
            "index": {
              "analysis": {
                "analyzer": {
                  "analyzer_whitespace": {
                    "filter": "lowercase",
                    "tokenizer": "whitespace"
                  }
                }
              }
            }
          },
          "aliases": {
            "all_rolodex": {}
          },
          "mappings": {
            "company": {
              "dynamic_templates": [{
                "string_fields": {
                  "mapping": {
                    "index": "not_analyzed",
                    "omit_norms": true,
                    "type": "string"
                  },
                  "match": "*",
                  "march_mapping_type": "string"
                }
            }],
            "_all": {
              "enabled": true
            },
            "properties": {
              "name": {"type": "string", "index": "not_analyzed"},
              "email": {"type": "string", "index": "not_analyzed"},
              "country": {"type": "string", "index": "not_analyzed"},
              "state": {"type": "string", "index": "not_analyzed"},
              "address": {"type": "string", "index": "not_analyzed"},
              "location": {
                "type": "nested",
                "include_in_parent": true,
                "properties": {
                  "lat": {"type": "geo_point", "index": "not_analyzed"},
                  "lon": {"type": "geo_point", "index": "not_analyzed"}
                }
              },
              "poc": {
                "type": "object",
                "properties": {
                  "name": {"type": "string", "index": "not_analyzed"},
                  "phone": {"type": "string", "index": "not_analyzed"}
                }
              },
              "officer": {
                "type": "object",
                "properties": {
                  "name": {"type": "string", "index": "not_analyzed"},
                  "phone": {"type": "string", "index": "not_analyzed"}
                }
              }
            }
          }
        }
      }
    };
  }  

  function esCompanyData () {
    var cas = require('casual');
    return {
      "index": process.env.ES_INDEX,
      "type": process.env.ES_TYPE,
      "body": {
        "company": {
          "name": cas.company_name,
          "email": cas.email,
          "state": cas.state,
          "country": cas.country,
          "address": cas.address,
          "location": {
            "lat": cas.latitude,
            "lon": cas.longitude
          }
        },
        "poc": [{
          "name": cas.full_name,
          "phone": cas.phone
        }],
        "officer": [{
          "name": cas.full_name,
          "phone": cas.phone
        }]
      }
    };
  }

  function transportClientConfig () {
    return {
      clientPort: process.env.TRANSPORT_PORT,
      clientHost: process.env.TRANSPORT_HOST,
      clientType: process.env.TRANSPORT_TYPE
    }
  }

  return {
    'template': esCorpTemplate(),
    'transClient': transportClientConfig(),
    'compData': esCompanyData()
  }
}


