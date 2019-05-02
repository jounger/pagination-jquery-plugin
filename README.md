# pagination-jquery-plugin
New and Simple Pagination Jquery Plugin for You.
<div>
<img src="https://github.com/jounger/pagination-jquery-plugin/blob/master/preview.PNG" />

<h2>How to use?</h2>

```
	$('#page').Pagination({ // id to initial draw and use pagination
            size: 87, // total size of list input (required)
            pageShow: 5, // 5 page-item per page | min is 3 (required)
            page: 1, // current page (default)
            limit: 10, // current limit record show on table per page (default)
	    boundary: false, // to show first and last label (optional)
    	}, function(obj){ // callback function, you can use it to re-draw table or something
            	$('#info').html('Current page: ' + obj.page);
    	});
```

</div>
<p>Enjoy <3 </p>
