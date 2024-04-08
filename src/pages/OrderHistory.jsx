import React, { useState } from "react";
import { Box, Text, Heading, Flex } from "@chakra-ui/react";
import SubHeader from "../components/SubHeader";
import { useTranslation } from "react-i18next";
import onConfirm from "../assets/apiJson/on_confirm.json";

const OrderHistory = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState(onConfirm.message.order);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const suffix = (day) => {
      if (day === 1 || day === 21 || day === 31) return "st";
      if (day === 2 || day === 22) return "nd";
      if (day === 3 || day === 23) return "rd";
      return "th";
    };

    return `${day}${suffix(day)} ${month} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'pm' : 'am'}`;
  };

  return (
    <Box>
      <SubHeader title={t("Order History")} cartItemCount={2} />
      <Box maxWidth="1200px" mx="auto" px={4}>
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
            <Heading as="h2" size="md" mb={3} fontSize={15} fontWeight={600}>
              {item.descriptor.name}{" "}
            </Heading>
            <Flex direction="column">
              <Text fontSize={12} fontWeight={400} mb={2}>
                {t("PROVIDED_BY")}: {items.provider.descriptor.name}
              </Text>
              <Text fontSize={12} fontWeight={400} mb={2}>
                {item.descriptor.short_desc}
              </Text>
              <Text fontSize={12} fontWeight={400}>
                {t("Placed at")} {formatDate(items.fulfillments[0].state.updated_at)}
              </Text>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OrderHistory;
