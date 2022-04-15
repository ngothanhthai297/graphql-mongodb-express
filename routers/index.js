
const router = require('express').Router()
const notificationRouter = require('./Notification')
const Notification = require('../models/Notification_Model');
const Author_Model = require('../models/Author_Model');
const authorRouter = require('./Author');
const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');
const Notification_Model = require('../models/Notification_Model');
const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLID } = graphql;
const _ = require('lodash');


const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        noti_id: { type: GraphQLString },
        notification: {
            type: NotificationType,
            resolve(parent, args) {
                return Notification_Model.findById(parent.noti_id)
            }
        }
    })
})
const NotificationType = new GraphQLObjectType({
    name: "Notification",
    fields: () => ({
        id: { type: GraphQLID },
        address: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        images: { type: GraphQLString },
        type: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllAuthor: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                try {
                    return Author_Model.find({});
                } catch (error) {
                    return error;
                }
            }
        },
        getAuthorById: {
            type: new GraphQLList(AuthorType),
            args: { noti_id: { type: GraphQLString } },
            resolve(parent, args) {
                let err = Author_Model.find({ noti_id: args.noti_id });
                return err;
            }
        },
        getAllAuthorAndNotification: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author_Model.find({});
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createNotification: {
            type: NotificationType,
            args: {
                address: { type: GraphQLString },
                title: { type: GraphQLString },
                content: { type: GraphQLString },
                images: { type: GraphQLString },
                type: { type: GraphQLString },
                status: { type: GraphQLInt },
            },
            resolve(parent, args) {
                let notification = new Notification_Model({
                    address: args.address,
                    title: args.title,
                    content: args.content,
                    images: args.images,
                    type: args.type,
                    status: args.status,
                })
                notification.save();
                return args;
            }
        },
        createAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                noti_id: { type: GraphQLString },
            },
            resolve(parent, args) {
                let author = new Author_Model({
                    name: args.name,
                    age: args.age,
                    noti_id: args.noti_id,
                })
                author.save();
                return author;
            }
        },
    }
})
const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation })

router.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

/* router.use('/notification', notificationRouter)
router.use('/author', authorRouter); */
module.exports = router