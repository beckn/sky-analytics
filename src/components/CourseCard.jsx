import React from "react";
import { Box, Flex, Image, Text, Icon, Link } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

const CourseCard = ({ item, resContext }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const goToDetailPage = (item) => {
    navigate("/details", {
        state: { item: item, resContext: resContext },
    });
  }

  return (
    <Box
      onClick={() => goToDetailPage(item)}
      display="flex"
      alignItems="center"
      
      borderRadius="10px"
      boxShadow="0px 20px 25px 0px rgba(0, 0, 0, 0.1), 0px 8px 10px 0px rgba(0, 0, 0, 0.1)"
     // backgroundColor="#ffffff"
      marginBottom="20px"
      backgroundColor={'#F6F6F6'}
    >
      <Box >
      <Image
        flex="1"
        maxWidth="100px"
        height="100px"
        src={item.descriptor.images[0]?.url || "path/to/dummy-image.jpg"}
        alt={item?.items[0]?.descriptor.name}
        borderRadius="10px"
        marginRight="25px"
        marginLeft="25px"
        objectFit="contain" 
        // padding="20px"
      />
      </Box>
      <Flex flex="2" flexDirection="column" padding="20px" backgroundColor="#ffffff" >
        <Text
          fontSize="15px"
          fontWeight="600"
          lineHeight="22.5px"
          textAlign="left"
          marginBottom="10px"
        >
          {item?.items[0]?.descriptor.name}
        </Text>
        <Text
          fontSize="12px"
          fontWeight="400"
          lineHeight="18px"
          marginBottom="10px"
          dangerouslySetInnerHTML={{ __html: item.descriptor.short_desc }}
        />
        <Text
          fontSize="12px"
          marginBottom="10px"
          fontWeight="600"
          lineHeight="18px"
        >
          {t('PROVIDED_BY')}: {item.descriptor.name}
        </Text>
        <Flex alignItems="center" justifyContent="space-between" marginBottom="10px">
          <Text
            fontSize="12px"
            fontWeight="400"
            lineHeight="18px"
            marginRight="10px"
          >
           {t('LICENSE')}  {item?.tags[0]?.list[0]?.value} | {item?.tags[0]?.list[1]?.value} {t('YEARS_IN_OPERATION')}
          </Text>
          <Flex alignItems="center">
            <Icon as={FaStar} color="yellow.400" />
            <Text fontSize="12px" fontWeight="400" lineHeight="18px" marginLeft="5px">
              {item.rating || "4.5"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CourseCard;
