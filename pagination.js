(function ( $ ) {
 	$.fn.drawPage = function( options ) {
 		var settings = $.extend({
            from: 1,
			to: 1,
			boundary: false,
        }, options );
        return this.each(function(){
        	var $this = $(this).children('ul');
	        $this.empty();
	        var $preTag = '<li class="page-item"><a class="page-link" href="javascript:void(0)" tabindex="-1"';
			var $endTag = '</a></li>';
			if(settings.boundary == true) $this.append($preTag + 'id="page-first" data-index="0">First' + $endTag);
			$this.append($preTag + 'id="page-previous" data-index="0">Previous' + $endTag);
			var $index = 0;
			for (var i = settings.from; i <= settings.to; i++) {
				$this.append($preTag + 'data-index="'+(++$index)+'">'+ i + $endTag);
			}
			$this.append($preTag + 'id="page-next" data-index="'+(++$index)+'">Next' + $endTag);
			if(settings.boundary == true) $this.append($preTag + 'id="page-last" data-index="0">Last' + $endTag);
        });
 	}
	 $.fn.pageChanging = function( options, callback ) {
 		var settings = $.extend({
            size: 1,
            pageShow: 5,
            page: 1,
			limit: 1,
			boundary: false,
        }, options );
        return this.each(function(){
			var $parentTag = $(this);
        	$(this).children('ul').click(
				function(event) {
					var $isBoundary = settings.boundary===true?1:0;
					var $thisChildren = $(this).children('li');
					var $position = $(event.target).attr('data-index');
					var $totalPage = Math.ceil(settings.size / settings.limit);
					var $index = parseInt($($thisChildren.filter('.active').html()).attr('data-index'));
					var $firstPositon = parseInt($($thisChildren.eq(1 + $isBoundary).html()).html());
					var $lastPositon = parseInt($($thisChildren.eq($thisChildren.length - (2 + $isBoundary)).html()).html());
					var $active = $($thisChildren.filter('.active').html()).html();
					var $page = isNaN($active)?1:parseInt($active);
					var $drawMain = false;
					var $currentPage = $(event.target).html().toLowerCase();
					switch ($currentPage) {
					case 'first':
						if ($page > 1) {
							$page = 1;
							$drawMain = true;
							$position = 1;
						} else {
							return true;
						}
						break;
					case 'last':
						if (settings.page * settings.limit < $totalPage) {
							$page = $totalPage;
							$drawMain = true;
							$position = settings.pageShow;
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
					var _from = 1, _to = settings.pageShow;
					if($currentPage === 'first') {
						_from = 1;
						_to = $totalPage>settings.pageShow?settings.pageShow:$totalPage;
					} else if($currentPage === 'last') {
						_from = $totalPage - settings.pageShow + 1;
						_to = $totalPage;
					} else if ($position >= settings.pageShow && $lastPositon < $totalPage) {
						_from = $lastPositon - (settings.pageShow - 2);
						_to = $lastPositon + 1;
						$position = settings.pageShow - 1;
					} else if ($position <= 1 && $firstPositon > 1) {
						_from = $firstPositon - 1;
						_to = $firstPositon + (settings.pageShow - 2);
						$position = 2;
					} else {
						_from = $firstPositon;
						_to = $lastPositon;
					}
					if($drawMain && $.isFunction(callback) && ($(event.target).html() !== $active)) {
						callback.call(this, {size: settings.size, page : $page, limit: settings.limit});
						$parentTag.drawPage({
							from: _from,
							to: _to,
							boundary: settings.boundary,
						});
					}
					if($position > 0 && $position < ($totalPage>settings.pageShow?(settings.pageShow+1):$totalPage+1) && $totalPage > 1) {
						$parentTag.find('ul > li').eq(parseInt($position)+$isBoundary).addClass('active').siblings().removeClass('active');
					}
			});
        });
 	}
    $.fn.Pagination = function( options, callback ) {
        var settings = $.extend({
            size: 1,
            pageShow: 5,
            page: 1,
			limit: 10,
			boundary : false,
        }, options );
		if(settings.pageShow < 3) settings.pageShow = 3;
        return this.each( function() {
			// first time initial page
            var $totalPage = Math.ceil(settings.size / settings.limit);
        	var $toFirstTime = $totalPage>settings.pageShow?settings.pageShow:$totalPage;
        	$(this).empty();
        	$(this).append('<ul class="pagination"></ul>');
        	$(this).drawPage({
        		from: 1,
				to: $toFirstTime,
				boundary: settings.boundary,
        	});
			$(this).find('ul > li').eq(settings.boundary===true?2:1).addClass('active');
			callback.call(this, {page : 1});
            $(this).pageChanging({
	            size: settings.size,
	            pageShow: settings.pageShow,
	            page: settings.page,
				limit: settings.limit,
				boundary : settings.boundary
        	}, callback);
        });
 
    };
}( jQuery ));
