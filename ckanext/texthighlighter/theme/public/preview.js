// json preview module
ckan.module('texthighlighter', function (jQuery, _) {
  return {
    options: {
      i18n: {
        error: _('An error occurred: %(text)s %(error)s')
      }
    },
    initialize: function () {
      var parameters = {
		  JSON: {
			  contentType: 'application/json', 
			  language: 'json', 
			  dataConverter: function (data) { return JSON.stringify(data, null, 2); }, 
			  dataType: 'json'},
		  XML: {
			  contentType: 'text/xml',
			  language: 'xml',
			  dataConverter: function (data) { return data; },
			  dataType: 'text'}
		  };

	  var self = this;
	  var p = parameters[preload_resource['format']];

      jQuery.ajax(preload_resource['url'], {
        type: 'GET',
        async: false,
		dataType: p.dataType,
        success: function(data, textStatus, jqXHR) {
	   	  self.el.html(hljs.highlightAuto(p.dataConverter(data)).value);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          self.el.html(self.i18n('error', {text: textStatus, error: errorThrown}));
        }
      });
    }
  };
});
