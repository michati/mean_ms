curl -XPUT 127.0.90.1:9200/_template/rolodex_template -d '
{
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

'


\  function createEsCorpTemplate (msg, response) {

    console.log('Entering GET /createEsCorpTemplate...');

    //console.log('Template:: ', JSON.stringify(options.template));

    esSetupClient.indices.putTemplate({
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
    }).then(function (res) {
      return response(null, {ok: true, template: res});

    }, function (err) {
      if (err) {
        return response(null, {ok: false, why: err});
      }

    });
    
    console.log('Leaving GET /createEsCorpTemplate...');

  }