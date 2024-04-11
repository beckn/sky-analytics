import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  Input,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import CourseCard from "../components/CourseCard";
import Pagination from "../components/Pagination";
import { getallContent } from "../services/Apicall";
import SearchScreen from "./SearchScreen";
import { v4 as uuidv4 } from "uuid";
import FilterButton from "../components/FilterButton";
import axios from "axios";
const env = import.meta.env;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import uiConfig from "../services/config.json";
import { useTranslation } from "react-i18next";
import { MdFilterList } from "react-icons/md";
import onSearch from "../assets/apiJson/on_search.json";
import SubHeader from "../components/SubHeader";
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';

const Home = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [story, setStory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [transactionId, setTransactionId] = useState(uuidv4());
  const [states, setStates] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search...");
  const [items, setItems] = useState({});
  const [resContext, setResContext] = useState({});
  const [res, setRes] = useState([]);

  const location = useLocation();
  const state = location?.state;

  useEffect(() => {
    setLoading(true);
    searchResponse();
  }, []);

  const searchResponse = async () => {

    try{
    

    console.log({ env });
    let bodyData = {
      context: {
        domain: env?.VITE_DOMAIN,
        action: "search",
        version: "1.1.0",
        bap_id: env?.VITE_BAP_ID,
        bap_uri: env?.VITE_BAP_URI,
        // bpp_id: "apurva.dev.bpp",
        //bpp_uri: "https://bpp-dev.apurva.ai",
        transaction_id: transactionId,
        message_id: uuidv4(),
        timestamp: new Date().toISOString(),
      },
      message: {
        intent: {
      },
    }};

    if(state?.searchTxt)
    {
      bodyData['message']['intent']['item']= {
        "descriptor": {
            "name": state?.searchTxt
        }
    }
  }

    if(state?.location)
    {
      bodyData['message']['intent']['fulfillment'] =  {
        "stops": [
            {
                "location": {
                    "city": {
                      "name": state?.location
                    }
                }
            }
        ]
    }
    }

    if(state?.year)
    {
      bodyData['message']['intent']['tags'] =  [
        {
            "descriptor": {
                "name": "operation"
            },
            "value": state?.year
        }
    ]
    }

    let response = await getallContent(bodyData);
    setLoading(false);

    setItems(response?.responses[0]?.message?.catalog);
    setResContext(response?.responses[0]?.context);
    setRes(response?.responses);

    console.log(response);

    if (
      response &&
      response.data &&
      response.data[env?.VITE_DB_CACHE] &&
      Array.isArray(response.data[env?.VITE_DB_CACHE])
    ) {
      let arrayOfObjects = [];
      for (const providers of response.data[env?.VITE_DB_CACHE]) {
        let obj = {
          item_id: providers.item_id,
          title: providers.title ? providers.title : "",
          description: providers.description ? providers.description : "",
          provider_id: providers.provider_id,
          provider_name: providers.provider_name,
          bpp_id: providers.bpp_id,
          bpp_uri: providers.bpp_uri,
          icon: providers.icon ? providers.icon : "",
          image_url: providers.image_url ? providers.image_url : "",
          shortDescription: providers.short_desc ? providers.short_desc : "",
        };
        arrayOfObjects.push(obj);
      }

      console.log("arrayOfObjects", arrayOfObjects);
      setStory(arrayOfObjects);

      // Extracting states from the response
      const extractedStates = response.data[env?.VITE_DB_CACHE].map(
        (provider) => provider.state
      );
      let allStates = [];
      extractedStates.forEach((state) => {
        if (Array.isArray(state)) {
          allStates.push(state.join(","));
        } else {
          allStates.push(state);
        }
      });
      const uniqueStates = [...new Set(allStates.join(",").split(","))];
      const filteredStates = uniqueStates.filter(
        (state) => state && state !== "All"
      );
      setStates(filteredStates);
    } else {
      console.error("Invalid response format");
    }
  } catch (error) {
    console.error("Error performing search:", error);
  }
  };

  //Filter functionality
  useEffect(() => {
    if (selectedFilter) {
      handleFilter();
    }
  }, [selectedFilter]);

  const handleFilter = async () => {
    console.log("Inside filter function");
    try {
      let apiUrl = "";
      if (selectedFilter === "All") {
        searchResponse();
      } else {
        // Encode the selected filter value
        const encodedFilter = encodeURIComponent(selectedFilter);
        apiUrl = `${baseUrl}/${env?.VITE_API_ROUTE}/FilterByState?state=${encodedFilter}`;
      }
      const response = await axios.get(apiUrl);
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data[env?.VITE_DB_CACHE]
      ) {
        setStory(response.data.data[env?.VITE_DB_CACHE]);
      } else {
        // Handle no data
      }
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  const handleResetSearch = () => {
    searchResponse();
  };

  //search functionality
  useEffect(() => {
    const results = story.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(results);
    setCurrentPage(1); // Reset current page when performing a new search
  }, [inputValue, story]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    setInputValue("");
  };

  // Pagination configuration
  const itemsPerPage = 6; // Change this according to your requirement
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filtered results based on search and pagination
  const filteredResults = inputValue.length > 0 ? searchResults : story;
  const visibleResults = filteredResults.slice(startIndex, endIndex);

  // transaction id
  console.log(`Home Page transaction id ${transactionId}`);

  // change placeholder based on filter value
  useEffect(() => {
    if (selectedFilter && selectedFilter !== "All") {
      setSearchPlaceholder(`You are Searching in ${selectedFilter}`);
    } else {
      setSearchPlaceholder(state?.searchTxt);
    }
  }, [selectedFilter]);

  return (
    <>
      <SubHeader title={t("SEARCH_RESULT")} cartItemCount={2} />
      {loading ? (<Loader />
      ) : (
      <Box p={4} marginBottom="60px" marginX={{ base: 4, md: 8, lg: 16 }}>
        {/* search bar */}
        <Flex alignItems="center">
          {uiConfig?.isSearch && (
            <InputGroup flex="1" mr={4}>
              <Input
                type="text"
                placeholder={searchPlaceholder}
                defaultValue={searchPlaceholder} // Set default value here
                readOnly
                value={inputValue}
               onChange={handleChange}
              />
              <InputRightElement onClick={handleClear} cursor="pointer">
                {inputValue ? (
                  <RxCrossCircled color="gray.300" />
                ) : (
                  <IoIosSearch color="gray.300" />
                )}
              </InputRightElement>
            </InputGroup>
          )}
          {uiConfig?.isAdvFilter && (
            <IconButton
              aria-label="Filter"
              icon={<MdFilterList />}
              onClick={() => setSelectedFilter("")}
              variant="ghost"
              fontSize="24px"
            />
          )}
        </Flex>

        {inputValue.length > 0 ? (
          <SearchScreen
            searchText={visibleResults}
            transactionId={transactionId}
          />
        ) : (
          <>
            {/* <Text fontSize="12px" fontWeight="400" lineHeight="18px" mt={4}>
              {t('PRICE_WILL_VARY')}
            </Text> */}
            <SimpleGrid columns={{ sm: 1, md: 1, lg: 1 }} spacing={4} pt={4}>
              {items?.providers?.map(
                (item, index) => (
                  <CourseCard
                    key={index}
                    item={item}
                    resContext={resContext}
                    transactionId={transactionId}
                  />
                )
              )}
            </SimpleGrid>

            {/* {!res?.length && items?.providers?.length === 0 && (
              <Box background={"#00b0881f"} textAlign={'center'} padding={5} width={'100%'}>{t("NO_data_available")}</Box>
            )} */}

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(items?.providers?.length / itemsPerPage)}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </Box>)}

      <Box mt={100}> <Footer /> </Box>
      
    </>
  );
};

export default Home;
