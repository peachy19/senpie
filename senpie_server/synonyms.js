module.exports = function findSynon(companyName, degree) {
    let synon = '';
    if (degree === 'PhD') {
      synon += 'expert professor doctorate ';
    }
    if (companyName === 'Apple' || companyName === 'Intel' || companyName === 'Cisco') {
      synon += 'hardware ';
    }
    if (companyName === 'Google' || companyName === 'Facebook' || companyName === 'Amazon' || companyName === 'Microsoft') {
      synon += 'big 4 artificial intelligence ';
    }
    if (companyName === 'Uber' || companyName === 'Airbnb' || companyName === 'Hyperloop One' || companyName === 'SpaceX') {
      synon += 'breakout list ';
    }
    if (companyName === 'Snap' || companyName === 'Uber' || companyName === 'Airbnb' || companyName === 'Pinterest') {
      synon += 'unicorn ';
    }
    if (companyName === 'NASA') {
      synon += 'government ';
    }
    if (companyName === 'Slack' || companyName === 'Uber' || companyName === 'Airbnb' || companyName === 'Pinterest') {
      synon += 'startup ';
    }
    if (companyName === 'Apple') {
      synon += 'Steve Jobs ';
    }
    if (companyName === 'Tesla' || companyName === 'SpaceX') {
      synon += 'Elon Musk ';
    }
    if (companyName === 'Tesla') {
      synon += 'automobile car ';
    }
    if (companyName === 'NASA' || companyName === 'SpaceX') {
      synon += 'space universe ';
    }
    synon += 'corporate american high-paying well-known well known AI ML';

    return synon;
}
