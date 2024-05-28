const BASE_URL = 'https://c2wk-api.mileristovski.fr';

export const URL:any = {
    // ----------------------Normal-User-Endpoints------------------------
    ME: `${BASE_URL}/me`,
    IS_SELLER: `${BASE_URL}/serller/verify`,
    // ---------------------Authentication-Endpoints----------------------
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/register`,
    REGISTER_SELLER: `${BASE_URL}/register/seller/`,
    REGISTER_ADMIN: `${BASE_URL}/register/admin/`,
    REGISTER_SUPER_ADMIN: `${BASE_URL}/register/super/admin/`,
    // ----------------------Admin-Endpoints------------------------------
    USER: `${BASE_URL}/admin/user/`,
    USERS: `${BASE_URL}/admin/users`,
    IS_ADMIN: `${BASE_URL}/admin/verify`,
    // ---------------------Cars-Endpoints--------------------------------
    PRODUCT: `${BASE_URL}/car/`,
    PRODUCTS: `${BASE_URL}/cars`,
    PRODUCTS_USER: `${BASE_URL}/cars/all`,
    PRODUCTS_ME: `${BASE_URL}/cars/self/all`,
    // ---------------------Car-Images-Endpoints---------------------------
    IMAGES: `${BASE_URL}/car/images/`,
    IMAGE: `${BASE_URL}/car/image/`,
    // ---------------------Car-Details-Endpoints--------------------------
    DETAIL: `${BASE_URL}/car/detail/`,
    // ---------------------Car-Brands-Endpoints--------------------------
    MODELS: `${BASE_URL}/car/models/`,
    BRANDS: `${BASE_URL}/car/brands/all/`,
};
