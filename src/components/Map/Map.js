import React, {Component} from 'react';

class Map extends Component {
  constructor () {
    super();
  }

  componentDidMount () {
    const map = new google.maps.Map(this.refs.map, {zoom: 11});

    var points = [
      {lat: 49.23232, lng: -123.1003, label: 'a', data: {name:'john', age:33, city:'vancouver'}},
      {lat: 49.27232, lng: -123.1193, label: 'b'}
    ];

    const infoWindow = new google.maps.InfoWindow({
      content: ''
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Your location');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        infoWindow.setPosition(map.getCenter());
        infoWindow.setContent(true ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      });
    }

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
        infoWindow.setContent('<div style="color:red">this is a point ' + '<b>'+ this.label + '</b>'+ '</br>Name:'+this.data.name+'</div>');
        infoWindow.open(map, this);
      });
    });

    map.setCenter(points[0]);
  }

  render() {
    const divStyle = {
      width: '100%',
      height: '800px',
      backgroundColor: 'red'
    }
      return <div id="map" ref="map" style={ divStyle}></div>
    }
}

export default Map;