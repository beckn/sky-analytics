import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
 import logo from "../assets/images/logo.png";
import config from '../services/config.json';
import { useTranslation } from "react-i18next";
import { header, buttonCss } from "../styles/branding";
import appConfig from '../assets/ui-config/homeConfig.json';


function Header() {
  const { t } = useTranslation();

  return (
    <Box>
      <Flex
        bg={header?.headerContent?.headerBgColor}
        w="100%"
        p={6}
        height={15}
        alignItems="center"
        boxShadow="md"
        position="fixed"
        fontFamily="system-ui"
        justifyContent="space-between"
        zIndex={999} 
      >
        {/* Left-hand side */}
        <Flex alignItems="center">
          {appConfig?.isLogoInHeader && 
          <Image
            src={header?.headerContent?.logoSrc}
            alt="Forum Logo"
            marginRight="2"
            boxSize="60px" 
          />}
          <Text
            fontSize={20}
            fontWeight={600}
            color={header?.headerContent?.appTitleColor}

          >
            {header?.headerContent?.title1}
          </Text>
        </Flex>

        {/* Right-hand side */}
     
      </Flex>
      {/* Add padding to the top to prevent content from being hidden */}
      <Box paddingTop='4rem' /> 
    </Box>
  );
}

export default Header;
