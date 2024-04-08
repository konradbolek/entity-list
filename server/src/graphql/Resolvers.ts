import fs from "fs";
import path from "path";

/**
 * Create path and datastore in json file 
*/
const absolutePath = path.resolve('src/mockData', 'dataset.json');
const entities = JSON.parse(fs.readFileSync(absolutePath, "utf8"));

/**
 * Entity with resolveType, Queries and mutations
*/
const resolvers = {
  Entity: {
    __resolveType(entity) {
      if (entity.email) {
        return 'Contact';
      }
      if (entity.industry) {
        return 'Company';
      }
      return null;
    }
  },
  Query: {
    getEntities: () => entities,
    getEntity: (_: never, args: any) => {
      return entities.find((entity) => entity.id === +args.id);
    }
  },
  Mutation: {
    createEntity: (_: never, args: any) => {
      const newEntity: any = {
        id: entities.length + 1,
        name: args.input.name,
      };
      if (args.input.entityType === "COMPANY") {
        Object.assign(newEntity, {
          industry: args.input.industry,
          contactEmail: args.input.contactEmail,
        });
      } else {
        Object.assign(newEntity, {
          email: args.input.email,
          phone: args.input.phone,
        });
      }
      entities.push(newEntity);
      fs.writeFile(absolutePath, JSON.stringify(entities), (err) => {
        if (err) {
          console.error(err);
        }
      });
      return newEntity;
    },
    updateEntity: (_: never, args: any) => {
      const entityIndex = entities.findIndex(entity => entity.id == args.input.id);
      entities[entityIndex].name = args.input.name;
      if (args.input.entityType === "COMPANY") {
        entities[entityIndex].email = "";
        entities[entityIndex].phone = "";
        entities[entityIndex].contactEmail = args.input?.contactEmail;
        entities[entityIndex].industry = args.input?.industry;
      } else {
        entities[entityIndex].email = args.input?.email;
        entities[entityIndex].phone = args.input?.phone;
        entities[entityIndex].contactEmail = "";
        entities[entityIndex].industry = "";
      }
      fs.writeFile(absolutePath, JSON.stringify(entities), (err) => {
        if (err) {
          console.error(err);
        }
      });
      return entities[entityIndex];
    }
  }
}

export default resolvers;
