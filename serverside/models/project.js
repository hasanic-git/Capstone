const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
  contactName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  address: { type: addressSchema, required: true },
  projectTitle: { type: String, required: true },
  projectDescription: { type: String, required: true },
  technicalSkill: { type: String, required: true },
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Project', projectSchema,'Projects');
//note capital S in the collection name