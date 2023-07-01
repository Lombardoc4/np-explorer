import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class Park extends Entity {}
let schema = new Schema(
    Park,
    {
        states: String,
        name: String,
        parkCode: String,
        fullName: String,
        designation: String,
    },
    {
        dataStructure: 'JSON'
    }
);

export async function createPark(data) {
    await connect();
    
    const repo = new Repository(schema, client);
    const park = repo.createEntity(data);
    const id = await repo.save(park);
    
    return id;
}
