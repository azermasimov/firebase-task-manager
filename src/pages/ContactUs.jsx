import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";

function ContactUs() {
  const position = [40.432387577289965, 49.84016162614363];

  return (
    <div>
      <Map
        provider={osm}
        height={200}
        defaultCenter={position}
        defaultZoom={11}
      >
        <Marker width={50} anchor={position} />
      </Map>
    </div>
  );
}

export default ContactUs;
