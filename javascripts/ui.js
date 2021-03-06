// If hp, "The Hamsterpaj Namespace", wasn't defined before then define it!
if(typeof(hp) == 'undefined'){ var hp=new Object(); }

hp.ui = {
	init: function()
	{
		this.noticebar.init();
		this.user_search.init();
		this.hackerlund.init();
		this.grotescopaj.init();
		this.statusbar.init();
	},
	
	user_search: {
		init: function()
		{
			try
			{
				var user_search_box = document.getElementById('quicksearch_input');
				
				user_search_box.onfocus = function()
				{
				 if(this.value == this.defaultValue)
				 {
				  this.style.color = '#000000';
				  this.value = '';
				 }
				}
				
				user_search_box.onblur = function()
				{
				 if(this.value == '')
				 {
				  this.style.color = '#757575';
				  this.value = this.defaultValue;
				 }
				}
			} catch(E){}
		}
	},
	
	hackerlund:
	{
		doubleclick_counter: 0,
		size: 200,
		
		init: function()
		{
			try
			{
				document.getElementById('user_info').ondblclick = function()
				{
					hp.ui.hackerlund.start();
				}
			} catch(E){}
		},
		
		start: function()
		{
			if(this.doubleclick_counter++ == 1)
			{
				var all_images = document.getElementsByTagName('IMG');
				for(var this_image = 0; this_image < all_images.length; this_image++)
				{
					all_images[this_image].style.position = 'absolute';
					all_images[this_image].style.zIndex = 9000 + this_image;
				}
				
				// setInterval is a bad idea...
				this.update(0);
			}
		},
		
		update: function(step)
		{
			/*if(!confirm('Hej'))
			{
				alert('Die');
				return;
			}*/
			var all_images = document.getElementsByTagName('IMG');
			(Math.cos(Math.PI / 8) * this.size)
			for(var this_image = 0; this_image < all_images.length; this_image++)
			{
				//all_images[this_image].style.top = Math.floor(Math.random() * (600 - all_images[this_image].offsetTop)) + 'px';
				//all_images[this_image].style.left = Math.floor(Math.random() * (600 - all_images[this_image].offsetLeft)) + 'px';
				all_images[this_image].style.left = Math.floor(hp.mouse.x + Math.cos((this_image + step) / all_images.length * 2 * Math.PI) * this.size) + 'px';
				all_images[this_image].style.top = Math.floor(hp.mouse.y + Math.sin((this_image + step) / all_images.length * 2 * Math.PI) * this.size) + 'px';
			}
			
			step++;
			setTimeout('hp.ui.hackerlund.update(' + step + ')', 1);
		}
	},
	
	grotescopaj:
	{
		init: function()
		{
			try
			{
				document.getElementById('site_top_rounded_corners').onclick = function()
				{
					alert('Ååååå, ETT KILO MJÖÖL!!!');
					//setInterval('hp.ui.grotescopaj.draw_more_powder()', 50);
				}
			}
			catch(E){  }
		},
		
		draw_more_powder: function()
		{
			document.getElementById('quicksearch').innerHTML += '<img src="http://images.hamsterpaj.net/floor_mjoel.png" style="position: absolute; left: ' + hp.mouse.x + 'px; top: ' + hp.mouse.y + 'px" />';
		}
	},
	
	noticebar: {
		init: function()
		{
			try
			{
				hp.synchronize.add({
					handle: 'ui_noticebar_guestbook',
					on_response: function(){
						$('#ui_noticebar_guestbook').html((this.json_data > 0) ? ((this.json_data == 1) ? 'Ett nytt' : this.json_data + ' nya') : 'Gästbok');
						$('#ui_noticebar_guestbook_active').html((this.json_data > 0) ? ((this.json_data == 1) ? 'Ett nytt' : this.json_data + ' nya') : 'Gästbok');
					}
				});
				
				hp.synchronize.add({
					handle: 'ui_noticebar_discussion_forum',
					on_response: function(){
						$('#ui_noticebar_forum').html((this.json_data['new_notices'] > 0) ? ((this.json_data['new_notices'] == 1) ? 'Ny notis' : this.json_data['new_notices'] + ' nya') : 'Forum');
						$('#ui_noticebar_forum_active').html((this.json_data['new_notices'] > 0) ? ((this.json_data['new_notices'] == 1) ? 'Ny notis' : this.json_data['new_notices'] + ' nya') : 'Forum');
						$('#ui_noticebar_forum_container ul li:not(:first)').remove();
						for(var subscription = 0; subscription < this.json_data['subscriptions'].length; subscription++)
						{
							var item = this.json_data['subscriptions'][subscription];
							$('#ui_noticebar_forum_container ul li:last').after('<li><a href="' + item['url'] + '">' + item['title'] + ' (<strong>' + item['unread_posts'] + ' nya</strong>)</a></li>');
						}
					}
				});
				
				hp.synchronize.add({
					handle: 'ui_noticebar_groups',
					on_response: function(){
						$('#ui_noticebar_groups').html((this.json_data['unread_notices'] > 0) ? ((this.json_data['unread_notices'] == 1) ? 'Ett nytt' : this.json_data['unread_notices'] + ' nya') : 'Grupper');
						$('#ui_noticebar_groups_active').html((this.json_data['unread_notices'] > 0) ? ((this.json_data['unread_notices'] == 1) ? 'Ett nytt' : this.json_data['unread_notices'] + ' nya') : 'Grupper');
						$('#ui_noticebar_groups_container ul li:not(:first)').remove();
						for(var group = 0; group < this.json_data['groups'].length; group++)
						{
							var item = this.json_data['groups'][group];
							$('#ui_noticebar_groups_container ul li:last').after('<li><a href="/traffa/groups.php?action=goto&groupid=' + item['group_id'] + '">' + ((item['unread_messages'] > 0) ? '<strong>' : '') + item['title'] + ' (' + item['unread_messages'] + ' nya)' + ((item['unread_messages'] > 0) ? '</strong>' : '') + '</a></li>');
						}
					}
				});
			}catch(E){  }
		}
	},
	
	statusbar: {
		init: function() {
			$('#ui_statusbar_forumstatus').click(function() {
				var t = $(this);
				
				if ( $('span', this).length ) {
					var span = $('span', this);
					var inpt = $('<input type="text"/>');
					inpt.attr('value', $('span', this).attr('title'));
					while ( this.firstChild ) this.removeChild(this.firstChild);
					inpt.appendTo(t);
					inpt.focus();
					inpt.keydown(function(e) {
						if ( e.keyCode == 13 ) {
							hp.ui.statusbar.hideAndSend(inpt.val());
						}
					});
					$(document).bind('click.statusbar', function(e) {
						if ( inpt.get(0) == e.target || e.target == span.get(0)) return;
						hp.ui.statusbar.hideAndSend(inpt.val());
						$(document).unbind('click.statusbar');
					});
				}
			});
		},
		
		hideAndSend: function(value) {
			$.get('/ajax_gateways/set_user_status.php?status=' + encodeURIComponent(value));
			$('#ui_statusbar_forumstatus').html('<span title="' + value + '">' + (value.length > 22 ? value.substring(0, 22) + '...' : value) + '</span>');
		}
	}
}

womAdd('hp.ui.init()');