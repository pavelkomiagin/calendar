app.models.calendar = Backbone.Model.extend({
	defaults: {
		currentMonth: (new Date).getMonth()
	},

	initialize: function() {},

	getMonthDays: function() {
		var now = new Date,
			currentMonth = this.get('currentMonth'),
			year = now.getFullYear(),
			date = new Date(now.getFullYear(), currentMonth),
			dayCount = (new Date(year, currentMonth + 1, 0)).getDate(),
			dayNum = 1 - (date.getDay() == 0 ? 7 : date.getDay()),
			days = [],
			iterationDate,
			note = {};

		for (var row = 0; row < 6; row++) {
			for (var col = 0; col < 7; col++) {
				inCurrentMonth = false;
				dayNum++;

				if (dayNum > 0 && dayNum <= dayCount) {
					inCurrentMonth = true;
				}

				iterationDate = (new Date(year, currentMonth, dayNum));
				day = iterationDate.getDate();

				note = app.notes.findWhere({
					day: day,
					month: iterationDate.getMonth(),
					year: iterationDate.getFullYear()
				});

				if(note) {
					note = note.toJSON();
				}

				days.push({
					day: day,
					inCurrentMonth: inCurrentMonth,
					date: iterationDate,
					note: note
				});
			}
		}
		return days;
	}
});