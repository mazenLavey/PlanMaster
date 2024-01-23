export const FIREBASE_USER_REF = "users/";


export const AUTH_ERROR_CODES = {
    INVALID_CRENDENTIAL: 'auth/invalid-credential',
    EMAIL_ALREADY_EXISTS: 'auth/email-already-exists',
    TOO_MANY_REQUESTS: 'auth/too-many-requests',
    INTERNAL_ERROR: 'auth/internal-error',
};

export const AUTH_ERROR_MESSAGES = {
[AUTH_ERROR_CODES.INVALID_CRENDENTIAL]: 'Invalid email or password.',
[AUTH_ERROR_CODES.EMAIL_ALREADY_EXISTS]: 'This email is already in use.',
[AUTH_ERROR_CODES.TOO_MANY_REQUESTS]: 'The number of requests exceeds the maximum allowed.',
[AUTH_ERROR_CODES.INTERNAL_ERROR]: 'Server issue. Refresh the page.',
};