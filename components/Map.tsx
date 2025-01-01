import { SearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect } from "react";
import { LayersControl, MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-geosearch/dist/geosearch.umd.js";
const { BaseLayer } = LayersControl;

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

function LeafletgeoSearch() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const provider = new OpenStreetMapProvider();

    const searchControl = new (SearchControl as any)({
      provider,
      style: "bar",
      showMarker: true,
      autoClose: true,
      marker: {
        icon
      },
    });
    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
}

export default function Map() {
  return (
    <div className="">
      <div className="">
        <MapContainer
          center={{ lat: 51.505, lng: -0.09 }}
          zoom={20}
          style={{ height: "100vh" }}
        >
          <LeafletgeoSearch />
          <LayersControl>
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
              />
            </BaseLayer>
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
}
