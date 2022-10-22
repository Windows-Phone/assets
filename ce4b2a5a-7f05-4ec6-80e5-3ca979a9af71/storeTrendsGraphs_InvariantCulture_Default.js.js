/* Strore trends kendo ui graphs */
/* Namespacing */
if (typeof (WPCPub) === "undefined") WPCPub = {};

// Component encapsulation
(WPCPub.StoreTrends = function () {

   // Run script in strict operating context
   "use strict";

   // JSON data for store trends and localizable data
   var storeJSONData = undefined;
   var cultureJSONData = undefined;

   // Series chart fields object - to hold PC or Phone data
   var seriesChartObject = undefined;

   // Hold selected region
   var selectedRegion = undefined;

   // Chart height
   var chartHeight = undefined;

   // Trend Data object
   var trendData = undefined;

   // Store trends current month
   var storeTrendsCurrentMonth = undefined;

   // Initialize chart array index to 0
   var chartIndex = 0;

   // PC string
   var pcString = "PC";

   // String to test for phone in JSON
   var phoneString = "Phone";

   // Require js string
   var requireString = "require";

   // Object string
   var objectString = "object";

   // Empty string
   var emptyString = "";

   // jQuery selected element [select/region]
   var optionSelectedString = "option:selected";

   // Store Trends label
   var $storeTrendsLabel = $(".storeTrendsLabel");

   // Store Trends label string [Sep 2015 (World)] {0} - Sep 2015 / {1} = World 
   var storeTrendsLabelString = "{0} ({1})";

   // RTL locales
   var storeRTLLocalesArray = ['ar-sa', 'he-il'];

   // Set current locale from pathname
   // Set to 'en-us' for the example since the locale isn't in the pathname
   // var currentLocale = window.location.pathname.split("/")[1].toLocaleLowerCase();
   var currentLocale = 'en-us';

   // Kendo dependency files array
   var kendoDependencyFilesArray = ['k/kendo.core.min', 'k/kendo.data.min', 'k/kendo.userevents.min', 'k/kendo.color.min', 'k/kendo.dataviz.core.min', 'k/kendo.dataviz.themes.min', 'k/kendo.dataviz.chart.min', 'culture-strings', 'storetrends-json'];

   // jQuery elements [select/chart]
   var $selectRegion = $("#selectRegion");

   // String holding k-chart class, this won't be in DOM until chart is created
   var kchartString = ".k-chart";

   // Graph type: radio buttons, needed for resizing chart to available window
   var $radioElements = $(".radio label[data-target^=#pivot]");

   // Select option string
   // Need this to bind options to select region element
   var selectOptionString = "<option value={0}>{1}</option>";

   // Extending string to format placeholder arguments
   // Used to replace arguments in selectOptionString for select options
   String.prototype.format = function () {
      var s = this;
      var i = arguments.length;

      while (i--) {
         s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
      }

      return s;
   };

   // Default select option to World
   var worldString = "World";

   // Click event string
   var clickString = "click";

   // Trend type strings that we get from JSON data (Some with space in-between).
   // Used as key to get the value from JSON object
   var trendTypeOsInstallBaseString = "OsInstallBase";
   var trendTypeMemoryString = "Memory";
   var trendTypeResolutionString = "Resolution";
   var trendTypeStorageString = "Storage";
   var trendTypeDirectXSupportString = "DirectXSupport";
   var trendTypeScreenSizeString = "Screen Size";
   var trendTypeProcessorCpuCoresString = "ProcessorCpuCores";
   var trendTypeGpuFormFactorString = "GpuFormFactor";
   var trendTypeProcessorThermalDesignPowerString = "ProcessorThermalDesignPower";
   var trendTypeVideoRamString = "VideoRam";
   var trendTypeDownloadCategoryAppsString = "Downloads by category Apps";
   var trendTypeDownloadCategoryGamesString = "Downloads by category Games";
   var trendTypeAppsSalesCategoryString = "Sales by category Apps";
   var trendTypeGamesSalesCategoryString = "Sales by category Games";
   var trendTypeAppRevenueAppsString = "Revenue mix Apps";
   var trendTypeAppRevenueGamesString = "Revenue mix Games";

   // Chart strings for binding graph data object
   var chartElementsObject = {};

   chartElementsObject[trendTypeOsInstallBaseString] = "#chart_OsInstallBase_";
   chartElementsObject[trendTypeMemoryString] = "#chart_Memory_";
   chartElementsObject[trendTypeStorageString] = "#chart_Storage_";
   chartElementsObject[trendTypeResolutionString] = "#chart_Resolution_";
   chartElementsObject[trendTypeDirectXSupportString] = "#chart_DirectXSupport_";
   chartElementsObject[trendTypeScreenSizeString] = "#chart_ScreenSize_";
   chartElementsObject[trendTypeProcessorCpuCoresString] = "#chart_ProcessorCpuCores_";
   chartElementsObject[trendTypeGpuFormFactorString] = "#chart_GpuFormFactor_";
   chartElementsObject[trendTypeProcessorThermalDesignPowerString] = "#chart_ProcessorThermalDesignPower_";
   chartElementsObject[trendTypeVideoRamString] = "#chart_VideoRam_";
   chartElementsObject[trendTypeDownloadCategoryAppsString] = "#chart_AppsDownloadsCategory_";
   chartElementsObject[trendTypeDownloadCategoryGamesString] = "#chart_GamesDownloadsCategory_";
   chartElementsObject[trendTypeAppsSalesCategoryString] = "#chart_AppsSalesCategory_";
   chartElementsObject[trendTypeGamesSalesCategoryString] = "#chart_GamesSalesCategory_";
   chartElementsObject[trendTypeAppRevenueAppsString] = "#chart_AppsRevenue_";
   chartElementsObject[trendTypeAppRevenueGamesString] = "#chart_GamesRevenue_";

   // Kendo chart data binding strings
   var chartLongHeight = 450;
   var chartShortHeight = 280;
   var trueString = true;
   var falseString = false;
   var monthString = "month";
   var autoString = "auto";
   var percentileFormatString = "{0}%";
   var tooltipTemplateString = "#= series.name # (#= kendo.format('{0:n0}',value) #%)";
   //var seriesColorsArray = ["#303D91", "#7160EB", "#DA3B01", "#881798", "#007686", "#750B1C", "#673693", "#498205", "#E1048B", "#0078D7", "#EA6363"];
   var colorffffffString = "#ffffff";
   var positionBottomString = "bottom";
   var alignLeftString = "left";
   var seriesTypeString = "column";

   // New colors
   var newColors = ['#DDDEDE', '#727077', '#A5C05B', '#78A5A3', '#E1B16A', '#444C5C', '#ED8C72', '#DDDDDD', '#2F496E', '#2988BC'];
   var twoTone = ['#78A5A3', '#A5C05B'];
   var newColorsReverse = newColors.slice(0);
   newColorsReverse.reverse();

   // Kendo chart data binding objects used commonly across
   // Chart legend object
   var chartLegendObject =
      {
         position: positionBottomString,
         align: alignLeftString
      };
   // Chart series defaults object
   var chartSeriesDefaultObject =
      {
         type: seriesTypeString,
         stack: trueString,
         overlay:
         {
            gradient: null
         }
      };
   // Chart value axis object
   var chartValueAxisObject =
      {
         labels:
         {
            format: percentileFormatString
         },
         max: 100,
         majorUnit: 20,
         line:
         {
            visible: falseString
         },
         axisCrossingValue: 0
      };
   // Chart category axis object
   var chartCategoryAxisObject =
      {
         field: monthString,
         majorGridLines:
         {
            visible: falseString
         },
         line:
         {
            visible: falseString
         },
         labels:
         {
            rotation:
            {
               angle: autoString
            }
         }
      };
   // Chart category axis object for RTL
   var chartRTLCategoryAxisObject =
      {
         field: monthString,
         majorGridLines:
         {
            visible: falseString
         },
         line:
         {
            visible: falseString
         },
         labels:
         {
            rotation:
            {
               angle: autoString
            }
         },
         reverse: true
      };
   // Chart tooltip object
   var chartTooltipObject =
      {
         visible: trueString,
         format: percentileFormatString,
         template: tooltipTemplateString,
         background: colorffffffString,
         padding: 5
      };
   // Chart fields object used in chart series
   var chartFieldsArray =
      {
         // Chart Os Install base fields object PC/Phone
         OsInstallBase:
         {
            PC: [
               {
                  field: "RSFOUR",
                  name: "Windows 10 April 2018 Update"
               },
               {
                  field: "RSTHREE",
                  name: "Fall Creators Update"
               },
               {
                  field: "PreSPRSTHREE",
                  name: "Pre-Fall Creators Update"
               }],
            Phone: [
               {
                  field: "WindowsSPPhoneSPEIGHT",
                  name: "Windows Phone 8"
               },
               {
                  field: "WindowsSPPhoneSPEIGHTDOTONE",
                  name: "Windows Phone 8.1"
               }]
         },
         // Chart Memory fields object - PC/Phone
         Memory:
         {
            PC: [
               {
                  field: "LTEQTWOSPGB",
                  name: "<=2 GB"
               },
               {
                  field: "THREESPGB",
                  name: "3 GB"
               },
               {
                  field: "FOURSPGB",
                  name: "4 GB"
               },
               {
                  field: "SIXSPGB",
                  name: "6 GB"
               },
               {
                  field: "EIGHTSPGB",
                  name: "8 GB"
               },
               {
                  field: "ONETWOSPGB",
                  name: "12 GB"
               },
               {
                  field: "ONESIXSPGB",
                  name: "16 GB"
               },
               {
                  field: "GTONESIXSPGB",
                  name: ">16 GB"
               }],
            Phone: [
               {
                  field: "EQLTSPTWOFIVESIXk",
                  name: "=< 256k"
               },
               {
                  field: "TWOFIVESEVENkDASHNINENINENINEk",
                  name: "257k-999k"
               },
               {
                  field: "ONEGBDASHONEDOTNINEGB",
                  name: "1GB-1.9GB"
               },
               {
                  field: "GTEQTWOGB",
                  name: ">=2GB"
               }]
         },
         // Chart Storage fields object - PC/Phone
         Storage:
         {
            PC: [
               {
                  field: "LTEQSIXFOURSPGB",
                  name: "<=64 GB"
               },
               {
                  field: "ONETWOEIGHTSPGB",
                  name: "128 GB"
               },
               {
                  field: "TWOFIVEZEROSPGB",
                  name: "250 GB"
               },
               {
                  field: "FIVEZEROZEROSPGB",
                  name: "500 GB"
               },
               {
                  field: "ONESPTB",
                  name: "1 TB"
               },
               {
                  field: "TWOSPTB",
                  name: "2 TB"
               },
               {
                  field: "GTTWOSPTB",
                  name: ">2 TB"
               }],
            Phone: [
               {
                  field: "FOUR",
                  name: "=<4 GB"
               },
               {
                  field: "EIGHT",
                  name: "8 GB"
               },
               {
                  field: "ONESIX",
                  name: "16 GB"
               },
               {
                  field: "THREETWO",
                  name: "32 GB"
               }]
         },
         // Chart Resolution fields object - PC
         Resolution:
         {
            PC: [
               {
                  field: "LTSEVENTWOZEROp",
                  name: "<720p"
               },
               {
                  field: "SEVENTWOZEROp",
                  name: "720p"
               },
               {
                  field: "ONEZEROEIGHTZEROp",
                  name: "1080p"
               },
               {
                  field: "ONEFOURFOURZEROp",
                  name: "1440p"
               },
               {
                  field: "GTEQFOURk",
                  name: ">=4k"
               }]
         },
         // Chart DirectX fields object - PC
         DirectXSupport:
         {
            PC: [
               {
                  field: "LTONEONE",
                  name: "<11"
               },
               {
                  field: "ONEONE",
                  name: "11"
               },
               {
                  field: "ONETWO",
                  name: "12"
               }]
         },
         // Chart ProcessorCpuCores fields object - PC
         ProcessorCpuCores:
         {
            PC: [
               {
                  field: "ONE",
                  name: "1"
               },
               {
                  field: "TWOPLUS",
                  name: "2+"
               },
               {
                  field: "FOURPLUS",
                  name: "4+"
               }]
         },
         // Chart GpuFormFactor fields object - PC
         GpuFormFactor:
         {
            PC: [
               {
                  field: "Discrete",
                  name: "Discrete"
               },
               {
                  field: "Integrated",
                  name: "Integrated"
               },
               {
                  field: "Other",
                  name: "Other"
               }]
         },
         // Chart VideoRam fields object - PC
         VideoRam:
         {
            PC: [
               {
                  field: "LTEQTWOSPGB",
                  name: "<=2 GB"
               },
               {
                  field: "THREESPGB",
                  name: "3 GB"
               },
               {
                  field: "FOURSPGB",
                  name: "4 GB"
               },
               {
                  field: "SIXSPGB",
                  name: "6 GB"
               },
               {
                  field: "EIGHTSPGB",
                  name: "8 GB"
               },
               {
                  field: "ONETWOSPGB",
                  name: "12 GB"
               },
               {
                  field: "ONESIXSPGB",
                  name: "16 GB"
               },
               {
                  field: "GTONESIXSPGB",
                  name: ">16 GB"
               }],
         },
         // Chart ProcessorThermalDesignPower fields object - PC
         ProcessorThermalDesignPower:
         {
            PC: [
               {
                  field: "LTEQTWOZEROSPW",
                  name: "<=20 W"
               },
               {
                  field: "TWOONEDASHFIVEZEROSPW",
                  name: "21-50 W"
               },
               {
                  field: "FIVEONEDASHSEVENZEROSPW",
                  name: "51-70 W"
               },
               {
                  field: "GTSEVENZEROSPW",
                  name: ">70 W"
               }],
         },
      };
   // Extending chartFieldsArray
   // Chart ScreenSize fields object - Phone
   chartFieldsArray[trendTypeScreenSizeString] =
      {
         Phone: [
            {
               field: "EQLTSPFOURDOTZERO",
               name: "=< 4.0"
            },
            {
               field: "FOURDOTONESPtoSPFOURDOTNINE",
               name: "4.1-4.9"
            },
            {
               field: "FIVEDOTZEROSPtoSPFIVEDOTNINE",
               name: "5.0-5.9"
            },
            {
               field: "GTEQSPSIXDOTZERO",
               name: ">= 6.0"
            }]
      };


   // Process culture data
   var processCultureData = function () {
      // Culture JSON data from file
      cultureJSONData = window.localizedStrings;

      // Chart App downloads by category fields object - PC/Phone
      // Locale based field name mapping 
      chartFieldsArray[trendTypeDownloadCategoryAppsString] = [
         {
            field: "BooksSPANDSPreference",
            name: cultureJSONData[currentLocale]["Books & Reference"]
         },
         {
            field: "Business",
            name: cultureJSONData[currentLocale].Business
         },
         {
            field: "DeveloperSPtools",
            name: "Developer Tools"
         },
         {
            field: "Education",
            name: cultureJSONData[currentLocale].Education
         },
         {
            field: "Entertainment",
            name: cultureJSONData[currentLocale].Entertainment
         },
         {
            field: "FamilySPANDSPkids",
            name: "Family & Kids"
         },
         {
            field: "Fighting",
            name: "Fighting"
         },
         {
            field: "HealthSPANDSPfitness",
            name: cultureJSONData[currentLocale]["Health & Fitness"]
         },
         {
            field: "Lifestyle",
            name: cultureJSONData[currentLocale].Lifestyle
         },
         {
            field: "Medical",
            name: "Medical"
         },
         {
            field: "Music",
            name: cultureJSONData[currentLocale].Music
         },
         {
            field: "NavigationSPANDSPmaps",
            name: cultureJSONData[currentLocale]["Navigation & Maps"]
         },
         {
            field: "NewsSPANDSPweather",
            name: cultureJSONData[currentLocale]["News & Weather"]
         },
         {
            field: "PersonalSPFinance",
            name: "Personal Finance"
         },
         {
            field: "Personalization",
            name: "Personalization"
         },
         {
            field: "PhotoSPANDSPvideo",
            name: "Photo & Video"
         },
         {
            field: "Productivity",
            name: cultureJSONData[currentLocale].Productivity
         },
         {
            field: "Security",
            name: "Security"
         },
         {
            field: "Shopping",
            name: cultureJSONData[currentLocale].Shopping
         },
         {
            field: "Social",
            name: cultureJSONData[currentLocale].Social
         },
         {
            field: "Sports",
            name: cultureJSONData[currentLocale].Sports
         },
         {
            field: "Travel",
            name: cultureJSONData[currentLocale].Travel
         },
         {
            field: "Tv",
            name: "TV"
         },
         {
            field: "UtilitiesSPANDSPtools",
            name: "Utilities & Tools"
         },
         {
            field: "Video",
            name: "Video"
         },
         {
            field: "Other",
            name: cultureJSONData[currentLocale].Other
         }
      ];
      
      // Chart Games downloads by category
      // Locale based field name mapping
      chartFieldsArray[trendTypeDownloadCategoryGamesString] = [
         {
            field: "ActionSPANDSPadventure",
            name: "Action & Adventure"
         },
         {
            field: "CardSPANDSPboard",
            name: "Card & Board"
         },
         {
            field: "Casino",
            name: "Casino"
         },
         {
            field: "Classics",
            name: "Classics"
         },
         {
            field: "FamilySPANDSPkids",
            name: "Family & Kids"
         },
         {
            field: "Fighting",
            name: "Fighting"
         },
         {
            field: "Games",
            name: cultureJSONData[currentLocale].Games
         },
         {
            field: "Kinect",
            name: "Kinect"
         },
         {
            field: "MultiDASHplayerSPOnlineSPBattleSPArena",
            name: "Multi-Player Online Battle Arena"
         },
         {
            field: "Music",
            name: cultureJSONData[currentLocale].Music
         },
         {
            field: "Platformer",
            name: "Platformer"
         },
         {
            field: "PuzzleSPANDSPtrivia",
            name: "Puzzle & Trivia"
         },
         {
            field: "RacingSPANDSPflying",
            name: "Racing & Flying"
         },
         {
            field: "RoleSPPlaying",
            name: "Role Playing"
         },
         {
            field: "Shooter",
            name: "Shooter"
         },
         {
            field: "Simulation",
            name: "Simulation"
         },
         {
            field: "Sports",
            name: cultureJSONData[currentLocale].Sports
         },
         {
            field: "Strategy",
            name: "Strategy"
         },
         {
            field: "Other",
            name: cultureJSONData[currentLocale].Other
         }
      ];

      // Chart Revenue mix of apps and IAPs fields object PC/Phone
      // Locale based field name mapping
      chartFieldsArray[trendTypeAppRevenueAppsString] = [
         {
            field: "Apps",
            name: cultureJSONData[currentLocale]["Paid Apps"]
         },
         {
            field: "IAPs",
            name: cultureJSONData[currentLocale].IAP
         }
      ];
   };

   // Process graph data
   var processGraphData = function () {
      // Graph JSON data from file
      storeJSONData = window.graphData;

      // Region string
      var regionString = undefined;

      // Bind options to select element - select data for specific regions
      // Region objects - [USA/Europe...]
      // Extracting regions from the first trend we have in JSON object
      for (var trendName in storeJSONData) {
         // Checking for trendname and storeJSONData[trendName]
         if ((trendName !== emptyString && trendName !== undefined) && typeof storeJSONData[trendName] === objectString) {

            // Looping through regions and updating select element options
            for (var region in storeJSONData[trendName]) {
               // Checking for region 
               if (region !== emptyString && region !== undefined) {
                  // Localize regions based on current locale
                  regionString = cultureJSONData[currentLocale][region] ? cultureJSONData[currentLocale][region] : region;

                  // Append option string with region data
                  $selectRegion.append(selectOptionString.format(JSON.stringify(region), regionString));
               }
            }

            // Break after the first trendname
            break;
         }
      }

      // Selected region to update graphs
      $selectRegion.change(function () {
         // Get selected region
         selectedRegion = this.value;

         // Re-intialize chartindex on region change
         // All graphs have to be re-created with new region based data
         // Graph types are passed in an array and identified using chartIndex 
         chartIndex = 0;

         // Chart bind calls - using timer
         //setCreateChartTimer([trendTypeOsInstallBaseString, trendTypeMemoryString, trendTypeStorageString, trendTypeResolutionString, trendTypeDirectXSupportString, trendTypeScreenSizeString, trendTypeDownloadCategoryString, trendTypeAppSalesCategoryString, trendTypeAppIAPDownloadsOSString, trendTypeAppIAPRevenueString]);
         setCreateChartTimer([trendTypeOsInstallBaseString, trendTypeMemoryString, trendTypeStorageString, trendTypeResolutionString, trendTypeDirectXSupportString, trendTypeProcessorCpuCoresString, trendTypeGpuFormFactorString, trendTypeProcessorThermalDesignPowerString, trendTypeVideoRamString, trendTypeDownloadCategoryAppsString, trendTypeDownloadCategoryGamesString, trendTypeAppsSalesCategoryString, trendTypeGamesSalesCategoryString, trendTypeAppRevenueAppsString, trendTypeAppRevenueGamesString]);

         // Set trends label in UI
         $storeTrendsLabel.text(storeTrendsLabelString.format(storeTrendsCurrentMonth, $(this).find(optionSelectedString).text()));

      });

      // Default selected region to world.
      $selectRegion.val(worldString).change();
   };

   // Kendo fields formatting 
   var storeKendoFieldsFormatting = function (jsondata) {
      var storeKendoData = [];
      var gamerObj = undefined;
      var monthRegeEx = /(\w+)\s(\d{4})/;
      var categoryRegEx = /[ .<=>+&-0123456789]/g;
      var spaceString = " ";

      // Replacing special and numeric (kendo fields won't accept numeric as a starting character) characters
      var replaceCharacters =
         {
            ' ': 'SP',
            '.': 'DOT',
            '<': 'LT',
            '=': 'EQ',
            '>': 'GT',
            '+': 'PLUS',
            '&': 'AND',
            '-': 'DASH',
            '(': 'OPPAREN',
            ')': 'CLPAREN',
            '/': 'SLASH',
            '0': 'ZERO',
            '1': 'ONE',
            '2': 'TWO',
            '3': 'THREE',
            '4': 'FOUR',
            '5': 'FIVE',
            '6': 'SIX',
            '7': 'SEVEN',
            '8': 'EIGHT',
            '9': 'NINE'
         };

      // Loop through jsondata for kendo UI graph format
      for (var i = 0, jsonlen = jsondata.length; i < jsonlen; i++) {
         // Gamerdata - Monthly data
         for (var month in jsondata[i]) {
            // Checking for month 
            if (month !== emptyString && month !== undefined) {
               // Initialize gamerObj
               gamerObj = {};

               // Localize calendar month [Jan 2015]
               gamerObj[monthString] = month.replace(monthRegeEx, cultureJSONData[currentLocale][month.split(spaceString)[0]]);

               // Replace special characters and numerics for kendo ui fields
               // Percentage is fixed to 2 decimal places
               // Monthly data for different categories 
               for (var category in jsondata[i][month]) {
                  // Checking for category 
                  if (category !== emptyString && category !== undefined) {
                     gamerObj[category.replace(categoryRegEx, function (s) {
                        return replaceCharacters[s];
                     })] = parseFloat((jsondata[i][month][category] * 100).toFixed(2));
                  }
               }

               // Push gamerObj to storeKendoData array
               storeKendoData.push(gamerObj);
            }
         }

         // Check for latest month, year and set it to UI
         // Set only once when UI is not updated
         if (storeTrendsCurrentMonth === undefined) {
            // Set storeTrendsCurrentMonth
            storeTrendsCurrentMonth = gamerObj[monthString];
         }
      }

      // return storeKendoData
      return storeKendoData;
   };


   /// Set timeout to create charts without blocking UI
   var setCreateChartTimer = function (trends) {
      // Call create chart function
      createKendoGraphChart(trends[chartIndex++]);

      // Loop through other chart create functions
      if (chartIndex < trends.length) {
         // Setting timeout to 10ms, as browsers clamp timeouts and intervals to different timeouts
         setTimeout(setCreateChartTimer.bind(window, trends), 10);
      }
   };


   /// Create Kendo charts
   var createKendoGraphChart = function (trendtype) {
      // OS Install base - All users / Gamers / Phone chart binding.
      // Region specific data binding to kendo graph [All/Gamers]
      for (var charttype in storeJSONData[trendtype][selectedRegion]) {
         // Check before using trendData
         if (storeJSONData[trendtype][selectedRegion].hasOwnProperty([charttype])) {
            // Set trendData with kendo formatting
            trendData = storeKendoFieldsFormatting(storeJSONData[trendtype][selectedRegion][charttype]);

            // Set default chart height to short
            chartHeight = chartShortHeight;

            // Switch case
            switch (trendtype) {
               case trendTypeDownloadCategoryAppsString:
               case trendTypeAppsSalesCategoryString:
                  seriesChartObject = chartFieldsArray[trendTypeDownloadCategoryAppsString];
                  //chartHeight = chartLongHeight;
                  break;
               case trendTypeDownloadCategoryGamesString:
               case trendTypeGamesSalesCategoryString:
                  seriesChartObject = chartFieldsArray[trendTypeDownloadCategoryGamesString];
                  //chartHeight = chartLongHeight;
                  break;
               case trendTypeAppRevenueAppsString:
               case trendTypeAppRevenueGamesString:
                  seriesChartObject = chartFieldsArray[trendTypeAppRevenueAppsString];
                  break;
               case trendTypeOsInstallBaseString:
                  // No break statement as we need seriesChartObject to be set
                  chartHeight = chartLongHeight;  
               default:
                  // Field array specific to PC/Phone - checking for phone in charttype to use corresponding object
                  seriesChartObject = (charttype.indexOf(phoneString) >= 0) ? chartFieldsArray[trendtype][phoneString] : chartFieldsArray[trendtype][pcString];
                  break;
            }

            // Set new colors
            var seriesColorsArray = [];
            switch (trendtype) {
               case trendTypeDownloadCategoryAppsString:
               case trendTypeAppsSalesCategoryString:
               case trendTypeDownloadCategoryGamesString:
               case trendTypeGamesSalesCategoryString:
                  seriesColorsArray = newColors;
                  break;
               case trendTypeAppRevenueAppsString:
               case trendTypeAppRevenueGamesString:
                  seriesColorsArray = twoTone;
                  break;
               default:
                  seriesColorsArray = newColorsReverse;
                  break;
            }

            // Data bind trends data to graph elements
            $(chartElementsObject[trendtype] + charttype).kendoChart(
               {
                  dataSource:
                  {
                     data: trendData
                  },
                  chartArea:
                  {
                     height: chartHeight
                  },
                  legend: chartLegendObject,
                  seriesDefaults: chartSeriesDefaultObject,
                  seriesColors: seriesColorsArray,
                  series: seriesChartObject,
                  valueAxis: chartValueAxisObject,
                  // LTR/RTL specific category axis direction
                  categoryAxis: storeRTLLocalesArray.indexOf(currentLocale) > -1 ? chartRTLCategoryAxisObject : chartCategoryAxisObject,
                  tooltip: chartTooltipObject
               });
         }
      }

   };

   /// Module to use kendo graph dependencies
   define([requireString], function (require) {

      require(kendoDependencyFilesArray, function () {

         // Document ready state handler
         $(document).ready(function () {
            // Process culture data and graph data
            processCultureData();
            processGraphData();

            // Handle radio buttons click event - Chart not fitting in available window
            // Resize chart to fit available window 
            $radioElements.on(clickString, function () {
               kendo.resize($(kchartString));
            });
         });

         // Resize chart on window resize
         $(window).resize(function () {
            kendo.resize($(kchartString));
         });
      });
   });


})();