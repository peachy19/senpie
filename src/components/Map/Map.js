import React, {Component} from 'react';

class Map extends Component {
  constructor () {
    super();
  }

  componentDidMount () {
    const map = new google.maps.Map(this.refs.map, {zoom: 11});

    const infoWindow = new google.maps.InfoWindow({ content: ''});

    let points = [];
    let userLocation = {};
    const mentors = this.props.mentors;

    console.log('1. DOM loaded');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        console.log('2.Received userLocation ', userLocation);
        // var homeMarker = new google.maps.Marker ({
        //   position: userLocation,
        //   map:
        // })
        infoWindow.setPosition(userLocation);
        infoWindow.setContent('Your location');
        infoWindow.open(map);
        map.setCenter(userLocation);

        mentors.map((mentor) => {
          console.log('3.getMentors, userLocation ', userLocation);
          const p1 = new google.maps.LatLng(Number(mentor[0].latitude), Number(mentor[0].longitude));
          console.log("p2", userLocation);
          const p2 = new google.maps.LatLng(userLocation.lat, userLocation.lng);

          const dist = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
          console.log("Distance", dist);
          const loc = {
            lat: Number(mentor[0].latitude), lng: Number(mentor[0].longitude), data: {name: mentor[0].user_name, job_title: mentor[0].job_title, distance: dist}
          }
          points.push(loc);
        });

      console.log('Points are', points);

        points.map(function(p){

        var marker = new google.maps.Marker({
          position: p,
          label: p.label,
          animation: google.maps.Animation.DROP,
          map: map,
          data: p.data
        });

        google.maps.event.addListener(marker, 'click', function() {
          //this has the point and its a marker
          infoWindow.setContent('<div style="color: #49727D">'+this.data.name+'<br>'+this.data.job_title+'<br>Distance: '+this.data.distance+'</div>');
          infoWindow.open(map, this);
        });
      });

    map.setCenter(points[0]);

      }, function() {
        infoWindow.setPosition(map.getCenter());
        infoWindow.setContent(true ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      });

    }
  }

  render() {
    const divStyle = {
      width: '100%',
      height: '800px',
      backgroundColor: '#49727D'
    }
      return <div id="map" ref="map" style={ divStyle}></div>
    }
}

export default Map;