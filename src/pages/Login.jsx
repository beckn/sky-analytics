import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, Image, VStack, useTheme, HStack } from '@chakra-ui/react';
import { header, buttonCss } from "../styles/branding";
import { useTranslation } from "react-i18next";
import poweredBy from '../assets/images/poweredby.png';
import { useNavigate } from 'react-router-dom';
import SubHeader from "../components/SubHeader";


export default function Login() {
    const [username, setUsername] = useState('Jon');
    const [password, setPassword] = useState('1234');
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log({ username, password });
        navigate('/search')
        // Your login logic here
    };

    return (
        <>
        <HStack display="flex" justifyContent="center" height="100vh" mt={10}>
            <VStack textAlign="center" maxW="600px" width="100%" bg="white">
                <Image
                    height='153px'
                    width='333px'
                    src={header?.headerContent?.logoSrc}
                    alt="The house from the offer."
                />
                {/* <Text fontSize={50} fontWeight={700} color={header?.headerContent?.appTitleColor}>{header?.headerContent?.title1}</Text> */}
                <Text color='#564C4D' fontWeight={800} fontSize={17}>{header?.headerContent?.title2}</Text>
            </VStack>

            <Box maxW="500px" width="100%" bg="white" p={8} >
                {/* Application Title Section */}
                <Box mb={8} lineHeight="taller">
                    <Text fontSize="4xl" fontWeight="bold">
                        {t('WELCOME_BACK')}
                    </Text>
                    <Text fontSize="1xl">
                        {t('LET_MAKE_EASY')}
                    </Text>
                </Box>

                {/* Login Details Section */}
                <Box >
                    <form onSubmit={handleLogin} >
                        <VStack spacing={4} >
                            <FormControl>
                                {/* <FormLabel color="purple.500">Username</FormLabel> */}
                                {/* <Input
                                    variant="filled"
                                    id="outlined-username-input"
                                    type="text"
                                    autoComplete="current-username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                /> */}
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder={t('NAME')}
                                    fontSize={15}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    borderTop="none"
                                    borderLeft="none"
                                    borderRight="none"
                                    borderColor="gray.300"
                                />
                            </FormControl>
                            <FormControl marginTop={5}>
                                <Input
                                    id="password"
                                    type="password"
                                    fontSize={15}
                                    placeholder={t('PASSWORD')}
                                    autoComplete="current-password"
                                    value={password}
                                    borderTop="none"
                                    borderLeft="none"
                                    borderRight="none"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <Button marginTop={5} type="submit" variant="solid" width="100%" background={buttonCss?.primaryBtnColor} color={buttonCss?.primaryTxtColor} _hover={{ bg: buttonCss?.primaryBtnHoverColor }}>
                                {t('SIGN_IN')}
                            </Button>

                            {/* <Box display={'flex'}>
                                <Text>{t('DONT_HAVE_ACCOUNT')}</Text>
                                <Text color={buttonCss?.primaryBtnColor} ml={1}> {t('SIGN_UP')}</Text>
                            </Box> */}
                            <Box ml={60} my={4}>
                                <Image
                                    src={poweredBy}
                                    alt="Forum Logo"
                                />
                            </Box>

                        </VStack>
                    </form>
                </Box>
            </Box>
        </HStack>
        
        </>
    );
}
