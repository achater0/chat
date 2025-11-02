import { Type, Static } from "@sinclair/typebox"

export const signupBodySchema = Type.Object({
  username: Type.String({
    minLength: 5,
    maxLength: 15,
    pattern: "^[a-zA-Z0-9_-]+$",
  }),
  email: Type.String({
    format: "email",
    maxLength: 50,
  }),
  password: Type.String({
    minLength: 8,
    maxLength: 50,
  }),
}, {
  additionalProperties: false,
})

export type SignupBody = Static<typeof signupBodySchema>;

export const loginBodySchema = Type.Object({
  username: Type.String({
    pattern: "^[a-zA-Z0-9_-]+$",
  }),
  password: Type.String(),
}, {
  additionalProperties: false,
})

export type LoginBody = Static<typeof loginBodySchema>

export const twoFactorBodySchema = Type.Object({
  code: Type.String(),
}, {
  additionalProperties: false,
})

export type TwoFactorBody = Static<typeof twoFactorBodySchema>

export const signupSuccessResponseSchema = Type.Object({
  success: Type.Literal(true),
  message: Type.String(),
  data: Type.Object({
    userId: Type.Number(),
  }),
});

export type SignupSuccesResponse = Static<typeof signupSuccessResponseSchema>

export const loginSuccessResponseSchema = Type.Object({
  success: Type.Literal(true),
  message: Type.String(),
  data: Type.Object({
    requiresTwoFactor: Type.Boolean(),
  }),
});

export type LoginSuccesResponse = Static<typeof loginSuccessResponseSchema>

export const twoFactorSuccessResponseSchema = Type.Object({
  success: Type.Literal(true),
  message: Type.String(),
  data: Type.Object({
    user: Type.Object({
      id: Type.Number(),
      email: Type.String(),
      username: Type.String(),
    }),
  }),
});

export type TwoFactorSuccesResponse = Static<typeof twoFactorSuccessResponseSchema>

export const errorResponseSchema = Type.Object({
  success: Type.Literal(false),
  error: Type.String(),
});

export type ErrorResponse = Static<typeof errorResponseSchema>

export const signupSchema = {
  schema: {
    body: signupBodySchema,
    response: {
      201: signupSuccessResponseSchema,
      400: errorResponseSchema,
      500: errorResponseSchema,
    },
  }
}

export const loginSchema = {
  schema: {
    body: loginBodySchema,
    response: {
      200: loginSuccessResponseSchema,
      401: errorResponseSchema,
      500: errorResponseSchema,
    },
  }
}

export const twoFactorSchema = {
  schema: {
    body: twoFactorBodySchema,
    response: {
      200: twoFactorSuccessResponseSchema,
      401: errorResponseSchema,
      500: errorResponseSchema,
    },
  }
}