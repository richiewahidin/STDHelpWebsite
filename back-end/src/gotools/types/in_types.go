package types

/*
	"attributes": {
	    "address": {
	        "city": "Leesburg",
	        "country": "USA",
	        "state": "VA",
	        "street": "211 Gibson St NW Ste 206",
	        "zipcode": "20176"
	    },
	    "categories": null,
	    "contact": {
	        "others": null,
	        "telephone": "7037795438",
	        "website": "https://www.inova.org/our-services/inova-juniper-program"
	    },
	    "distance": 4.62,
	    "languages": [
	        "English"
	    ],
	    "name": "Inova",
	    "point": {
	        "latitude": 39.1197293,
	        "longitude": -77.5676287
	    }
	},

"id": "hivtesting-2",
"type": "hivtesting"
*/
type LocatorInResponse struct {
	Attributes LocatorInAttributes `json:"attributes"`
	Id         string              `json:"id"`
	Type       string              `json:"type"`
}

type LocatorInAttributes struct {
	Address    LocatorInAddress `json:"address"`
	Categories string           `json:"categories"`
	Contact    LocatorInContact `json:"contact"`
	Distance   float64          `json:"distance"`
	Languages  []string         `json:"languages"`
	Name       string           `json:"name"`
	Point      LocatorInPoint   `json:"point"`
}

type LocatorInAddress struct {
	City    string `json:"city"`
	Country string `json:"country"`
	State   string `json:"state"`
	Street  string `json:"street"`
	Zip     string `json:"zipcode"`
}

type LocatorInContact struct {
	Others   string `json:"others"`
	PhoneRaw string `json:"telephone"`
	Website  string `json:"website"`
}

type LocatorInPoint struct {
	Lat  float64 `json:"latitude"`
	Long float64 `json:"longitude"`
}

type LocatorInRequest struct {
	Zip      string `json:"zipcode"`
	Radius   int    `json:"radius,omitempty"` //Miles (min: 1, max: 50, default: 10)
	Services string `json:"services"`         //comma-separated list of enums. docs says not required, but breaks if omitted
}
