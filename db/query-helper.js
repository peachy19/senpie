module.exports = function(knex) {
  return {
    getUser: (id) => {
      console.log('Getting user with id', id);
      return knex.select('users.name as user_name', 'users.id','grad_year', 'company.type_of_company',
      'company.name as company_name', 'title.name as job_title', 'skill.languages', 'users.description', 'location.latitude as latitude', 'location.longitude as longitude')
      .from('users')
      .join('user_type', 'user_type.id', '=', 'users.user_type_id')
      .join('skill', 'skill.user_id', '=', 'users.id')
      .join('education_detail', 'education_detail.user_id', '=', 'users.id')
      .join('education_degree', 'education_degree.id', '=','education_detail.education_degree_id')
      .join('company_detail', 'company_detail.user_id', '=', 'users.id')
      .join('company', 'company.id', '=', 'company_detail.company_id')
      .join('title', 'title.id', '=', 'company_detail.title_id')
      .join('location', 'location.user_id', '=', 'users.id')
      .where('users.id', '=', id);
    },
    getDegreeName: (id) => {
      console.log('Getting degree\'s name with user id', id);
      return knex.select('education_degree.name')
      .from('education_degree')
      .join('education_detail', 'education_detail.education_degree_id', '=', 'education_degree.id')
      .join('users', 'users.id', '=', 'education_detail.user_id')
      .where('users.id', '=', id)
    },
    getCompanyName: (id) => {
      console.log('Getting company\'s name with user id', id);
      return knex.select('company.name')
      .from('company')
      .join('company_detail', 'company_detail.company_id', '=', 'company.id')
      .join('users', 'users.id', '=', 'company_detail.user_id')
      .where('users.id', '=', id)
    },
    getFullName: (id) => {
      console.log('Getting full name for user', id);
      return knex.select('users.name')
      .from('users')
      .where('users.id', '=', id)
    },
  };
};
