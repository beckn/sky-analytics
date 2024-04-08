import React, { useState } from "react";
import {
  Box,
  Image,
  Center,
  Input,
  InputGroup,
  Select,
  Button,
  VStack,
  HStack,
  Text, // Add missing import
  Card,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import SubHeader from "../components/SubHeader"; // Assuming correct path
import Footer from "../components/Footer"; // Assuming correct path
import { header, buttonCss } from "../styles/branding";
import onSearch from "../assets/apiJson/on_search.json";
import { MdOutlineLocationOn } from "react-icons/md";

const Search = () => {
  const { t } = useTranslation();
  const [searchTxt, setSearchTxt] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("1 years");
  const [items, setItems] = useState(onSearch);
  const navigate = useNavigate();

  const cityLocations = [
    "Balaganj",
    "Beanibazar",
    "Bishwanath",
    "Companiganj",
    "Fenchuganj",
    "Gopalganj",
    "Gowanighat",
    "Jaintiapur",
    "Kanaighat",
    "Sylhetsardar",
    "Zakiganj",
    "Dakshinsurma",
    "Osmaninagar",
  ];

  const searchData = async () => {
    console.log(searchTxt + " - " + year + " - " + location);
    navigate("/home", {
      state: { searchTxt: searchTxt, year: year, location: location },
    });
  };

  const goTodetailPage = (item) => {
    navigate("/details", {
      state: { item: item },
    });
  };

  return (
    <>
      <SubHeader cartItemCount={2} back={false} />
      <Box maxW="600px" mx="auto" p="20px">
        <Center mb="20px">
          <Image src={header?.headerContent?.logoSrc} alt="Logo" />
        </Center>
        <InputGroup mb="20px">
          <Input
            type="text"
            height="56px"
            autoComplete="searchTxt"
            value={searchTxt}
            placeholder={t("SEARCH_FOR")}
            onChange={(e) => setSearchTxt(e.target.value)}
            id="searchTxt"
            fontSize={15}
          />
        </InputGroup>
        <Select
          mb="20px"
          id="location"
          height="56px"
          autoComplete="location"
          value={location}
          placeholder={t("ENTER_LOCATION")}
          onChange={(e) => setLocation(e.target.value)}
        >
          {/* Placeholder option */}
          <option value="" disabled hidden>
            {t("ENTER_LOCATION")}
          </option>
          {cityLocations.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
        <Select
          defaultValue="1"
          mb="20px"
          id="year"
          height="56px"
          autoComplete="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {/* Generate options from 1 to 10 years */}
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1} year{index !== 0 && "s"}
            </option>
          ))}
        </Select>
        <Button
          width="full"
          onClick={searchData}
          type="submit"
          variant="solid"
          background={buttonCss?.primaryBtnColor}
          color={buttonCss?.primaryTxtColor}
        >
          {t("SEARCH")}
        </Button>
        <VStack justifyContent="flex-start" alignItems="flex-start">
          <Text mt={10} mb={2}>
            {t("FREQUESNTLY_BOUGHT")}
          </Text>

          <HStack
            justifyContent="flex-start"
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            {items?.message?.catalog?.providers.map((item, index) => (
              <Card
                background={"#F6F6F6"}
                display="flex"
                width={{ base: "full", md: "180px" }}
                height={234}
                direction="column"
                overflow="hidden"
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
                minHeight="270px"
                _hover={{ borderColor: "blue.400" }}
                cursor="pointer"
                boxShadow="7px 12px 0px rgba(0, 0, 0, 0.1)"
                mb={6}
                onClick={() => goTodetailPage(item)}
              >
                <VStack flex={1}>
                  <Box height="132px">
                    <Image
                      mt={5}
                      height="100px"
                      width="130px"
                      src={item?.descriptor?.images[0].url}
                      alt="The house from the offer."
                      objectFit="contain"
                    />
                  </Box>
                  <Box bg={"#FFF"} borderRadius="lg" height="132px">
                    <Box p={2}>
                      <Text
                        fontSize={15}
                        noOfLines={1}
                        fontWeight="bold"
                        mb={2}
                      >
                        {item?.items[0]?.descriptor?.name}
                      </Text>
                      <HStack>
                        <Text noOfLines={1} fontSize={12} mb={2}>
                          {" "}
                          {t("PROVIDED_BY")}: {item?.descriptor?.name}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontSize={12} noOfLines={1} mt={2} mb={2}>
                          {" "}
                          {item?.tags[0]?.list[1]?.value}{" "}
                          {t("YEARS_IN_OPERATION")}
                        </Text>
                        <HStack display="flex" alignItems="center">
                          <Icon as={FaStar} color="#F4B73F" />
                          <Box fontSize={12} ml={1}>
                            4.2
                          </Box>
                        </HStack>
                      </HStack>
                    </Box>
                  </Box>
                </VStack>
              </Card>
            ))}
          </HStack>
        </VStack>

        <Box mt={100}>
          {" "}
          <Footer />{" "}
        </Box>
      </Box>
    </>
  );
};

export default Search;
