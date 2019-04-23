# pagination-jquery-plugin
New and Simple Pagination Jquery Plugin for You.

```
	$('#page').Pagination({ // id to initial draw and use pagination
            size: 87, // size of list input
            pageShow: 5, // 5 choice per page
            page: 1, // current page (default)
            limit: 10, // current limit (default)
            from: 1, // (option)
            to: 5, (option)
    	}, function(obj){ // callback function, you can use it to re-draw table or something
            	$('#info').html('Current page: ' + obj.page);
    	});
```
Enjoy <3
