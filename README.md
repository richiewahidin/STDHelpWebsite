# Canvas / Slack group number
20

# Names of the team members
Max Huang, Tommy Huynh, Kshitij Kapoor, Brendan Malone, Richie Wahidin

# Name of the project: STDHelp

# The proposed project: Sexually Transmitted Diseases

# URLs of at least three data sources that you will programmatically scrape:
- https://npin.cdc.gov/search?query=&f%5B0%5D=testing_services%3A7931&f%5B1%5D=type%3Aorganization'
- https://www.hiv.gov/locator/#api
- https://data.cdc.gov/Behavioral-Risk-Factors/BRFSS-Table-of-HIV-AIDS/475u-gzzh/about_data
- https://dev.socrata.com/
- https://open.cdc.gov/apis.html
- https://www.innerbody.com/std-testing/std-statistics
- https://developers.google.com/maps
- https://developers.google.com/youtube/v3

# At least three models:
1) Geographic spread of STDs
2) Information about STDs
3) Treatment Centers

# An estimate of the number of instances of each model:
1) 100
2) 50
3) 300

# Each model must have many attributes:
## Describe five of those attributes for each model that you can filter or sort:
1) Geographic spread of STD
    a) Name of city
    b) State
    c) Number of cases in location
    d) Cases by STD
    e) Size of city
2) Information about STD
    a) Location
    b) Number of cases
    c) Transmission Rate
    d) Age of those affected
    e) Sex of those affected
3) Treatment Centers
    a) Address
    b) Zip Code
    c) State
    d) Treatment Services based on type of STD
    e) Phone Number

# instances of each model must connect to instances of at least two other models:
1)
    A) Different treatment centers in the city (model 3).  
    B) Information about STDs in the city (model 2).  
2)
    A) Treatment centers that handle different STDs (model 3).  
    B) STDs prevalence in different areas (model 1).  
3)
    A) Information about STD prevalence in city (model 1).  
    B) Details about STDs handled by treatment center (model 2).  

# instances of each model must be rich with different media (e.g., feeds, images, maps, text, videos, etc.):
## describe two types of media for instances of each model:
1)
    Map,  
    Image of city
2)
    Text,  
    Informational videos (youtube)
3)
    Map,  
    Text about center (what diseases it is well-equipped for)

# describe three questions that your site will answer:
1) How widespread are certain STDs?
2) Where to get treatment for certain STDs?
3) What cities have STD epidemics?
