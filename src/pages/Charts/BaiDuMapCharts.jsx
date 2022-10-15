import React from "react";
import {
  Map,
  NavigationControl,
  CityListControl,
  MapTypeControl,
  MapApiLoaderHOC,
} from "react-bmapgl";

function BaiDuMapCharts() {
  return (
    <Map
      style={{ width: "100%", height: "100%" }}
      center={{ lng: 116.402544, lat: 39.928216 }}
      zoom="11"
      enableScrollWheelZoom={true}
    >
      <NavigationControl />
      <CityListControl />
      <MapTypeControl />
    </Map>
  );
}

export default MapApiLoaderHOC({ ak: "Eq2u5suhmEu9CKLay9fL5vCPVCLa6x1Q" })(
  BaiDuMapCharts
);
