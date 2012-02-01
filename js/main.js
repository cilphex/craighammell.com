// main.js

// Consider having this menu built dynamically by
// traversing the elements in the 'content' div
var Menu = [
	{
		text: 'Hello',
		page_id: 'hello'
	},
	{
		text: 'Projects',
		menu: [
			{
				text: 'Timeline',
				page_id: 'timeline',
				js: function() {
					Timeline.initialize();
				}
			},
			{
				//text: 'Notes.fm',
				text: 'Notes',
				page_id: 'notes'
			},
			{
				//text: 'Qufoto',
				text: 'Bacon',
				page_id: 'qufoto'
			},
			{
				//text: 'OkCupid',
				text: 'Elephant',
				menu: [
					{
						text: 'Pages',
						page_id: 'okc-pages'
					},
					{
						text: 'App',
						page_id: 'okc-app'
					},
					{
						text: 'Extension',
						page_id: 'okc-extension'
					}
				]
			}
		]
	},
	{
		//text: 'Resum&eacute;',
		text: 'Testing',
		page_id: 'resume'
	},
	{
		//text: 'Contact',
		text: 'Example',
		page_id: 'contact'
	}
];

var Main = {

	defaults: {
		menu_area: 'nav',
		item_text: '&mdash;'
	},

	// Needed?  Not currently being used.
	menu_ids: [],
	
	initialize: function() {
		this.setupMenu(Menu);
		this.showFirstPage(Menu);
	},

	setupMenu: function(menu, target) {
		var main = false;
		if (!target) {
			target = $(this.defaults.menu_area);
			main = true;
		}
		var ul_id = 'menu-' + (Math.random() * 1000000).round();
		var ul = new Element('ul', {
			id: ul_id,
			style: main ? '' : 'display: none;'
		});
		this.menu_ids.push(ul_id);
		for (var i = 0; i < menu.length; i++) {
			var item = menu[i];
			item.text = item.text || this.defaults.item_text;
			var li = new Element('li');
			var pound = '#' + item.page_id;
			var a = new Element('a', {href: pound}).update(item.text);
			li.insert({bottom: a});
			if (item.menu) {
				var sub_ul_id = this.setupMenu(item.menu, li);
				a.observe('click', this.menuClick.bindAsEventListener(this, sub_ul_id));
			}
			else {
				a.observe('click', this.itemClick.bindAsEventListener(this, item));
			}
			ul.insert({bottom: li});
		}
		target.insert({bottom: ul});
		return ul_id;
	},

	showFirstPage: function(menu) {

		var tag = location.hash.length > 1 ? location.hash.substr(1) : null;

		if (tag)
			this.showPage(tag);
		else if (menu[0].page_id)
			this.showPage(menu[0])
		else if (menu[0].menu)
			this.showFirstPage(menu[0].menu)
		else
			alert('Whoops, no page to show.');
	},

	menuClick: function(e, ul_id) {
		$(ul_id).toggle();
	},

	itemClick: function(e, page_id) {
		if (this.current_page) {
			this.hidePage(this.current_page);
		}
		this.showPage(page_id);
	},

	showPage: function(item) {
		this.hidePage(this.current_page);
		var page = typeof item == 'string' ? $(item) : $(item.page_id);
		setTimeout(function() {
			page.show();
			setTimeout(function() {
				page.removeClassName('hidden');
				if (item.js)
					item.js();
			}, 10);
			this.current_page = page.id;
		}.bind(this), 250);
	},

	hidePage: function(page_id) {
		var page = $(page_id);
		if (!page)
			return;
		page.addClassName('hidden');
		setTimeout(function() {
			page.hide();
		}, 150);
	}

};

var Timeline = {
	
	initialize: function() {
		console.log('yes');
	}

};