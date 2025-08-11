// import { LocaleObject } from '@nuxtjs/i18n';

export const errorMessages: Record<string, Record<string, string>> = {

    // === AUTHENTIFICATION ===
    AUTH_SUCCESS: {
        fr: "Authentification réussie",
        en: "Authentication successful",
    },
    INVALID_CREDENTIALS: {
        fr: "Identifiants incorrects",
        en: "Invalid credentials",
    },
    UNAUTHORIZED: {
        fr: "Accès non autorisé",
        en: "Unauthorized access",
    },
    INVALID_TOKEN: {
        fr: "Jeton invalide",
        en: "Invalid token",
    },
    TOKEN_EXPIRED: {
        fr: "Jeton expiré",
        en: "Token expired",
    },
    FORBIDDEN: {
        fr: "Action interdite",
        en: "Forbidden",
    },

    // === UTILISATEUR ===
    USER_NOT_FOUND: {
        fr: "Utilisateur introuvable",
        en: "User not found",
    },
    USER_INACTIVE: {
        fr: "Utilisateur inactif",
        en: "User inactive",
    },
    USER_ALREADY_EXISTS: {
        fr: "L'utilisateur existe déjà",
        en: "User already exists",
    },
    INVALID_USER_TYPE: {
        fr: "Type d'utilisateur invalide",
        en: "Invalid user type",
    },

    // === NUMÉRO / TÉLÉPHONE ===
    INVALID_PHONE_NUMBER: {
        fr: "Numéro de téléphone invalide",
        en: "Invalid phone number",
    },
    PHONE_ALREADY_REGISTERED: {
        fr: "Numéro déjà enregistré",
        en: "Phone already registered",
    },
    PHONE_NOT_REGISTERED: {
        fr: "Numéro non enregistré",
        en: "Phone not registered",
    },

    // === TRANSACTIONS / PORTEFEUILLE ===
    INSUFFICIENT_FUNDS: {
        fr: "Fonds insuffisants",
        en: "Insufficient funds",
    },
    CURRENCY_NOT_SUPPORTED: {
        fr: "Devise non prise en charge",
        en: "Currency not supported",
    },
    TRANSACTION_TIMEOUT: {
        fr: "Délai de la transaction dépassé",
        en: "Transaction timeout",
    },
    TRANSACTION_ALREADY_PROCESSED: {
        fr: "Transaction déjà traitée",
        en: "Transaction already processed",
    },
    TRANSACTION_AMOUNT_INVALID: {
        fr: "Montant de la transaction invalide",
        en: "Transaction amount invalid",
    },
    TRANSACTION_DUPLICATE: {
        fr: "Transaction en double",
        en: "Duplicate transaction",
    },
    TRANSACTION_CANCELED: {
        fr: "Transaction annulée",
        en: "Transaction canceled",
    },

    // === PORTEFEUILLE ===
    WALLET_NOT_FOUND: {
        fr: "Portefeuille introuvable",
        en: "Wallet not found",
    },
    WALLET_LOCKED: {
        fr: "Portefeuille verrouillé",
        en: "Wallet locked",
    },
    WALLET_CURRENCY_MISMATCH: {
        fr: "Devise du portefeuille non correspondante",
        en: "Wallet currency mismatch",
    },

    // === MOYENS DE PAIEMENT ===
    PAYMENT_METHOD_NOT_SUPPORTED: {
        fr: "Méthode de paiement non supportée",
        en: "Payment method not supported",
    },
    PAYMENT_PROVIDER_ERROR: {
        fr: "Erreur du fournisseur de paiement",
        en: "Payment provider error",
    },
    PAYMENT_VALIDATION_FAILED: {
        fr: "Échec de la validation du paiement",
        en: "Payment validation failed",
    },

    // === DIVERS ===
    AMOUNT_BELOW_MINIMUM: {
        fr: "Montant en dessous du minimum",
        en: "Amount below minimum",
    },
    AMOUNT_EXCEEDS_MAXIMUM: {
        fr: "Montant dépasse le maximum",
        en: "Amount exceeds maximum",
    },
    BENEFICIARY_NOT_ALLOWED: {
        fr: "Bénéficiaire non autorisé",
        en: "Beneficiary not allowed",
    },

    // === ABONNEMENT ===
    PLAN_NOT_FOUND: {
        fr: "Plan introuvable",
        en: "Plan not found",
    },
    SUBSCRIPTION_EXPIRED: {
        fr: "Abonnement expiré",
        en: "Subscription expired",
    },
    ALREADY_SUBSCRIBED: {
        fr: "Déjà abonné",
        en: "Already subscribed",
    },

    // === COMMANDES / LIVRAISON ===
    ORDER_NOT_FOUND: {
        fr: "Commande introuvable",
        en: "Order not found",
    },
    INVALID_ORDER_STATUS: {
        fr: "Statut de commande invalide",
        en: "Invalid order status",
    },
    DELIVERY_FAILED: {
        fr: "Échec de la livraison",
        en: "Delivery failed",
    },

    // === VALIDATION ===
    VALIDATION_ERROR: {
        fr: "Erreur de validation",
        en: "Validation error",
    },
    MISSING_FIELD: {
        fr: "Champ manquant",
        en: "Missing field",
    },
    INVALID_FORMAT: {
        fr: "Format invalide",
        en: "Invalid format",
    },
    INVALID_INPUT: {
        fr: "Entrée invalide",
        en: "Invalid input",
    },

    // === SYSTÈME / SERVEUR ===
    INTERNAL_ERROR: {
        fr: "Erreur interne",
        en: "Internal error",
    },
    SERVICE_UNAVAILABLE: {
        fr: "Service indisponible",
        en: "Service unavailable",
    },
    UNKNOWN_ERROR: {
        fr: "Erreur inconnue",
        en: "Unknown error",
    },
    MAINTENANCE: {
        fr: "Maintenance en cours",
        en: "Under maintenance",
    },
    NOT_FOUND: {
        fr: "Non trouvé",
        en: "Not found",
    },

    // === OTP ===
    CONFIRM_OTP: {
        fr: "Confirmez le code OTP",
        en: "Confirm OTP",
    },
    OTP_SENT: {
        fr: "Code OTP envoyé",
        en: "OTP sent",
    },
    OTP_NOT_SENT: {
        fr: "Échec de l'envoi du code OTP",
        en: "OTP not sent",
    },
    OTP_EXPIRED: {
        fr: "Code OTP expiré",
        en: "OTP expired",
    },

    // === Resource ====
    RESOURCE_CREATED: {
        fr: "Ressource créée",
        en: "Resource created",
    },
    RESOURCE_ACCEPTED: {
        fr: "Ressource acceptée",
        en: "Resource accepted",
    },
    RESOURCE_UPDATED: {
        fr: "Ressource mise à jour",
        en: "Resource updated",
    },
    RESOURCE_DELETED: {
        fr: "Ressource supprimée",
        en: "Resource deleted",
    },

    // === Appareil / Device ===
    UNKNOWN_DEVICE: {
        fr: "Appareil inconnu",
        en: "Unknown device",
    },
    DEVICE_ALREADY_REGISTERED: {
        fr: "Appareil déjà enregistré",
        en: "Device already registered",
    },

    // === Default operations ===
    SUCCESS: {
        fr: "Opération réussie",
        en: "Success",
    },
    ERROR: {
        fr: "Une erreur s'est produite",
        en: "An error occurred",
    },
    WARNING: {
        fr: "Avertissement",
        en: "Warning",
    },
};
