const mongoose = require('mongoose');
const Company = mongoose.model('Company');

exports.findAll = (req, res) => {
	Company.find({}, (err, results) => res.send(results));
};

exports.findById = (req, res) => {
	const { id } = req.params;
	Company.findOne({'_id': id}, (err, result) => {
		res.send(result);
	});
};

exports.add = (req, res) => {
	Company.create(req.body, (err, company) => 
		err ? console.log(err) : res.send(company));
};

exports.update = function(req, res) {
	const { id } = req.params;

	Company.update({'_id': id}, req.body, (err, numberAffected) => {
		if (err) return console.log(err);
		console.log('updated %d companies', numberAffected);

		return res.send(202);
	});
};

exports.import = (req, res) => {
	Company.create(
		{'name': 'Xerox', 'address': '123 Main St, Rochester NY 12345', 'revenue': 10000, 'phone': '585-555-1234' },
		{'name': 'Kodak', 'address': '456 South St, Rochester NY 12345', 'revenue': 20000, 'phone': '585-555-5678' },
		{'name': 'Amazon', 'address': '345 Boren Ave N, Seattle, WA 98109', 'revenue': 999999, 'phone': '415-555-0123' },
		{'name': 'Google', 'address': '1 Moneybags Blvd, Mountain View, CA 90210', 'revenue': 88888, 'phone': '415-555-8888' },
		err => err ? console.log(err) : res.send(202));
}