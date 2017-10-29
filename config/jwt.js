module.exports = {

    /**
     * is a string, buffer, or object containing either the secret for HMAC algorithms
     * or the PEM encoded private key for RSA and ECDSA.
     * In case of a private key with passphrase an object { key, passphrase }
     * can be used (based on crypto documentation),
     * in this case be sure you pass the algorithm option
     */

    secret: "5876a8abf6b0d72e87185dc0521afce7b382730e",

    /**
     * expressed in seconds.
     * Eg: 600
     */

    expires: 99999999
}
