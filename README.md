# Float Maps

Float maps is an interactive map for float trips on Missouri Streams and Rivers. The interactive map uses [mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js).

### Stream River/Tracks

The streams and river tracks were sourced from [open street maps](https://www.openstreetmap.org/about) via the [overpass api](https://wiki.openstreetmap.org/wiki/Overpass_API). The overpass quries can be found in `./scripts/rivers/overpass-quries.ts` and can be debugged using the [overpass turbo interface](https://overpass-turbo.eu/). The data from the overpass quries is transformed into geojson for the map through the `./scripts/rivers/update-rivers.ts` script.

To regenerate the river tracks, run `npm run update-rivers`.

### Access Points and Landmarks

Access points and rivers were gathered from [A Paddler's Guid to Missouri](https://www.lmvp.org/kayakswarm/PaddlersGuide/?fbclid=IwAR0jFZWOsDO0kPXoPKljyiiBzWsnPd4q4AWNH6ubkb-jhQHOvU1FeMYOVNI), an electronic rendition of the popular guide book. This project currently only contains data for a limited set of the guide book's rivers, but the most popular rivers seemed to be covered. In the future, more data points could be converted to lat-lon points using [their methodology](https://www.lmvp.org/kayakswarm/PaddlersGuide/?fbclid=IwAR0jFZWOsDO0kPXoPKljyiiBzWsnPd4q4AWNH6ubkb-jhQHOvU1FeMYOVNI).

To regenerate the river features, run `npm run update-river-features`.

### Water Levels

There are future plans to add current water levels to the map utilizing the [USGS Instanteneous Values Web Service](https://waterservices.usgs.gov/rest/). Refresh and Persistance of this data might be difficult due to this project's current lack of a data layer, but the geojson might be able to be regenerated using github actions.
