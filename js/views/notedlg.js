app.views.noteDlg = Backbone.View.extend({
	template: _.template($('#tpl-note-dlg').html()),

	events: {
		"click .close": "close",
		"click .save": "save",
		"click .remove": "remove"
	},

	initialize: function(options) {
		app.calendar.on('openCreateNoteDlg', this.render, this);
	},

	render: function(params) {
		var date = new Date(params.dateString),
			note;

		this.date = date;
		$('.noteDlgWrapper').show();

		note = app.notes.findWhere({
			day: date.getDate(),
			month: date.getMonth(),
			year: date.getFullYear()
		});

		if(note) {
			note = note.toJSON();
		}

		this.$el.html(
			this.template({
				date: date.format('dd.mm.yy'),
				note: note
			})
		);
	},

	close: function() {
		$('.noteDlgWrapper').hide();
		this.$el.empty();
		$('.day.selected').removeClass('selected').addClass('unselected').delay(1000).queue(function(next) {
			$(this).removeClass('unselected');
			next();
		});
	},

	save: function() {
		var caption = this.$('#note-caption').val(),
			text = this.$('#note-text').val(),
			day = this.date.getDate(),
			month = this.date.getMonth(),
			year = this.date.getFullYear();

		note = app.notes.findWhere({
			day: day,
			month: month,
			year: year
		});

		if(note) {
			app.notes.remove(note);
		}

		app.notes.add(
			new app.models.note({
				caption: caption,
				text: text,
				day: day,
				month: month,
				year: year
			})
		);

		this.close();
	},

	remove: function() {
		var	day = this.date.getDate(),
			month = this.date.getMonth(),
			year = this.date.getFullYear();

		note = app.notes.findWhere({
			day: day,
			month: month,
			year: year
		});

		if(note) {
			app.notes.remove(note);
		}

		this.close();
	}
});