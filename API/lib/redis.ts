import { Client, Entity, Schema } from 'redis-om';
import bcrypt from 'bcrypt';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        console.log('connecting', process.env.REDIS_URL)
        await client.open(process.env.REDIS_URL);
    }
}

class apiKey extends Entity {}
let apiKeySchema = new Schema(
    apiKey,
    {
        email: {type: 'string'},
        key: {type: 'string'},
        active: {type: 'boolean'},
        dateCreated: {type: 'string'},
    },
    {
        dataStructure: 'JSON'
    }
);

export async function checkApiKey(q: string) {
    
    console.log('check api key', q)
    await connect();
    
    const hash = await bcrypt.hash(q, 10)
    const repo = client.fetchRepository(apiKeySchema)
    const key = await repo.search()
        .where('key').equals(hash)
        .returnFirst();
    
    return key;
    
}
    

class Park extends Entity {}
let parkSchema = new Schema(
    Park,
    {
        states: {type: 'string'},
        name: {type: 'string'},
        parkCode: {type: 'string'},
        fullName: {type: 'string'},
        designation: {type: 'string'}
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

export async function createIndex() {
    await connect();
    const apiKeyRepo = client.fetchRepository(apiKeySchema);
    const parkRepo = client.fetchRepository(parkSchema);
    
    await apiKeyRepo.createIndex();
    await parkRepo.createIndex();
    
    console.log('index created');
}
