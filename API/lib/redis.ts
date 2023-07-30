import { Client, Entity, Schema } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        // console.log('connecting', process.env.REDIS_URL)
        await client.open(process.env.REDIS_URL);
    }
}

class apiKey extends Entity {}
let apiKeySchema = new Schema(
    apiKey,
    {
        key: {type: 'string'},
    },
    {
        dataStructure: 'JSON'
    }
);

export async function checkApiKey(q: string) {
    await connect();
    
    const repo = client.fetchRepository(apiKeySchema)
    const key = await repo.search()
        .where('key').equals(q)
        .returnFirst();
    
    return Boolean(key);
}
    

class Park extends Entity {}
let parkSchema = new Schema(
    Park,
    {
        activities: [
            {
                id: { type: "string" },
                name: { type: "string" },
            },
        ],
        addresses: [
            {
                line1: { type: "string" },
                // line2: { type: "string" },
                // line3: { type: "string" },
                city: { type: "string" },
                stateCode: { type: "string" },
                countryCode: { type: "string" },
                // provinceTerritoryCode: { type: "string" },
                postalCode: { type: "string" },
                type: { type: "string" },
            },
        ],
        contacts: {
            phoneNumbers: [
                {
                    phoneNumber: { type: "string" },
                    type: { type: "string" },
                },
            ],
            emailAddresses: [
                {
                    emailAddress: { type: "string" },
                },
            ],
    },
    description: { type: "string" },
    designation: { type: "string" },
    directionsInfo: { type: "string" },
    directionsUrl: { type: "string" },
    entranceFees: [
        {
            cost: { type: "number" },
            description: { type: "string" },
            title: { type: "string" },
        },
    ],
    entrancePasses: [
        {
            cost: { type: "number" },
            description: { type: "string" },
            title: { type: "string" },
        },
    ],
    fullName: { type: "string" },
    // id: { type: "string" },
    images: [
        {
            credit: { type: "string" },
            altText: { type: "string" },
            title: { type: "string" },
            id: { type: "number" },
            caption: { type: "string" },
            url: { type: "string" },
        },
    ],
    latLong: { type: "string" },
    name: { type: "string" },
    operatingHours: [
        {
            name: { type: "string" },
            description: { type: "string" },
            standardHours: [
                {
                    sunday: { type: "string" },
                    monday: { type: "string" },
                    tuesday: { type: "string" },
                    wednesday: { type: "string" },
                    thursday: { type: "string" },
                    friday: { type: "string" },
                    saturday: { type: "string" },
                },
            ],
            exceptions: [
                {
                    name: { type: "string" },
                    startDate: { type: "string" },
                    endDate: { type: "string" },
                    exceptionHours: [
                        {
                            sunday: { type: "string" },
                            monday: { type: "string" },
                            tuesday: { type: "string" },
                            wednesday: { type: "string" },
                            thursday: { type: "string" },
                            friday: { type: "string" },
                            saturday: { type: "string" },
                        },
                    ],
                },
            ],
        },
    ],
    parkCode: { type: "string" },
    states: { type: "string" },
    url: { type: "string" },
    weatherInfo: { type: "string" },
    },
    {
        dataStructure: 'JSON'
    }
);

export async function createPark(data: any) {
    await connect();
    
    const repo = client.fetchRepository(parkSchema)
    const park = repo.createEntity(data);
    const id = await repo.save(park);
    
    return id;
}

export async function getAllParks(apiKey: string) {
    await connect();
    
    const repo = client.fetchRepository(parkSchema)
    const parks = await repo.search().returnAll();
    
    if (parks.length === 0) {
        fetch(`https://developer.nps.gov/api/v1/parks?limit=500&api_key=${apiKey}`)
        .then(response => response.json())
        .then((data: any) => {
            // console.log('data', data);
            data.data.forEach((park: any) => {
                // console.log('park', park);
                createPark(park);
            });
            
            return data;
        })
    }
        
    return parks;
}

export async function createIndex() {
    await connect();
    const apiKeyRepo = client.fetchRepository(apiKeySchema);
    const parkRepo = client.fetchRepository(parkSchema);
    
    await apiKeyRepo.createIndex();
    await parkRepo.createIndex();
    
    console.log('index created');
}
