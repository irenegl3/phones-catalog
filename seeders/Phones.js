'use strict';
const { UniqueConstraintError } = require('sequelize');

module.exports = {
    up: async queryInterface => {
        try {
            await queryInterface.bulkInsert('Phones', [
                {
                    name: "iPhone 7",
                    manufacturer: "Apple",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    color: "black",
                    price: 350,
                    imageFileName: "iPhone_7.png",
                    screen: "4,7 inch IPS",
                    processor: "A10 Fusion",
                    ram: 2
                },
                {
                    name: 'iPhone 8',
                    manufacturer: 'Apple',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    color: "white",
                    price: 450,
                    imageFileName: "iPhone_8.png",
                    screen: "4,7 inch IPS",
                    processor: "A11 Bionic",
                    ram: 2
                },
                {
                    name: 'iPhone X',
                    manufacturer: 'Apple',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    color: "grey",
                    price: 500,
                    imageFileName: "iPhone_X.png",
                    screen: "5,8 inch IPS",
                    processor: "A11 Bionic",
                    ram: 3
                },
                {
                    name: 'iPhone 12',
                    manufacturer: 'Apple',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    color: "black",
                    price: 1000,
                    imageFileName: "iPhone_12.png",
                    screen: "6,1 inch IPS",
                    processor: "A14 Bionic",
                    ram: 4
                },
                {
                    name: 'Redmi K30S',
                    manufacturer: 'Xiaomi',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    color: "black",
                    price: 600,
                    imageFileName: "Redmi_k30s.png",
                    screen: "6,67 inch IPS",
                    processor: "Snapdragon 865",
                    ram: 8
                },
                {
                    name: 'Redmi 9 AT',
                    manufacturer: 'Xiaomi',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    color: "grey",
                    price: 127,
                    imageFileName: "Redmi_9_AT.png",
                    screen: "6,53 inch IPS",
                    processor: "MediaTek Helio G25",
                    ram: 2
                },
                {
                    name: 'Redmi 9',
                    manufacturer: 'Xiaomi',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    color: "white",
                    price: 130,
                    imageFileName: "Redmi_9.png",
                    screen: "6,53 inch IPS",
                    processor: "Mediatek Helio G80 ",
                    ram: 3
                }
            ]);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                console.warn('Phones already exist.');
            } else {
                console.error(error);
            }
        }
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Phones', null, {});
    }
};
