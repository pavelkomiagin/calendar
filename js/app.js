var app = (function() {
	var api = {
		views: {},
		models: {},
		collections: {},
		calendar: null,
		notes: null,
		init: function() {
			this.calendar = new this.models.calendar();
			this.notes = new this.collections.notes();
			ViewsFactory.calendar();
			ViewsFactory.month();
			ViewsFactory.noteDlg();
			return this;
		},
	};

	var ViewsFactory = {
		calendar: function() {
			if(!this.calendarView) {
				this.calendarView = new api.views.calendar({
					el: $('.calendar')
				});
			}
			return this.calendarView;
		},
		month: function() {
			if(!this.monthView) {
				this.monthView = new api.views.month({
					el: $('.monthWrapper')
				});
			}
			return this.monthView;
		},
		noteDlg: function() {
			if(!this.noteDlgView) {
				this.noteDlgView = new api.views.noteDlg({
					el: $('.noteDlg')
				});
			}
			return this.noteDlgView;
		}
	};

	return api;
})();