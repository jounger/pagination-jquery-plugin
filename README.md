# pagination-jquery-plugin
New and Simple Pagination Jquery Plugin for You.
<img src="https://github.com/jounger/pagination-jquery-plugin/blob/master/preview-img.PNG" />

```
	$('#page').Pagination({ // id to initial draw and use pagination
            size: 87, // size of list input
            pageShow: 5, // 5 page-item per page
            page: 1, // current page (default)
            limit: 10, // current limit show perpage (default)
    	}, function(obj){ // callback function, you can use it to re-draw table or something
            	$('#info').html('Current page: ' + obj.page);
    	});
```
Enjoy <3
