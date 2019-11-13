import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { mutationField, stringArg } from 'nexus'

import { JWT_SECRET } from '../../utils/getUserId'

export const signup = mutationField('signup', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ nullable: false }),
    password: stringArg(),
    passwordConfirmation: stringArg(),
    authType: stringArg(),
    idToken: stringArg()
  },
  resolve: async (
    parent,
    { email, password, passwordConfirmation, authType, idToken },
    ctx
  ) => {
    var user

    if (!authType || authType == 'classic') {
      if (password !== passwordConfirmation) {
        throw new Error("'password' must match 'passwordConfirmation'")
      }
      const hashedPassword = await hash(password, 10)
      user = await ctx.photon.users.create({
        data: {
          email,
          password: hashedPassword
        }
      })
    } else {
      const hashedIdToken = await hash(idToken, 10)
      user = await ctx.photon.users.create({
        data: {
          email,
          authType,
          idToken: hashedIdToken
        }
      })
    }

    return {
      token: sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: 86400 * 7
      }),
      expiresIn: 86400 * 7,
      user
    }
  }
})

export const signin = mutationField('signin', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ nullable: false }),
    password: stringArg(),
    idToken: stringArg()
  },
  resolve: async (parent, { email, password, idToken }, ctx) => {
    const user = await ctx.photon.users.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }

    if (password) {
      const passwordValid = await compare(password, user.password)
      if (!passwordValid) {
        throw new Error('Invalid password')
      }
    } else if (idToken) {
      const idTokenValid = await compare(idToken, user.password)
      if (!idTokenValid) {
        throw new Error('Invalid ID token')
      }
    } else {
      throw new Error('Password or ID token must be specified')
    }

    return {
      token: sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: 86400 * 7
      }),
      expiresIn: 86400 * 7,
      user
    }
  }
})
