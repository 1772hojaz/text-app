// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { usersClient } from './services/users/users.shared'
export type { Users, UsersData, UsersQuery, UsersPatch } from './services/users/users.shared'

import { userClient } from './services/user/user.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/user/user.shared'

import { messagesClient } from './services/messages/messages.shared'
export type {
  Messages,
  MessagesData,
  MessagesQuery,
  MessagesPatch
} from './services/messages/messages.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the text-app app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(messagesClient)
  client.configure(userClient)
  client.configure(usersClient)
  return client
}
