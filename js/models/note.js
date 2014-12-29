app.models.note = Backbone.Model.extend({
	defaults: {
		caption: '',
		text: '',
		day: (new Date).getDate(),
		month: (new Date).getMonth(),
		year: (new Date).getYear()
	},

	initialize: function() {}
});