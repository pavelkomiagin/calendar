app.views.month = Backbone.View.extend({
	template: _.template($('#tpl-month-grid').html()),

	events: {
		"click .day": "openCreateNoteDlg"
	},

	initialize: function(options) {
		this.render();
		app.calendar.on('change:currentMonth', this.changeMonth, this);
		this.listenTo(app.notes, 'add', this.showChangedNote);
		this.listenTo(app.notes, 'remove', this.showChangedNote);
	},

	changeMonth: function(model, changedMonth, params) {
		var dates = app.calendar.getMonthDays(),
			$otherMonth = $(this.template({ dates: dates })),
			direction = params.direction;

		this.$('.old-month').remove();
		this.$('.month').addClass('old-month');

		$otherMonth.css({ opacity: '0' });

		if(direction === 'prev')
			this.drawPrevMonth($otherMonth);

		if(direction === 'next')
			this.drawNextMonth($otherMonth);

	},

	drawPrevMonth: function($prevMonth) {
		this.$('.old-month').stop().clearQueue().animate({ opacity: '0' }, 500);

		this.$el.prepend($prevMonth);
		$prevMonth.css({ marginTop: '-641px' });

		$prevMonth.stop().clearQueue().animate({ marginTop: '0px', opacity: '1' }, 500, 'linear', _.bind(function() {
			this.$('.old-month').remove();
		}, this));
	},

	drawNextMonth: function($nextMonth) {
		this.$el.append($nextMonth);
		this.$('.old-month').stop().clearQueue().animate({ opacity: 0, marginTop: '-641px' }, 500, 'linear', _.bind(function() {
			$(this).remove();
		}, this));
		$nextMonth.stop().clearQueue().animate({ opacity: '1' }, 500);
	},

	showChangedNote: function() {
		this.$('.selected').removeClass('selected').addClass('unselected').delay(500).queue(_.bind(function(next) {
			$(this).removeClass('unselected');
			this.render();
			next();
		}, this));
	},

	render: function() {
		var dates = app.calendar.getMonthDays();
		this.$el.html(this.template({ dates: dates }));
	},

	openCreateNoteDlg: function(event) {
		var dateString;
		this.$('.selected').removeClass('selected');
		$day = $(event.currentTarget);
		$day.addClass('selected');
		dateString = $day.data('date');

		setTimeout(function() {
			app.calendar.trigger('openCreateNoteDlg', { dateString: dateString });
		}, 500);
	}
});