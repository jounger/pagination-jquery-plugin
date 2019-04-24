(function ( $ ) {
 	$.fn.drawPage = function( options ) {
 		var settings = $.extend({
            from: 1,
            to: 1,
        }, options );
        return this.each(function(){
        	var $this = $(this).children('ul');
	        $this.empty();
	        var $preTag = '<li class="page-item"><a class="page-link" href="javascript:void(0)" tabindex="-1"';
	        var $endTag = '</a></li>';
			$this.append($preTag + 'id="page-prev" data-index="0">Previous' + $endTag);
			var $index = 0;
			for (var i = settings.from; i <= settings.to; i++) {
				$this.append($preTag + 'data-index="'+(++$index)+'">'+ i + $endTag);
			}
			$this.append($preTag + 'id="page-next" data-index="'+(++$index)+'">Next' + $endTag);
        });
 	}
	 $.fn.pageChanging = function( options, callback ) {
 		var settings = $.extend({
            size: 1,
            pageShow: 5,
            page: 1,
            limit: 1,
            callback: function() {},
        }, options );
        return this.each(function(){
        	var $parentTag = $(this);
        	$(this).children('ul').click(
				function(event) {
					var $thisChildren = $(this).children('li');
					var $position = $(event.target).attr('data-index');
					var $totalPage = Math.ceil(settings.size / settings.limit);
					var $index = parseInt($($thisChildren.filter('.active').html()).attr('data-index'));
					var $firstPositon = parseInt($($thisChildren.eq(1).html()).html());
					var $lastPositon = parseInt($($thisChildren.eq($thisChildren.length - 2).html()).html());
					var $page = parseInt($($thisChildren.filter('.active').html()).html());
					var $drawMain = false;
					switch ($(event.target).html().toLowerCase()) {
					case 'first':
						if ($page > 1) {
							$page = 1;
							$drawMain = true;
						} else {
							return true;
						}
						break;
					case 'last':
						if ($page * $limit < $totalPage) {
							$page = $totalPage;
							$drawMain = true;
						} else {
							return true;
						}
						break;
					case 'previous':
						if ($page > 1) {
							$page = $page - 1;
							$drawMain = true;
							$position = parseInt($index) - 1;
						} else {
							return true;
						}
						break;
					case 'next':
						if ($page < $totalPage) {
							$page = $page + 1;
							$drawMain = true;
							$position = parseInt($index) + 1;
						} else {
							return true;
						}
						break;
					default:
						$page = parseInt($(event.target).html());
						if ($position >= 1 && $position <= $totalPage) {
							$drawMain = true;
						} else {
							return true;
						}
					}
					if($drawMain && $.isFunction(settings.callback)) {
						settings.callback.call(this, {page : $page});
					}
					if ($position >= 5 && $lastPositon < $totalPage) {
						$parentTag.drawPage({
							from: $lastPositon - 3,
							to: $lastPositon + 1,
						});
						$position = 4;
					}
					if ($position <= 1 && $firstPositon > 1) {
						$parentTag.drawPage({
							from: $firstPositon - 1,
							to: $firstPositon + 3,
						});
						$position = 2;
					}
					if($position > 0 && $position < ($totalPage>5?6:$totalPage+1) && $totalPage > 1) {
						$parentTag.find('ul > li').eq($position).addClass('active').siblings().removeClass('active');
					}	
			});
        });
 	}
    $.fn.Pagination = function( options, callback ) {
        var settings = $.extend({
            size: 1,
            pageShow: 5,
            page: 1,
            limit: 1,
        }, options );
 
        return this.each( function() {
            var $totalPage = Math.ceil(settings.size / settings.limit);
        	var $toFirstTime = $totalPage>settings.pageShow?settings.pageShow:$totalPage;
        	$(this).drawPage({
        		from: 1,
        		to: $toFirstTime,
        	});
        	$(this).children('ul').children('li').eq(settings.from).addClass('active').siblings().removeClass('active');
            $(this).pageChanging({
	            size: settings.size,
	            pageShow: settings.pageShow,
	            page: settings.page,
	            limit: settings.limit,
        		callback: callback,
        	});
        });
 
    };
}( jQuery ));
