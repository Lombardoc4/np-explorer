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

    description: { type: "string" },
    designation: { type: "string" },
    directionsInfo: { type: "string" },
    directionsUrl: { type: "string" },

    fullName: { type: "string" },
    // id: { type: "string" },

    latLong: { type: "string" },
    name: { type: "string" },

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
    // await connect();

    // const repo = client.fetchRepository(parkSchema)
    // const parks = await repo.search().returnAll();
    const parks = [];

    if (parks.length === 0) {
        fetch(`https://developer.nps.gov/api/v1/parks?limit=500&api_key=${apiKey}`)
        .then(response => response.json())
        .then((data: any) => {
            console.log('data', data);
            // data.data.forEach((park: any) => {
            //     // console.log('park', park);
            //     createPark(park);
            // });

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
