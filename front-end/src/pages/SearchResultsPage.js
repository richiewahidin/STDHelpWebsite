import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Tab, Tabs } from 'react-bootstrap';
import CountiesCard from './ModelOne/CountiesCard';
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import LocatorCard from '../components/LocatorCard';
import PrevalenceCard from '../components/PrevalenceCard'

function SearchResultsPage() {
  const { query } = useParams();
  const [activeTab, setActiveTab] = useState('counties'); // Default active tab
  const [countiesData, setCountiesData] = useState([]); // Initialize data state as an empty array
  const [locatorData, setLocatorData] = useState([]); // Initialize data state as an empty array
  const [prevalenceData, setPrevalenceData] = useState([]); // Initialize data state as an empty array
  const nav = useNavigate();
  const [pageCount, setPageCount] = useState(0); // Initialize page count state
  const [page, setPage] = useState(1); // Initialize page state
  const itemsPerPage = 9; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countiesResponse = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/county"
        );
        setCountiesData(countiesResponse.data.rows); // Update state with fetched counties data

        const locatorResponse = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/treatmentcenter"
        );
        setLocatorData(locatorResponse.data.rows); // Update state with fetched locator data

        const prevalenceResponse = await axios.get(
          "https://d1ahbxgizovdow.cloudfront.net/prevalence"
        );
        setPrevalenceData(prevalenceResponse.data.rows); // Update state with fetched prevalence data

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const countyMap = countiesData.reduce((acc, curr) => {
    acc[curr.id] = curr.name;
    return acc;
  }, {});

  useEffect(() => {
    const filteredCountiesData = countiesData.filter((item) => {
      const countyName = item.name.toLowerCase();
      const nameMatches = countyName.includes(query.toLowerCase());
      const populationMatches =
        parseInt(item.population.replace(/,/g, "")) > parseInt(query);
      return nameMatches || populationMatches;
    });

    const filteredLocatorData = locatorData.filter(item => {
      const name = item.name.toLowerCase();
      const address = item.address.toLowerCase();
      const searchWords = query.toLowerCase().split(" ");
      return searchWords.every(word => name.includes(word) || address.includes(word));
    });

    const filteredPrevalenceData = prevalenceData.filter(item => {
      const countyName = countyMap[item.countyid]?.toLowerCase();
      const year = item.year.toLowerCase();
      const sex = item.sex.toLowerCase();
      const male = "male"
    
      // Split search term into words
      const searchWords = query.toLowerCase().split(" ");
    
      // Check if each word is included in county name, year, or sex
      return searchWords.every(word =>
        countyName.includes(word) || year.startsWith(word) ||
        (sex.includes(word) && sex === "male") || 
        (sex.includes(word) && !male.includes(word) && sex === "female") ||
        (sex.includes(word) && sex === "total")
      );
    });
  

    if (activeTab === 'counties') {
      setPageCount(Math.ceil(filteredCountiesData.length / itemsPerPage));
    } else if (activeTab === 'locator') {
      setPageCount(Math.ceil(filteredLocatorData.length / itemsPerPage));
    } else if (activeTab === 'prevalence') {
      setPageCount(Math.ceil(filteredPrevalenceData.length / itemsPerPage));
    }
    setPage(1); // Reset page to 1 when switching tabs
  }, [countiesData, locatorData, prevalenceData, query, activeTab]);

  const handleClick = (
    id,
    name,
    population,
    ccases,
    gcases,
    scases,
    escases,
    tscases,
    udcases,
    map,
    flag
  ) => {
    nav(`/counties/${name}`, {
      state: {
        id,
        name,
        population,
        ccases,
        gcases,
        scases,
        escases,
        tscases,
        udcases,
        map,
        flag,
      },
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1); // Reset page to 1 when switching tabs
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getFilteredData = () => {
    if (activeTab === 'counties') {
      return countiesData.filter((item) => {
        const countyName = item.name.toLowerCase();
        const nameMatches = countyName.includes(query.toLowerCase());
        const populationMatches =
          parseInt(item.population.replace(/,/g, "")) > parseInt(query);
        return nameMatches || populationMatches;
      });
    } else if (activeTab === 'locator') {
      return locatorData.filter(item => {
        const name = item.name.toLowerCase();
        const address = item.address.toLowerCase();
        const searchWords = query.toLowerCase().split(" ");
        return searchWords.every(word => name.includes(word) || address.includes(word));
      });
    } else if (activeTab === 'prevalence') {
      return prevalenceData.filter(item => {
        const countyName = countyMap[item.countyid]?.toLowerCase();
        const year = item.year.toLowerCase();
        const sex = item.sex.toLowerCase();
        const male = "male"
      
        // Split search term into words
        const searchWords = query.toLowerCase().split(" ");
      
        // Check if each word is included in county name, year, or sex
        return searchWords.every(word =>
          countyName.includes(word) || year.startsWith(word) ||
          (sex.includes(word) && sex === "male") || 
          (sex.includes(word) && !male.includes(word) && sex === "female") ||
          (sex.includes(word) && sex === "total")
        );
      });
    }
    return [];
  };

  const filteredData = getFilteredData();

  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(page * itemsPerPage, filteredData.length);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <Tabs activeKey={activeTab} onSelect={handleTabChange} id="search-results-tabs">
        <Tab eventKey="counties" title="Counties">
          <div>
            <Row>
              {filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => (
                <Col key={index} sm={4} className="d-flex justify-content-center">
                  <CountiesCard
                    item={item}
                    onClick={() =>
                      handleClick(
                        item.id,
                        item.name,
                        item.population,
                        item.ccases,
                        item.gcases,
                        item.scases,
                        item.escases,
                        item.tscases,
                        item.udcases,
                        item.map,
                        item.flag,
                      )
                    }
                  />
                </Col>
              ))}
            </Row>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              size="large"
              className="pagination"
            />
            <div className="d-flex justify-content-center" style={{ justifyContent: 'center', padding: 15, paddingBottom: 20 }}>
              Displaying: {startIndex} - {endIndex} out of {filteredData.length}
            </div>
            <p className="text-center" style={{ position: "relative", bottom: "0px", justifyContent: 'center' }}>
              *This refers to Primary and Secondary Syphilis.
            </p>
          </div>
        </Tab>
        <Tab eventKey="locator" title="Locator">
          <div>
            <div className="grid">
              {filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => (
                <LocatorCard key={index} {...item} />
              ))}
            </div>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              size="large"
              className="pagination"
            />
            <div className="d-flex justify-content-center" style={{ justifyContent: 'center', padding: 15, paddingBottom: 20 }}>
              Displaying: {startIndex} - {endIndex} out of {filteredData.length}
            </div>
          </div>
        </Tab>
        <Tab eventKey="prevalence" title="Prevalence">
          <div className="grid">
        {filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => (
          <PrevalenceCard key={index} {...item} />
        ))}
      </div>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              size="large"
              className="pagination"
            />
            <div className="d-flex justify-content-center" style={{ justifyContent: 'center', padding: 15, paddingBottom: 20 }}>
              Displaying: {startIndex} - {endIndex} out of {filteredData.length}
            </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default SearchResultsPage;
