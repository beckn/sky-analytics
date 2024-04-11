import React from 'react';
import { useState } from "react";
import { Box, Button, Icon, Card, Input, Text, Image, VStack, Flex, HStack, Checkbox, FormControl, FormLabel, Radio, Stack } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import dataList from '../assets/apiJson/checkoutForm.json';
import { useNavigate } from 'react-router-dom';
import { header, buttonCss } from "../styles/branding";

const SubDetail = (item, items) => {
    const { t } = useTranslation();
    const location = useLocation();
    const state = location?.state;
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedFulfillment, setSelectedFulfillment] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState('one Time');


    const handleRadioChange = (id, type) => {
        console.log('dataShare', id);
        localStorage.setItem('dataShare', JSON.stringify({ 'id': id, 'type': type }))
        setSelectedFulfillment(type);
    };

    const handleDurationChange = (tagName, option) => {
        // console.log('sub', event.target.value);
        // localStorage.setItem('sub', event.target.value)
        // setSelectedDuration(event.target.value);

        const tagIndex = selectedTags.findIndex(tag => tag.descriptor.name === tagName);
        if (tagIndex !== -1) {
            const newTags = [...selectedTags];
            const optionIndex = newTags[tagIndex].list.findIndex(item => item.value === option);
                           newTags[tagIndex].list[0]= { value: option };

            setSelectedTags(newTags);
        } else {
            setSelectedTags([...selectedTags, {
                descriptor: {
                    name: tagName
                },
                list: [{ value: option }]
            }]);
        }
        console.log(localStorage.setItem('selectedData', JSON.stringify(selectedTags)));

    };

    const handleCheckboxChange = async (tagName, option) => {
        const tagIndex = selectedTags.findIndex(tag => tag.descriptor.name === tagName);
        if (tagIndex !== -1) {
            const newTags = [...selectedTags];
            const optionIndex = newTags[tagIndex].list.findIndex(item => item.value === option);
            if (optionIndex !== -1) {
                newTags[tagIndex].list.splice(optionIndex, 1);
                if (newTags[tagIndex].list.length === 0) {
                    newTags.splice(tagIndex, 1);
                }
            } else {
                newTags[tagIndex].list.push({ value: option });
            }
            setSelectedTags(newTags);
        } else {
            setSelectedTags([...selectedTags, {
                descriptor: {
                    name: tagName
                },
                list: [{ value: option }]
            }]);
        }

        console.log(localStorage.setItem('selectedData', JSON.stringify(selectedTags)));
    };

    return (
        <>
            <Card mt={5} p={5} borderRadius="12px" border="1px solid rgba(191, 191, 191, 1)">
                <Box>
                    <Text fontSize={12} fontWeight={600}>{t('ABOUT')} {state?.item?.descriptor?.name}</Text>
                    <Text fontSize={12} mt={1}>{state?.item?.descriptor?.short_desc}</Text>
                </Box>
                <Box mt={5}>
                    <Text fontSize={12}> {t('LICENSE')} {state?.item?.tags[0]?.list[0]?.value} | {state?.item?.tags[0]?.list[1]?.value} {t('YEARS_IN_OPERATION')} </Text>
                </Box>
            </Card>



            <Card mt={5} p={5} borderRadius="12px" border="1px solid rgba(191, 191, 191, 1)">
                {state?.item?.items[0]?.tags?.map((tag, index) => (
                    (tag.descriptor.name != 'Subscription duration' && tag.descriptor.name != 'Data formats' &&

                        <Box key={index} mb={8}>
                            <FormLabel fontSize={12} fontWeight={600}>{tag.descriptor.name}</FormLabel>
                            {tag.list.map((item, i) => (
                                <Checkbox fontSize={12} ml={5}
                                    key={i}
                                    isChecked={selectedTags.some(selectedTag => selectedTag.descriptor.name === tag.descriptor.name && selectedTag.list.some(selectedItem => selectedItem.value === item.value))}
                                    onChange={() => handleCheckboxChange(tag.descriptor.name, item.value)}
                                >
                                    <Text fontSize={12} mt={1}> {item.value}</Text>
                                </Checkbox>
                            ))}
                        </Box>

                    ))
                )}
            </Card>

            <Card mt={5} p={5} borderRadius="12px" border="1px solid rgba(191, 191, 191, 1)">
                <Flex direction="row" wrap="wrap">
                    {state?.item?.items[0]?.tags?.map((tag, index) => (
                        (tag.descriptor.name == 'Data formats' &&

                            <Box key={index} mb={8}>
                                <FormLabel fontSize={12} fontWeight={600}>{tag.descriptor.name}</FormLabel>
                                {tag.list.map((item, i) => (
                                    <Checkbox fontSize={12} ml={5}
                                        key={i}
                                        isChecked={selectedTags.some(selectedTag => selectedTag.descriptor.name === tag.descriptor.name && selectedTag.list.some(selectedItem => selectedItem.value === item.value))}
                                        onChange={() => handleCheckboxChange(tag.descriptor.name, item.value)}
                                    >
                                        <Text fontSize={12} mt={1}> {item.value}</Text>
                                    </Checkbox>
                                ))}
                            </Box>

                        ))
                    )}
                </Flex>
                <FormLabel fontSize={12} fontWeight={600}>Data sharing modes</FormLabel>

                <Flex direction="row" wrap="wrap">
                    {state?.item?.fulfillments?.map((fulfillment) => (
                        <Box key={fulfillment.id} mr={3} mb={3} fontSize={12} ml={5}>
                            <Radio
                                value={fulfillment.type}
                                isChecked={selectedFulfillment === fulfillment.type}
                                onChange={() => handleRadioChange(fulfillment.id, fulfillment.type)}
                            >
                                <Text fontSize={12} mt={1} > {fulfillment.type}</Text>
                            </Radio>
                        </Box>
                    ))}

                </Flex>
                <Flex direction="row" wrap="wrap">
                    {state?.item?.items[0]?.tags?.map((tag, index) => (
                        (tag.descriptor.name == 'Subscription duration' &&

                            <Box key={index} mb={8}>
                                <FormLabel fontSize={12} fontWeight={600}>{tag.descriptor.name} </FormLabel>
                                {tag.list.map((item, i) => (
                                    <Radio ml={5}
                                        key={i}
                                        value={item.value}
                                        // isChecked={selectedDuration === item.value}
                                        onChange={()=>{handleDurationChange(tag.descriptor.name, item.value)}}
                                    isChecked={selectedTags.some(selectedTag => selectedTag.descriptor.name === tag.descriptor.name && selectedTag.list.some(selectedItem => selectedItem.value === item.value))}
                                    >
                                        <Text fontSize={12} mt={1} > {item.value}</Text>
                                    </Radio>
                                ))}
                            </Box>

                        ))
                    )}
                </Flex>

            </Card>


        </>
    );
};

export default SubDetail;
