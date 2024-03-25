package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/mrz1836/go-sanitize"
	"gitlab.com/tommyhuynh02n/cs373-group-20/back-end/src/gotools/types"
)

/*
var flagAllCsv = flag.Bool("all", true, "formats all data into csv. Outputs in ./out/")
var flagLocator = flag.Bool("all", false, "formats locator data into csv. Outputs to ./out/locator.csv")
var flagPrevalence = flag.Bool("all", false, "formats prevalence data into csv. Outputs to ./out/prevalence.csv")
var flagCounty = flag.Bool("all", false, "formats county data into csv. Outputs to ./out/county.csv")
var flagLocatorZip = flag.String("all", "", "Queries locator for zip code. If omitted, instead uses a predetermined list of zips")
*/
var zipList = []string{"90011", "90026", "90044", "90003", "90201", "93550", "91331", "92503", "92683", "92335", "91710", "92509", "93722", "92154", "94565", "92021", "93033", "94544", "91706", "90250", "93727", "93257", "95823", "92704", "95828", "92126", "91342", "91709", "93612", "93706"}

func processLocator(zip string) ([]types.LocatorInResponse, error) {
	//scuffed way of doing this
	url := "https://locator-api.hiv.gov/providers?services=hivtesting,ryanwhite,stdtesting,clinics,selftesting,preptesting&radius=10&zipcode=" + zip

	request, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	request.Header.Add("client_id", "bmalone")
	request.Header.Add("client_token", os.Getenv("HIV_API_TOKEN"))

	response, err := http.DefaultClient.Do(request)

	if err != nil {
		return nil, err
	}

	respbytes, err := ioutil.ReadAll(response.Body)

	if err != nil {
		return nil, err
	}

	var loc []types.LocatorInResponse
	//fmt.Println(string(respbytes))

	if err := json.Unmarshal(respbytes, &loc); err != nil {
		return nil, err
	}

	return loc, nil
}

func mapCityCounty() (map[string]string, map[string]int, error) {
	cityMap := make(map[string]string)
	filename := "counties.csv"
	cityFile, err := os.OpenFile(filename, os.O_RDONLY, 0755)
	if err != nil {
		return nil, nil, err
	}

	numMap := make(map[string]int)
	filename = "countyref.txt"
	countyNumFile, err := os.OpenFile(filename, os.O_RDONLY, 0755)
	if err != nil {
		return nil, nil, err
	}

	cityReader := bufio.NewScanner(cityFile)
	for cityReader.Scan() {
		splitLine := strings.Split(cityReader.Text(), ",") //Assuming that there will ALWAYS and ONLY be 2 parts of a line in the format "County,City"
		cityMap[splitLine[1]] = splitLine[0]
	}
	if cityReader.Err() != nil {
		return nil, nil, err
	}

	numReader := bufio.NewScanner(countyNumFile)
	id := 0
	for numReader.Scan() {
		numMap[numReader.Text()] = id
		id++
	}
	if numReader.Err() != nil {
		return nil, nil, err
	}

	return cityMap, numMap, nil
}

func getCountyId(cityMap map[string]string, numMap map[string]int, in types.LocatorInResponse) int {
	value, exists := numMap[cityMap[in.Attributes.Address.City]]
	if !exists {
		return 0
	}
	return value
}

func constructLocatorOut(in types.LocatorInResponse, i int, countyid int) string {
	var sb strings.Builder
	sb.WriteString(fmt.Sprint(i))
	sb.WriteString(",")

	sb.WriteString(sanitize.AlphaNumeric(in.Attributes.Name, true))
	sb.WriteString(",\"")

	sb.WriteString(sanitize.AlphaNumeric(in.Attributes.Address.Street, true))
	sb.WriteString(",")
	sb.WriteString(in.Attributes.Address.City)
	sb.WriteString(",")
	sb.WriteString(in.Attributes.Address.State)
	sb.WriteString(" ")
	sb.WriteString(in.Attributes.Address.Zip)
	sb.WriteString("\",")

	sb.WriteString(fmt.Sprint(countyid))
	sb.WriteString(",")

	sb.WriteString(fmt.Sprintf("%.2f", in.Attributes.Distance))
	sb.WriteString(",")

	sb.WriteString(sanitize.AlphaNumeric(in.Attributes.Contact.PhoneRaw, true))
	sb.WriteString(",")

	if len(in.Attributes.Contact.Website) == 0 {
		sb.WriteString("no website")
	} else {
		sb.WriteString(in.Attributes.Contact.Website)
	}
	sb.WriteString("\n")

	return sb.String()
}

/*
*
On Error, returns empty file struct and err. the error is most likely a *PathError

func openLocalcsv() (*os.File, error) {
	filename := "test.csv"
	f, err := os.OpenFile(filename, os.O_RDWR|os.O_CREATE, 0755)
	if err != nil {
		return new(os.File), err
	}
	return f, nil
}
*/

func main() {
	filename := "out.csv"
	f, err := os.OpenFile(filename, os.O_RDWR|os.O_CREATE, 0755)
	if err != nil {
		fmt.Println(err)
		return
	}
	writer := bufio.NewWriter(f)
	i := 0

	cityMap, numMap, err := mapCityCounty()
	if err != nil {
		fmt.Println(err)
		return
	}

	for _, zipcode := range zipList {
		loc, err := processLocator(zipcode)
		if err != nil {
			fmt.Println(err)
		}
		for _, clinic := range loc {
			writer.Write([]byte(constructLocatorOut(clinic, i, getCountyId(cityMap, numMap, clinic))))
			i++
		}
	}

}
