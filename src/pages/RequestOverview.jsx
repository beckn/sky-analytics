import React, { useState } from "react";
import { Box, Text, Heading, Flex, Button } from "@chakra-ui/react";
import SubHeader from "../components/SubHeader";
import { useTranslation } from "react-i18next";
import onConfirm from "../assets/apiJson/on_confirm.json";
import { buttonCss } from "../styles/branding";

const RequestOverview = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState(onConfirm.message.order);

  return (
    <Box>
      <SubHeader title={t("REQUEST_OVERVIEW")} cartItemCount={2} />
      <Box maxWidth="1200px" mx="auto" px={4}>
        <Text mt={9}>{t("REQUEST_OVERVIEW")}</Text>
        {items.items.map((item, index) => (
          <Box
            key={index}
            boxShadow="0px 20px 25px 0px rgba(0, 0, 0, 0.1), 0px 8px 10px 0px rgba(0, 0, 0, 0.1)"
            p={6}
            borderRadius="md"
            bg="white"
            width="100%"
            my={4}
            px={4}
          >
            <Heading as="h2" size="md" mb={2} fontSize={15} fontWeight={600}>
              {item.descriptor.name}{" "}
            </Heading>
            <Flex direction="column">
              <Text fontSize={12} fontWeight={400}>
                {t("PROVIDED_BY")}: {items.provider.descriptor.name}
              </Text>
            </Flex>
          </Box>
        ))}
        <Button
        mt={3}
          type="submit"
          //   onClick={Submit}
          width="20rem"
          variant="solid"
          background={buttonCss?.primaryBtnColor}
          color={buttonCss?.primaryTxtColor}
          _hover={{ bg: buttonCss?.primaryBtnHoverColor }}
        >
          {t("SEND_REQUEST")}
        </Button>
      </Box>
    </Box>
  );
};

export default RequestOverview;
