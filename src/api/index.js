import axios from 'axios';

const apiUrl = 'https://api.covid19india.org';
const arcgisDistrictUrl = 'https://services9.arcgis.com/HwXIp55hAoiv6DE9/ArcGIS/rest/services/District_Wise_Covid_19_Status_view/FeatureServer/0/query';

export const fetchTNData = async () => {
    try {
        const { data: { features } } = await axios.get(`${arcgisDistrictUrl}?where=1%3D1&objectIds=&time=&geometry=&
            geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=
            standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=
            Name%2C+Positive_Cases%2C+Active_Cases%2C+Recovered%2C+Death%2C+Last_Updated_Date&
            returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&
            maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&
            returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&
            returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&
            groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&
            returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&
            sqlFormat=none&f=json&token=`);
        const stateData = features.sort((a, b) => b.attributes.Positive_Cases - a.attributes.Positive_Cases)
            .map(({ attributes: { Name, Positive_Cases, Active_Cases, Recovered,
            Death, Last_Updated_Date } }) => {
                return {
                    stateName: Name,
                        confirmed: Positive_Cases,
                            active: Active_Cases,
                                recovered: Recovered,
                                    deaths: Death,
                                        lastUpdated: new Date(Last_Updated_Date).toLocaleString()
                }
        });
        return stateData;
    } catch (error) {
        console.log("fetchTNData -> error", error);
    }
}

export const fetchIndiaData = async () => {
    try {
        const { data } = await axios.get(`${apiUrl}/v2/state_district_wise.json`);
        // const stateData = data.filter((state) => state.state === "Tamil Nadu")
        console.log("fetchTNData -> response", data);
    } catch (error) {
        console.log("fetchTNData -> error", error);
    }
}