import React from 'react';
import { Box, Flex, IconButton, Badge, Text, Icon } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { header, buttonCss } from "../styles/branding";

const SubHeader = ({ title, cartItemCount, back = true }) => {
    const navigate = useNavigate();

    const confirmData = localStorage.getItem('confirmData');

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleCartClick = () => {
        navigate('/orderhistory');  // Redirect to the '/orderhistory' page
    };

    return (
        <Box boxShadow="md" zIndex="sticky" width="100%">
            <Flex align="center" justify="space-between">
                {/* Back button */}
                {back && (
                    <IconButton
                        aria-label="Go back"
                        icon={<ChevronLeftIcon />}
                        fontSize={30}
                        variant="ghost"
                        onClick={handleGoBack}
                    />
                )}

                {/* Title */}
                <Text fontSize="lg" fontWeight="bold">{title}</Text>

                {/* Cart icon with badge */}
                <Box 
                    position="relative" 
                    mr={5} 
                    onClick={handleCartClick}
                    cursor="pointer"  // Add cursor style here
                >
                    <Icon as={FiShoppingCart} boxSize="20px" />
                    {confirmData && (
                        <Badge
                            position="absolute"
                            borderRadius="full"
                            px="1"
                            background={buttonCss?.primaryBtnColor}
                            top="-9px"
                            right="-8px"
                        >
                            {'2'}
                        </Badge>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default SubHeader;
