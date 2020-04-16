


# CREATIVE INNOVATION: HAPPY, HEALTHY, WEALTHY, OR WISE?

## 1.0 PROJECT DESCRIPTION

*DVA Spring 2020 Project*

This project explores the factors that may play a role in determining the innovation level for a nation, specifically between economic and creative factors. We leveraged both supervised and unsupervised models to determine potential factors for innovation, and incorporated our analyses and conclusions in a GitHub-hosted website. The website also contains interactive visualizations that allow users to independently explore the results of our models and compare the differences between each model. This website can be found here: https://github.gatech.edu/pages/lwalkosz3/Innovation/

**1.1 MOTIVATION**

This project was born out of our curiosity about innovation. Innovation is an intangible concept that has the potential for significant impact on a national level, such as breakthroughs in technology, disruption in the gig economy, and medical advances.

Is innovation impacted by the educational, personal, financial, and/or societal structures of a nation? This is an important question to explore because innovation is an essential component to a country's development and has the potential to improve quality of life across the board. By understanding what factors contribute to innovation and recognizing it relationship to a nation's development, we can seek to encourage those factors. Compared to existing literature about the subject, our approach will combine a mix of sources, including both creative fields (e.g., film and music) and economically-significant measures (e.g., patents and GDP).

**1.2 PACKAGE DESCRIPTION**

All the project data and code are contained within a GitHub: https://github.gatech.edu/lwalkosz3/Innovation

**1.2.1 Data**

There are 40 datasets that were obtained from various locations, including the World Bank, the Global Innovation Index site, and UNESCO. All the datasets can be found in the GitHub Data folder.

**1.2.2 Models**

We explored both supervised and unsupervised models for this project (Data_Analysis folder). Given the amount of data processed, feature selection was a key component in both the supervised and unsupervised models. Supervised models (linear regression) include recursive feature elimination (RFE) and lasso. For the unsupervised model, the data was pre-processed (feature correlation and elimination) prior to running the K-means clustering. Each subfolder also contains the output .CSV files that are used for the visualizations.

**1.2.3 Website**

The website serves as a user-friendly platform containing major aspects of our project (data, analysis, conclusion). It also contains interactive visualizations for key models that we analyzed, displaying easily-consumable results and providing the opportunity to compare results between models. Users can analyze the differences between models (e.g., RFE linear regression vs lasso linear regression) or between supervised and unsupervised results.

## 2.0 INSTALLATION

The data cleansing and modeling code require Python 3.7.x and are stored in Jupyter notebooks. The easiest way to interact with these notebooks would be to download Jupyter (either as a standalone software or with Anaconda). Prior to running the code in these notebooks, please install any necessary Python libraries.

The model results and visualizations are contained in a website (https://github.gatech.edu/pages/lwalkosz3/Innovation/). If there are any issues loading the website or interacting with the visualizations, please make sure that your browser version is up-to-date. JavaScript also needs to be enabled for the D3 visualizations.

## 3.0 EXECUTION

The website will run automatically upon loading the page. The results from the models have already been outputted into .CSV files. However, users can access the GitHub to run the underlying code as well.

**3.0.1 Data**

The source links for the 40 datasets are included in the descriptions for each dataset in the Data folder. Most of the data sources provided an option to download the data directly. Otherwise, the sources contained tabulated data, making it easy to copy-paste the data into a .CSV file.

The code to cleanse and integrate these datasets can be found in the GitHub Data_Integration folder. The datasets were first cleansed: the code for each dataset is contained in separate Jupyter notebooks, reading in the original dataset (Data folder) and outputting the cleansed data into .CSV files (Data/Converted folder).

After cleaning the data, the mergeAll.ipynb Jupyter file (Data_Integration folder) was used to merge all the cleansed data into a single dataset.

**3.0.2 Models**

EDA (exploratory data analysis) was used to investigate the data prior to modeling. The corresponding Jupyter notebook is located in the Data_Analysis folder, which also contains subfolders for our supervised and unsupervised models.

The Jupyter notebooks for both the supervised and unsupervised models are located in their respective subfolders. The supervised model notebook includes the feature selection as a component of the models run. Meanwhile, the unsupervised model subfolder breaks out the feature correlation analysis in a separate notebook. The notebook containing code for the unsupervised model can be run after exploring the data with feature correlation.

**3.0.3 Website**

As mentioned, the website will execute automatically after loading the page. To explore the underlying HTML/CSS/JavaScript components of the website (and accompanying visualizations), the user will be able to locate the files in the main GitHub folder and the Web subfolder. The HTML files for the different website pages (in tab order) are:
1. Index.html
2. Data.html
3. Analysis.html
4. Conclusion.html
5. About.html
	
## 4.0 Contributors

- Marc Boulet
- Minkwon Lee
- Michael Migliacio
- Ricardo Stamato
- Lisa Walkosz-Migliacio
- Catherine Yin
