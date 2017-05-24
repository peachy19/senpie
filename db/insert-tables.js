// Server decides which function to call
// module.exports = function()...
module.exports = function(knex) {
  return {
    insertUser: (name, email, type_id) => {
      console.log('Inserting into users');
      return knex.returning('id')
      .insert({name: name, email: email, user_type_id: type_id})
      .into('users');
    },
    insertUserType: (type) => {
      console.log('Inserting user type');
      return knex
      .returning('id')
      .insert({name: type}).into('user_type');
    },
    insertEducationDegree: (title) => {
      console.log('Inserting education degree');
      return knex
      .returning('id')
      .insert({name: title}).into('education_degree');
    },
    insertEducationDetail: (userId, educationDegreeId, gradYear) => {
      console.log('Inserting education detail');
      return knex
      .returning('id')
      .insert({user_id: userId, education_degree_id: educationDegreeId, grad_year: gradYear}).into('education_detail');
    },
    insertCompany: (name, type, size) => {
      console.log('Inserting company');
      return knex
      .returning('id')
      .insert({name: name, type_of_company: type, size: size}).into('company');
    },
    insertCompanyDetail: (userId, companyId, titleId) => {
      console.log('Inserting company detail');
      return knex
      .returning('id')
      .insert({user_id: userId, company_id: companyId, title_id: titleId}).into('company_detail');
    },
    insertTitle: (name) => {
      console.log('Inserting title');
      return knex
      .returning('id')
      .insert({name: name}).into('title');
    },
    insertInvitation: (senderId, receiverId, responseId) => {
      console.log('Inserting invitation');
      return knex
      .returning('id')
      .insert({sender_id: senderId, receiver_id: receiverId, response_id: responseId}).into('invitation');
    }
  };
};
