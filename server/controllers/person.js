const mongoose = require('mongoose');
const Person = mongoose.model('Person');

exports.findByCompanyId = (req, res) => {
	const companyId = req.params.companyId;
	Person.find({'companyId': companyId}, (err, results) => res.send(results));
};

exports.findByPersonId = (req, res) => {
  const { id } = req.params;
  // console.log(`personId = ${id}`);
	Person.findOne({'_id': id}, (err, result) => res.send(result));
};

exports.add = (req, res) => {
  console.log(`Add Employee record: ${JSON.stringify(req.body)}`);
	Person.create(req.body, (err, record) => err ? console.log(err) : res.send(record));
};

exports.update = (req, res) => {
	const { id } = req.params;

	Person.update({"_id":id}, req.body,
		(err, numberAffected) => {
	  	if (err) return console.log(err);
	  	else {
		  	console.log('Updated %d people', numberAffected);
		  	return res.send(202);
		  }
		});
};

exports.delete =  (req, res) => {
	const { id } = req.params;
	Person.remove({'_id':id}, result => res.send(result));
};

exports.import =  (req, res) => {
	const { companyId } = req.params;
	
	Person.create(
		{
			'name': 'John Smith',
			'companyId': companyId,
			'email': 'john@example.org'
		},
		{
			'name': 'Sally Jones',
			'companyId': companyId,
			'email': 'sally@example.org'
		},
		{
			'name': 'Mike Johnson',
			'companyId': companyId,
			'email': 'mike@example.org'
		},
		{
			'name': 'Rachel Sampson',
			'companyId': companyId,
			'email': 'rachel@example.org'
		},
		{
			'name': 'Tina Belcher',
			'companyId': companyId,
			'email': 'tina@example.org'
		},
		// callback function
		err => err ? console.log(err) : res.send(202));
};