import { fastify } from 'fastify'
import { AuthGitHub } from './routes/authGitHub.js'
import fastifyCors from '@fastify/cors'
import { CreateRepo } from './routes/createRepo.js'
import { GetRepos } from './routes/getRepos.js'
import { CreateTag } from './routes/createTag.js'
import { GetAllTags } from './routes/getAllTags.js'
import { RemoveTag } from './routes/removeTag.js'
import { FilterRepoByTag } from './routes/filterRepoByTag.js'
import { GetRepo } from './routes/getRepo.js'

const server = fastify()

server.register(fastifyCors, {
    origin: '*',
})

server.register(() => AuthGitHub(server))
server.register(() => CreateRepo(server))
server.register(() => GetRepos(server))
server.register(() => GetRepo(server))
server.register(() => CreateTag(server))
server.register(() => GetAllTags(server))
server.register(() => RemoveTag(server))
server.register(() => FilterRepoByTag(server))




server.listen({
    port: 3000,
}).then(() => console.log('server running 🚀'))
