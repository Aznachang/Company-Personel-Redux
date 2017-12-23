var mongoose = require('mongoose');

Schema = mongoose.Schema;
/**
 * @swagger
 * definition:
 *   Person:
 *     properties:
 *       name:
 *         type: string
 *       companyId:
 *         type: string
 *       email:
 *         type: string
 * 			 companyName:
 * 			 	 type: string
 */
var PersonSchema = new Schema({
	name: String,
	companyId: String,
	email: String,
	companyName: String
});

mongoose.model('Person', PersonSchema);