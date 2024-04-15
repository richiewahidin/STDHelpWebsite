# Canvas / Slack group number
20

# Names of the team members
Max Huang, Tommy Huynh, Kshitij Kapoor, Brendan Malone, Richie Wahidin

# Name of the project: STDHelp

# Link to project
https://www.stdhelp.site/

# Gitlab SHA
Phase 1: 52a34d32a02912d36a44299bd28c7b47ad658487
Phase 2: 3803b866d6dbec5f043b4dd6738e81ed35beb9ac
Phase 3: c00e08c1ed4ebe90401e08ea2c24c16f43d51572

# Gitlab Pipeline URL
- https://gitlab.com/tommyhuynh02n/cs373-group-20/-/pipelines/1227442723


# The proposed project:
STD cases in California are relatively higher when compared to the rest of the country. There is a stigma against STD testing, so we want to raise
more awareness and encourage people to go get tested and treated. To do this we will inform our audience on differnet types of STDs along with where
in California they can find a treatment center.

# API Documentation
- https://www.postman.com/bmaloneut/workspace/stdhelp/api/c441db53-30a6-4e53-91ac-4842697ffc21

# API Links
General: https://d1ahbxgizovdow.cloudfront.net
County: https://d1ahbxgizovdow.cloudfront.net/county
Prevalence: https://d1ahbxgizovdow.cloudfront.net/prevalence
Locator: https://d1ahbxgizovdow.cloudfront.net/treatmentcenter

# URLs of at least three data sources that you will programmatically scrape:
- https://npin.cdc.gov/search?query=&f%5B0%5D=testing_services%3A7931&f%5B1%5D=type%3Aorganization'
- https://www.hiv.gov/locator/#api
- https://data.cdc.gov/Behavioral-Risk-Factors/BRFSS-Table-of-HIV-AIDS/475u-gzzh/about_data
- https://dev.socrata.com/
- https://open.cdc.gov/apis.html
- https://developers.google.com/maps
- https://developers.google.com/youtube/v3
- https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/STD-Data.aspx (Model 1)
- https://data.chhs.ca.gov/dataset/?tags=STI (Model 2)
- https://www.hiv.gov/locator/#api (Model 3)
- https://www.beintheknow.org/hiv-and-stis/stis/stories

# At least three models:
1) Statistics on different counties in California.
2) Prevalence of STI on sex in different years.
3) Treatment Center Locator

# An estimate of the number of instances of each model:
1) 54
2) 100+
3) 300

# Each model must have many attributes:
## Describe five of those attributes for each model that you can filter or sort:
1) Statistics on different counties in California.
    a) Name of county
    b) Name of city
    c) Number of cases in location
    d) Cases by STD
    e) Size of city
2) Prevalence of STI on sex in different years.
    a) Year
    b) Sex
    c) Percent Chlamydia
    d) Percent Gonorrhea
    e) Percent Syphillis
    f) Percent HIV
3) Treatment Center Locator
    a) Address
    b) Name
    c) Website
    d) Treatment Services based on type of STD
    e) Phone Number

# Instances of each model must connect to instances of at least two other models:
1) Statistics on different counties in California.
    A) STDs with high percentages link to high number of cases. (model 2)
    B) Link to treatment centers in the county (model 3).
2) Prevalence of STI on sex in different years.
    A) Link to counties with high number of cases of STDs with high perentages (model 1).
    B) Display and link related content (model 3).
3) Treatment Center Locator
    A) Link to the statistic of the county it is located in (model 1).
    B) Display and link related content (model 2).

# Instances of each model must be rich with different media (e.g., feeds, images, maps, text, videos, etc.):
## describe two types of media for instances of each model:
1) Statistics on different counties in California.
    Map,
    Image of county/county flag
2) Prevalence of STI on sex in different years.
    Images,
    Google trends graph

3) Treatment Center Locator
    Map,
    Text about center (what diseases it is well-equipped for)

# Describe three questions that your site will answer:
1) How has the prevelance of STDs changed over the years?
2) Where to get treatment for certain STDs?
3) What cities have a lack of treatment?

# Estimated completion time: 
15

# Actual completion time: 
[N/A]
