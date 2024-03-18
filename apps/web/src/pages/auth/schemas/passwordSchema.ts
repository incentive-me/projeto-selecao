import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  .regex(/[a-z]/, {
    message: 'A senha deve conter pelo menos uma letra minúscula.',
  })
  .regex(/[A-Z]/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula.',
  })
  .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número.' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'A senha deve conter pelo menos um caractere especial.',
  });
