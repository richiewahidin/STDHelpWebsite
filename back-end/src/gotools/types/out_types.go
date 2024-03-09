package types


//TODO: talk to model 1 person
type LocatorOut struct {
	Title string `json:"title"` //Made-up clinic
	Address string `json:"address"` // 111 Street Dr, City, State, zipcode
	City string `json:"city,omitempty"` //City
	Zip string `json:"zipcode"` //Zipcode
	Services string `json:"services"` //TODO: parse enums for services
	Phones []Mod1Phone `json:"phones"`
	ImageUrl string `json:"imageUrl,omitempty"` // /locator/image
}

type Mod1Phone struct {
	Description string `json:"description,omitempty"` // Reception
	PhoneRaw int `json:"PhoneNumber"` // 1512555555
	PhoneFormatted int `json:"FormattedPhone"` // +1 (512) 555-5555
}