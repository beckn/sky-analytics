import React from 'react';
import { useState } from "react";
import { Box, Button, Icon, Card, Input, Text, Image, VStack, Flex, HStack, Checkbox, FormControl, Center, } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import dataList from '../assets/apiJson/checkoutForm.json';
import { header, buttonCss } from "../styles/branding";
import { useNavigate } from 'react-router-dom';
import successImg from '../assets/images/SuccessMessage.png'
import  Footer from '../components/Footer';

const SuccessPayment = (item, items) => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();

  const goToHome = () => {

    navigate("/search",);
}

  return (
    <>
      <VStack mt={15} mb={20} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
        <Image
          height={{ base: '170px', md: '170px' }}
          width={{ base: '192px', md: '192px' }}
          src={successImg}
          mb={10}
        />

        <Text fontSize={24} color="#23262F" fontWeight={600}> {t('ORDER_CONFIRMED')} </Text>
        <Text fontSize={16} color="#353945" fontWeight={400}> {t('SENT_YOUR_DATA_REPORT')} </Text>
        <Text fontSize={16} color="#353945" fontWeight={600}> jondeo@gmail.com </Text>

        <Button mt={5} type="submit" onClick={goToHome} width='20rem' variant="solid" background={buttonCss?.primaryBtnColor} color={buttonCss?.primaryTxtColor} _hover={{ bg: buttonCss?.primaryBtnHoverColor }}>
        {t('GO_BACK_HOME')}
      </Button>
      </VStack>
      <Box mt={100}> <Footer /> </Box>

      </>
  );
};

export default SuccessPayment;
