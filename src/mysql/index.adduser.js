var connection = require('./mysql.config');


function addUserName(data, res) {
	connection.connect();

	var query = connection.query('INSERT INTO user_info SET ?', data, function(error, results, fields) {
		if (error) {
			console.log(error);
			res.json({
				success: false,
				msg: '插入失败'
			})
		}
		res.json({
			success: true,
			msg: '插入成功'
		})
	});

	connection.end();
}

module.exports = addUserName;