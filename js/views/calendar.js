app.views.calendar = Backbone.View.extend({
	events: {
		"click .prev" : "prevMonth",
		"click .next" : "nextMonth"
	},

	initialize: function(options) {
		this.render();
	},

	render: function() {
		var dateString = this.getCurrentDateString();
		this.$el.find('.current-date').html(dateString);
	},

	prevMonth: function() {
		this.setNewMonth('prev');
	},

	nextMonth: function() {
		this.setNewMonth('next');
	},

	setNewMonth: function(direction) {
		var month = app.calendar.get('currentMonth'),
			newMonth;

		if(direction === 'prev')
			newMonth = month - 1;

		if(direction === 'next')
			newMonth = month + 1;

		app.calendar.set('currentMonth', newMonth, { direction: direction });
		this.render();
	},

	getCurrentDateString: function() {
		var monthName = ['Январь', 'Февраль', 'Март',     'Апрель',  'Май',    'Июнь',
						 'Июль',   'Август',  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			date = new Date((new Date).getFullYear(), app.calendar.get('currentMonth')),
			cell = monthName[date.getMonth()] + ' ' + date.getFullYear() + ' года';

		return cell;
	}
});