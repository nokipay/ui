export const errorMessages = {
  // === AUTHENTIFICATION ===
  AUTH_SUCCESS: {
    fr: "Authentification r\xE9ussie",
    en: "Authentication successful"
  },
  INVALID_CREDENTIALS: {
    fr: "Identifiants incorrects",
    en: "Invalid credentials"
  },
  UNAUTHORIZED: {
    fr: "Acc\xE8s non autoris\xE9",
    en: "Unauthorized access"
  },
  INVALID_TOKEN: {
    fr: "Jeton invalide",
    en: "Invalid token"
  },
  TOKEN_EXPIRED: {
    fr: "Jeton expir\xE9",
    en: "Token expired"
  },
  FORBIDDEN: {
    fr: "Action interdite",
    en: "Forbidden"
  },
  // === UTILISATEUR ===
  USER_NOT_FOUND: {
    fr: "Utilisateur introuvable",
    en: "User not found"
  },
  USER_INACTIVE: {
    fr: "Utilisateur inactif",
    en: "User inactive"
  },
  USER_ALREADY_EXISTS: {
    fr: "L'utilisateur existe d\xE9j\xE0",
    en: "User already exists"
  },
  INVALID_USER_TYPE: {
    fr: "Type d'utilisateur invalide",
    en: "Invalid user type"
  },
  // === NUMÉRO / TÉLÉPHONE ===
  INVALID_PHONE_NUMBER: {
    fr: "Num\xE9ro de t\xE9l\xE9phone invalide",
    en: "Invalid phone number"
  },
  PHONE_ALREADY_REGISTERED: {
    fr: "Num\xE9ro d\xE9j\xE0 enregistr\xE9",
    en: "Phone already registered"
  },
  PHONE_NOT_REGISTERED: {
    fr: "Num\xE9ro non enregistr\xE9",
    en: "Phone not registered"
  },
  // === TRANSACTIONS / PORTEFEUILLE ===
  INSUFFICIENT_FUNDS: {
    fr: "Fonds insuffisants",
    en: "Insufficient funds"
  },
  CURRENCY_NOT_SUPPORTED: {
    fr: "Devise non prise en charge",
    en: "Currency not supported"
  },
  TRANSACTION_TIMEOUT: {
    fr: "D\xE9lai de la transaction d\xE9pass\xE9",
    en: "Transaction timeout"
  },
  TRANSACTION_ALREADY_PROCESSED: {
    fr: "Transaction d\xE9j\xE0 trait\xE9e",
    en: "Transaction already processed"
  },
  TRANSACTION_AMOUNT_INVALID: {
    fr: "Montant de la transaction invalide",
    en: "Transaction amount invalid"
  },
  TRANSACTION_DUPLICATE: {
    fr: "Transaction en double",
    en: "Duplicate transaction"
  },
  TRANSACTION_CANCELED: {
    fr: "Transaction annul\xE9e",
    en: "Transaction canceled"
  },
  // === PORTEFEUILLE ===
  WALLET_NOT_FOUND: {
    fr: "Portefeuille introuvable",
    en: "Wallet not found"
  },
  WALLET_LOCKED: {
    fr: "Portefeuille verrouill\xE9",
    en: "Wallet locked"
  },
  WALLET_CURRENCY_MISMATCH: {
    fr: "Devise du portefeuille non correspondante",
    en: "Wallet currency mismatch"
  },
  // === MOYENS DE PAIEMENT ===
  PAYMENT_METHOD_NOT_SUPPORTED: {
    fr: "M\xE9thode de paiement non support\xE9e",
    en: "Payment method not supported"
  },
  PAYMENT_PROVIDER_ERROR: {
    fr: "Erreur du fournisseur de paiement",
    en: "Payment provider error"
  },
  PAYMENT_VALIDATION_FAILED: {
    fr: "\xC9chec de la validation du paiement",
    en: "Payment validation failed"
  },
  // === DIVERS ===
  AMOUNT_BELOW_MINIMUM: {
    fr: "Montant en dessous du minimum",
    en: "Amount below minimum"
  },
  AMOUNT_EXCEEDS_MAXIMUM: {
    fr: "Montant d\xE9passe le maximum",
    en: "Amount exceeds maximum"
  },
  BENEFICIARY_NOT_ALLOWED: {
    fr: "B\xE9n\xE9ficiaire non autoris\xE9",
    en: "Beneficiary not allowed"
  },
  // === ABONNEMENT ===
  PLAN_NOT_FOUND: {
    fr: "Plan introuvable",
    en: "Plan not found"
  },
  SUBSCRIPTION_EXPIRED: {
    fr: "Abonnement expir\xE9",
    en: "Subscription expired"
  },
  ALREADY_SUBSCRIBED: {
    fr: "D\xE9j\xE0 abonn\xE9",
    en: "Already subscribed"
  },
  // === COMMANDES / LIVRAISON ===
  ORDER_NOT_FOUND: {
    fr: "Commande introuvable",
    en: "Order not found"
  },
  INVALID_ORDER_STATUS: {
    fr: "Statut de commande invalide",
    en: "Invalid order status"
  },
  DELIVERY_FAILED: {
    fr: "\xC9chec de la livraison",
    en: "Delivery failed"
  },
  // === VALIDATION ===
  VALIDATION_ERROR: {
    fr: "Erreur de validation",
    en: "Validation error"
  },
  MISSING_FIELD: {
    fr: "Champ manquant",
    en: "Missing field"
  },
  INVALID_FORMAT: {
    fr: "Format invalide",
    en: "Invalid format"
  },
  INVALID_INPUT: {
    fr: "Entr\xE9e invalide",
    en: "Invalid input"
  },
  // === SYSTÈME / SERVEUR ===
  INTERNAL_ERROR: {
    fr: "Erreur interne",
    en: "Internal error"
  },
  SERVICE_UNAVAILABLE: {
    fr: "Service indisponible",
    en: "Service unavailable"
  },
  UNKNOWN_ERROR: {
    fr: "Erreur inconnue",
    en: "Unknown error"
  },
  MAINTENANCE: {
    fr: "Maintenance en cours",
    en: "Under maintenance"
  },
  NOT_FOUND: {
    fr: "Non trouv\xE9",
    en: "Not found"
  },
  // === OTP ===
  CONFIRM_OTP: {
    fr: "Confirmez le code OTP",
    en: "Confirm OTP"
  },
  OTP_SENT: {
    fr: "Code OTP envoy\xE9",
    en: "OTP sent"
  },
  OTP_NOT_SENT: {
    fr: "\xC9chec de l'envoi du code OTP",
    en: "OTP not sent"
  },
  OTP_EXPIRED: {
    fr: "Code OTP expir\xE9",
    en: "OTP expired"
  },
  // === Resource ====
  RESOURCE_CREATED: {
    fr: "Ressource cr\xE9\xE9e",
    en: "Resource created"
  },
  RESOURCE_ACCEPTED: {
    fr: "Ressource accept\xE9e",
    en: "Resource accepted"
  },
  RESOURCE_UPDATED: {
    fr: "Ressource mise \xE0 jour",
    en: "Resource updated"
  },
  RESOURCE_DELETED: {
    fr: "Ressource supprim\xE9e",
    en: "Resource deleted"
  },
  // === Appareil / Device ===
  UNKNOWN_DEVICE: {
    fr: "Appareil inconnu",
    en: "Unknown device"
  },
  DEVICE_ALREADY_REGISTERED: {
    fr: "Appareil d\xE9j\xE0 enregistr\xE9",
    en: "Device already registered"
  },
  // === Default operations ===
  SUCCESS: {
    fr: "Op\xE9ration r\xE9ussie",
    en: "Success"
  },
  ERROR: {
    fr: "Une erreur s'est produite",
    en: "An error occurred"
  },
  WARNING: {
    fr: "Avertissement",
    en: "Warning"
  }
};
