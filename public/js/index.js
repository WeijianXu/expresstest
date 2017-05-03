$(function() {
	$('#btn-submit').on('click', function(event) {

		$.ajax({
				url: '/receive/adduser',
				type: 'get',
				dataType: 'json',
				data: serializeFormToObj($(this).parents('form')),
			})
			.done(function(data) {
				if (data.success) {
					alert(data.msg);
				} else {
					alert(data.msg);
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});

	});

	function serializeFormToObj(form) {
		var d = $(form).serializeArray(),
			o = {};
		for (var i = 0; i < d.length; i++) {
			var name = d[i].name,
				val = $.trim(d[i].value);
			o[name] = val;
		}
		return o;
	}
});