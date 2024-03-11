import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ location, amenitiesData }) => {
  const api = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  const containerStyle = {
    width: "100%",
    height: "500px",
    border: "groove",
  };
  const locationMarkerIcon = {
    url: "/homemarker.png",
    // url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Blue marker icon
    scaledSize: { width: 40, height: 40 }, // Size of the marker
  };
  const [selected, setSelected] =  useState("")
  // console.log(selected)
  return (
    <LoadScript googleMapsApiKey={api}>
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
        <Marker key="" icon={locationMarkerIcon} position={location} />

        {amenitiesData?.map((amenity, index) => {
          return (
            <div key={index}>
              <Marker
                key={index}
                onClick={()=>{
                  setSelected(amenity)
                }}
                position={{ lat: amenity.lat, lng: amenity.lng }}
              />
            </div>
          );
        })}
        {selected && (
          <InfoWindow
          options={{
            pixelOffset: new window.google.maps.Size(0, -40)
          }}
            position={{
              lat: selected.lat,
              lng: selected.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="w-40">
              <div className="font-medium">{selected.name}</div>
              <div className="">{selected.address}</div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
