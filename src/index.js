// Importing database functions. DO NOT MODIFY THIS LINE.
console.log("hello");

import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
    try {
        const returnedValue = await central(id);

        const dbs = {
            db1: db1,
            db2: db2,
            db3: db3,
        };
        // the central function returns db (info that matches a key in dbs), its value (a function name) is stored in db variable
        const db = dbs[returnedValue];
        // now the appropriate function is called with the if argument to get work or personal data which is stored in the corresponding variables
        const workData = await db(id);
        const personalData = await vault(id);
        // the userdata object is populated with the appropriate properties from either work or personal objects
        let userdata = {
            id: id,
            name: personalData.name,
            username: workData.username,
            website: workData.website,
            email: personalData.email,
            address: {
                street: personalData.address.street,
                suite: personalData.address.suite,
                city: personalData.address.city,
                zipcode: personalData.address.zipcode,
                geo: {
                    lat: personalData.address.geo.lat,
                    lng: personalData.address.geo.lng,
                },
            },
            company: {
                name: workData.company.name,
                catchPhrase: workData.company.catchPhrase,
                bs: workData.company.bs,
            },
        };
        let userInfo = console.log(userdata);
        return userInfo;
    } catch (e) {
        console.log(e);
    }
}

getUserData(0);
