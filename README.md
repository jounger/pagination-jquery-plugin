# pagination-jquery-plugin
New and Simple Pagination Jquery Plugin for You.
<div>
<img src="https://github.com/jounger/pagination-jquery-plugin/blob/master/preview-img.PNG" />

```
	$('#page').Pagination({ // id to initial draw and use pagination
            size: 87, // total size of list input (required)
            pageShow: 5, // 5 page-item per page | min is 3 (required)
            page: 1, // current page (default)
            limit: 10, // current limit record show on table per page (default)
    	}, function(obj){ // callback function, you can use it to re-draw table or something
            	$('#info').html('Current page: ' + obj.page);
    	});
```

</div>
<p>Enjoy <3 </p>
