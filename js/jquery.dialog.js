/* 
	TODO: can be dragged, DOM-Drag
*/

;(function($) {

// if already load dialog, return directly
if ($.dialog) {
	return;
}

var $window = $(window), $document = $(document);
var ieBug = $.browser.msie && parseFloat($.browser.version) < 7;

// jQuery doesn't support a is string judgement, so I made it by myself.
function isString(obj) {
	return typeof obj == "string" || Object.prototype.toString.call(obj) === "[object String]";
}

// dialog list to manage the dialogs.
var dialogList = [];
dialogList.add = function($dialog) {
	this.push($dialog);
	return $dialog;
};

dialogList.remove = function($dialog) {
	var flag;
	for (var i = 0; i < this.length; i++) {
		if (this[i] == $dialog) {
			flag = true;
		}
		if (flag) {
			this[i] = this[i + 1];
		}
	}

	if (flag) {
		this.length--;
	}

	return $dialog;
};

// manage the window resize event.
var resizeTimer;
$window.resize(function() {
	window.clearTimeout(resizeTimer);
	resizeTimer = window.setTimeout(function() {
		for (var i = 0; i < dialogList.length; i++) {
			dialogList[i].adjust(false);
		}
	}, 100);
});

// manage the window scroll event for ie6.
if (ieBug) {
var scrollTimer;
$window.scroll(function () {
	for (var i = 0; i < dialogList.length; i++) {
		dialogList[i].ieFixedHide();
	}

	window.clearTimeout(scrollTimer);
	scrollTimer = window.setTimeout(function() {
		for (var i = 0; i < dialogList.length; i++) {
			dialogList[i].ieFixedPos();
		}
	}, 400);
});
}

// handle escape key to close dialog one by one.
$document.keydown(function(event) {
	if (dialogList.length && event.keyCode == 27) {
		dialogList[dialogList.length - 1].close("cancel", event);
	}
});

// the basic dialog plugin
$.dialog = function(settings) {
	var initializing = true;
	var defaults = {
		id: "",
		className: "",
		tip: false,
		direction: "up",
		title: "",
		content: "",
		labClose: null,
		titleClose: "Close",
		btns: [],
		defaultBtn: "",
		labAccept: "Accpet",
		labCancel: "Cancel",
		top: null,
		left: null,
		refer: null,
		fixed: true,
		scrollIntoView: true,
		contentWidth: null,
		contentHeight: null,
		contentBtnHelp: false,
		modal: true,
		onLoad: null,
		onBeforeAccept: null,
		onAccept: null,
		onBeforeCancel: null,
		onCancel: null,
		onBeforeClose: null,
		onClose: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// build button html template.
	var mapBtns = {
		"accept": '<button class="dialog-button-accept">' + opts.labAccept + '</button>',
		"cancel": '<button class="dialog-button-cancel">' + opts.labCancel + '</button>'
	};
	var templateBtns = "";
	if (opts.btns.length) {
		templateBtns += '<div class="dialog-button-container">';
		for (var i = 0 ; i < opts.btns.length; i++) {
			templateBtns += mapBtns[opts.btns[i]];
		}
		templateBtns += '</div>';
	}

	// build mask html template.
	var templateMask =
		'<div' + (opts.id ? (' id="' + opts.id + '-mask"') : '') + ' class="jquery-dialog-mask ' +
				(!$("div.jquery-dialog-mask").length ? "jquery-dialog-mask-color" : "jquery-dialog-mask-transparent") +
				(opts.className ? (' ' + opts.className + '-mask"') : '"') + '></div>';

	// build dialog html template.
	var templateDialog =
		'<div style="top: -10000px; left: -10000px;"' + (opts.id ? (' id="' + opts.id + '"') : '') + ' class="jquery-dialog ' +
				(!opts.fixed || ieBug ? 'dialog-outer-absolute' : 'dialog-outer-fixed') +
				(opts.tip ? ' jquery-tip' : '') + (opts.className ? (' ' + opts.className + '"') : '"') + '>' +
			(opts.tip ? '<div class="dialog-tip-arrow dialog-tip-arrow-' + opts.direction.toLowerCase() + '"></div>' : '') +
			'<div class="dialog-top-container">' +
				'<div class="dialog-top-left-corner"></div>' +
				'<div class="dialog-top-border"></div>' +
				'<div class="dialog-top-right-corner"></div>' +
			'</div>' +

			'<div class="dialog-middle-container">' +
				'<div class="dialog-left-border"></div>' +

				'<div class="dialog-inner-container">' +
					'<div class="dialog-title-container">' +
						'<div class="dialog-title">' + opts.title + '</div>' +
						'<div tabindex="0" class="dialog-button-close" title="' + opts.titleClose + '">' +
							(opts.labClose || '') +
						'</div>' +
					'</div>' +

					'<div class="dialog-content-container"></div>' + templateBtns +
				'</div>' +

				'<div class="dialog-right-border"></div>' +
			'</div>' +

			'<div class="dialog-bottom-container">' +
				'<div class="dialog-bottom-left-corner"></div>' +
				'<div class="dialog-bottom-border"></div>' +
				'<div class="dialog-bottom-right-corner"></div>' +
			'</div>' +
		'</div>';

	// append mask and dialog into document.
	var $body = $(document.body);
	var $dialog = dialogList.add($(templateDialog));
	$dialog.data("jquery-dialog", $dialog);
	if (opts.modal) {
		$dialog.data("mask", $(templateMask).appendTo($body));
	}

	// set dom content into dialog
	var isNode = opts.content && !isString(opts.content) && (opts.content.parentNode || opts.content.jquery);
	if (isNode) {
		var $node = $(opts.content);
		var data = {
			el: $node[0],
			html: $node.html(),
			parent: $node.parent()[0],
			display: $node.css("display"),
			position: $node.css("position")
		};
		if (data.parent) {
			$node.remove();
		}

		$dialog.data("dialog.history", data);
	}

	$("div.dialog-content-container", $dialog).append(isNode ? $(opts.content).eq(0) : opts.content.toString());
	$dialog.appendTo($body);
	if (isNode) {
		$(opts.content).show();
	}

	// this method can remove dialog without any callback.
	$dialog.destroy = function() {
		// remove mask from dom
		dialogList.remove(this);
		if (opts.modal) {
			this.data("mask").removeShadow().remove();
		}

		// restore content node.
		var data = this.data("dialog.history");
		if (data && data.el) {
			var $node = $(data.el).css({"display": data.display, "position": data.position});
			if (data.parent) {
				$node.html(data.html).appendTo(data.parent);
			}
			this.removeData("dialog.history");
		}

		// remove dialog from dom.
		this.remove();
	};

	// add dialog close method.
	$dialog.close = function(state, event) {
		event = $.extend(event, {"state": state});
		if ($.isFunction(opts.onBeforeClose) && opts.onBeforeClose.call($dialog, event) === false) {
			return false;
		}

		// call destroy method
		this.destroy();

		if ($.isFunction(opts.onClose)) {
			opts.onClose(event);
		}

		if (state == "accept") {
			if ($.isFunction(opts.onAccept)) {
				opts.onAccept(event);
			}
		}
		else if (state == "cancel") {
			if ($.isFunction(opts.onCancel)) {
				opts.onCancel(event);
			}
		}

		return true;
	};

	// add adjust dialog size method.
	$dialog.adjust = function() {
		// adjust mask size
		var $mask = this.data("mask");
		if ($mask) {
			if (ieBug) {
				$mask.css("position", "absolute")
				.height(Math.max($body.boxHeight(), $window.height()))
				.width(Math.max($body.boxWidth(), $window.width()))
				.iShadow({position: "absolute", referPoint: "topleft"});
			}
			else {
				$mask
				.iShadow({position: "fixed", referPoint: "topleft"});
			}
		}

		if ((typeof arguments[0] == "undefined") || initializing) {
			var $contentContainer = $("div.dialog-content-container", this);

			if (!initializing) {
				$contentContainer.css({height: "auto"});
			}
			var $leftBorder = $("div.dialog-left-border", this);
			var $rightBorder = $("div.dialog-right-border", this);
			var $topBorder = $("div.dialog-top-border", this);
			var $bottomBorder = $("div.dialog-bottom-border", this);

			var $topLeftCorner = $("div.dialog-top-left-corner", this);
			var $topRightCorner = $("div.dialog-top-right-corner", this);
			var $bottomLeftCorner = $("div.dialog-bottom-left-corner", this);
			var $bottomRightCorner = $("div.dialog-bottom-right-corner", this);

			var $topContainer = $("div.dialog-top-container", this);
			var $midderContainer = $("div.dialog-middle-container", this);
			var $bottomContainer = $("div.dialog-bottom-container", this);

			var $innerContainer = $("div.dialog-inner-container", this);
			var $titleContainer = $("div.dialog-title-container", this);
			var $title = $("div.dialog-title", this);
			var $buttonClose = $("div.dialog-button-close", this);
			var $buttonContainer = $("div.dialog-button-container", this);

			// give the content a width or height define.
			var contentWidth = Math.max((parseInt(opts.contentWidth) ||
					Math.min($contentContainer.boxWidth(), $window.width() - $.scrollbarWidth())), opts.btns.length * 150);
			$contentContainer.boxWidth(contentWidth);
			var contentHeight = (parseInt(opts.contentHeight) || $contentContainer.boxHeight());
			$contentContainer.boxHeight(contentHeight);
			// translate buttons inside content to iButton default style.
			if (opts.contentBtnHelp && $.fn.iButton) {
				$("input[type='button'], button", $contentContainer).iButton();
			}

			// set the title-container and button-container are sync with content width
			var contentBoxWidth = $contentContainer.boxWidth();
			$titleContainer.boxWidth(contentBoxWidth);
			$buttonContainer.boxWidth(contentBoxWidth);

			// adjust title and button layout.
			$title.boxWidth($titleContainer.width() - $buttonClose.boxWidth());
			if (initializing && $.fn.iButton) {
				$("input[type='button'], button", $buttonContainer).iButton();
			}

			// set the top-border and bottom-border width.
			var innerContainerBoxWidth = contentBoxWidth + $innerContainer.box("lr");
			$innerContainer.boxWidth(innerContainerBoxWidth);
			$topBorder.boxWidth(innerContainerBoxWidth);
			$bottomBorder.boxWidth(innerContainerBoxWidth);

			// set the left-border and right-border height.
			var innerContainerBoxHeight = $innerContainer.box("tb") + $contentContainer.boxHeight() +
						$titleContainer.boxHeight() + $buttonContainer.boxHeight();
			$leftBorder.boxHeight(innerContainerBoxHeight);
			$rightBorder.boxHeight(innerContainerBoxHeight);

			// give the top-c, middle-c and bottom-c a fixed width and height.
			$topContainer.width($topLeftCorner.boxWidth() + $topBorder.boxWidth() + $topRightCorner.boxWidth());
			$bottomContainer.width($bottomLeftCorner.boxWidth() + $bottomBorder.boxWidth() + $bottomRightCorner.boxWidth());
			$midderContainer
				.height(innerContainerBoxHeight)
				.width($leftBorder.boxWidth() + $innerContainer.boxWidth() + $rightBorder.boxWidth());

			// give the dialog a fixed width
			this.width($topContainer.boxWidth());
		}


		// calculate the center top and center left position
		if (initializing || opts.fixed) {
			var centerTop  = Math.round(($window.height() - this.boxHeight()) / 2),
				centerLeft = Math.round(($window.width()  - this.boxWidth())  / 2);
		}
		// calculate ie6 fixed position.
		var top = null, left = null;
		if (ieBug && opts.fixed) {
			top  = $window.scrollTop()  + (parseInt(opts.top)  || centerTop );
			left = $window.scrollLeft() + (parseInt(opts.left) || centerLeft);
		}
		// for unfixed refer position.
		else if (!opts.fixed && opts.refer) {
			var offset = $(opts.refer).offset();
			top  = offset.top  + (parseInt(opts.top)  || 0);
			left = offset.left + (parseInt(opts.left) || 0);
		}
		// for initialized unfixed dialog and always for fixed dialog
		else if (initializing || opts.fixed) {
			if (!opts.fixed) {
				centerTop  = $window.scrollTop()  + centerTop;
				centerLeft = $window.scrollLeft() + centerLeft;
			}
			top = (parseInt(opts.top) || centerTop);
			left = (parseInt(opts.left) || centerLeft);
		}
		if (top !== null) {
			this.css({"top": top + "px", "left": left + "px"});
		}

		// scroll into view control.
		if (initializing && !opts.fixed && opts.scrollIntoView) {
			this.scrollIntoView();
		}
		// give default button focus
		if (initializing) {
			if (opts.defaultBtn == "accept") {
				$(".dialog-button-accept", $buttonContainer).eq(0).focus();
			}
			else if (opts.defaultBtn == "cancel") {
				$(".dialog-button-cancel", $buttonContainer).eq(0).focus();
			}
		}

		return this;
	};

	$dialog.scrollIntoView = function() {
		var pos = this.position(), scrollTop = $window.scrollTop(), scrollLeft =  $window.scrollLeft();

		if (((pos.top < scrollTop) || (pos.top > $window.height() + scrollTop)) ||
			((pos.left < scrollLeft) || (pos.left > $window.width() + scrollLeft))) {
			this[0].scrollIntoView();
		}
	};

	// ie fixed top method
	$dialog.ieFixedPos = function() {
		if (ieBug && opts.fixed) {
			var top = (parseInt(opts.top) || Math.round(($window.height() - this.boxHeight()) / 2));
			var left = (parseInt(opts.left) || Math.round(($window.width() - this.boxWidth()) / 2));
			this.css({"top": top + $window.scrollTop() + "px",
					  "left": left + $window.scrollLeft() + "px"});
		}

		return this;
	};

	// ie fixed hide method
	$dialog.ieFixedHide = function() {
		if (ieBug && opts.fixed) {
			this.css({"top": "-10000px", "left": "-10000px"});
		}

		return this;
	}

	/*
	 init position and size for dialog.
	*/
	$dialog.adjust(false);

	/*
	 add event handlers for dialog.
	*/
	$dialog
	.mouseover(function(event) {
		var $target = $(event.target);
		var fromElement = event.fromElement || event.relatedTarget;

		if ($target.is("div.dialog-button-close")) {
			$target.addClass("dialog-button-close-hover");
		}
	})
	.mouseout(function(event) {
		var $target = $(event.target);
		var toElement = event.toElement || event.relatedTarget;

		if ($target.is("div.dialog-button-close")) {
			$target.removeClass("dialog-button-close-hover");
		}
	})
	.click(function(event) {
		var $target = $(event.target),
			$btnAccept = $target.closest(".dialog-button-accept"),
			$btnCancel = $target.closest(".dialog-button-cancel");
		if ($btnAccept.length && $btnAccept.attr("data-disabled") != "true") {
			if ($.isFunction(opts.onBeforeAccept) &&
				opts.onBeforeAccept.call($dialog, $.extend(event, {"state": "accept"})) === false) {
				return;
			}

			$dialog.trigger("accept");
		}
		else if ($btnCancel.length && $btnCancel.attr("data-disabled") != "true") {
			if ($.isFunction(opts.onBeforeCancel) &&
				opts.onBeforeCancel.call($dialog, $.extend(event, {"state": "cancel"})) === false) {
				return;
			}

			$dialog.trigger("cancel");
		}
		else if ($target.is("div.dialog-button-close")) {
			$dialog.close("cancel");
		}
	})
	.bind("accept", function() {
		$dialog.close("accept");
	})
	.bind("cancel", function() {
		$dialog.close("cancel");
	});


	if ($.isFunction(opts.onLoad)) {
		opts.onLoad.call($dialog);
	}
	initializing = false;
	return $dialog;
};


/* the jquery inform dialog */
$.inform = function(settings) {
	var defaults = {
		icon: "",
		title: "",
		content: "",
		delay: 2000,
		easyClose: true,
		onClose: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// for icon class define.
	var content = $.isPlainObject(settings) ? opts.content : settings;
	if (opts.icon) {
		content = '<div class="' + opts.icon + '"></div><div class="dialog-content">' + content + '</div>';
	}

	var $dialog = $.dialog({
		className: "jquery-inform",
		title: opts.title,
		content: content,
		onClose: opts.onClose
	});

	// bind close handler.
	var timer;
	if (opts.delay > 0) {
		timer = window.setTimeout(close, opts.delay);
	}
	if (opts.easyClose) {
		$document.bind("mouseup", close);
	}

	// close by timeout or click event.
	function close() {
		try{ $dialog.close(); }catch(e){};
		window.clearTimeout(timer);
		if (opts.easyClose) {
			$document.unbind("mouseup", close);
		}
	};

	return $dialog;
};


/* the jquery confirm dialog */
$.alert = function(settings) {
	var defaults = {
		icon: "",
		title: "",
		content: "",
		labClose: "Confirm",
		onClose: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// for icon class define.
	var content = $.isPlainObject(settings) ? opts.content : settings;
	if (opts.icon) {
		content = '<div class="' + opts.icon + '"></div><div class="dialog-content">' + content + '</div>';
	}

	return $.dialog({
		className: "jquery-alert",
		btns: ["accept"],
		defaultBtn: "accept",
		labAccept: opts.labClose,
		title: opts.title,
		content: content,
		onClose: opts.onClose
	});
};

/* the jquery confirm dialog */
$.confirm = function(settings) {
	var defaults = {
		icon: "",
		title: "",
		content: "",
		labConfirm: "Confirm",
		labCancel: "Cancel",
		defaultBtn: "accept",
		onConfirm: null,
		onCancel: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// for icon class define.
	var content = $.isPlainObject(settings) ? opts.content : settings;
	if (opts.icon) {
		content = '<div class="' + opts.icon + '"></div><div class="dialog-content">' + content + '</div>';
	}

	return $.dialog({
		className: "jquery-confirm",
		btns: ["accept", "cancel"],
		defaultBtn: opts.defaultBtn,
		labAccept: opts.labConfirm,
		labCancel: opts.labCancel,
		title: opts.title,
		content: content,
		onAccept: opts.onConfirm,
		onCancel: opts.onCancel
	});
};

})(jQuery);
