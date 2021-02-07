const axios = require('axios');//to make api calls
const xml2js = require('xml2js');// to parse xml data to json
const url = 'https://www.senate.gov/general/contact_information/senators_cfm.xml';//url to get data from

//connect to the api
axios.get(url, { "Content-Type": "application/xml; charset=utf-8" })
    .then(function (response) {
        const data = response.data;//xml data
        let parser = new xml2js.Parser();
        parser.parseString(//parse xml data to json
            data,
            function (err, result) {//get information from the json object
                for (let [k, v] of Object.entries(result)) {
                    console.log(`${k}:-`)
                    for (const i in v) {
                        if (Object.hasOwnProperty.call(v, i)) {
                            const element = v[i];
                            for (let j = 0; j < element.length; j++) {
                                const d = element[j];
                                let member = new memberDetails(d);
                                console.log(`-------------------${j + 1}-------------------`)
                                console.log(member);
                            }
                        }
                    }
                }
            }
        );
    });

//create member details object
function memberDetails(d) {
    if ((d["first_name"] !== undefined)) {
        this.firstName = d["first_name"].toString(),
        this.lastName = d["last_name"].toString(),
        this.fullName = `${d["first_name"]} ${d["last_name"]}`
        this.chartId = d["bioguide_id"].toString(),
        this.mobile = d["phone"].toString(),
        this.address = d["address"].toString()
    }
}