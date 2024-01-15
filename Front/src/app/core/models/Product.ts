import { CarDetail } from "./Details";

export interface Product {
    id: string;
    Year: number;
    Price: number;
    Description: string;
    Available: number;
    SellerID: string;
    ModelBrandName: string;
    ModelBrandID: number | null;
    BrandName: string;
    SellerName: string,
    SellerLastName: string,
    SellerEmail: string,
    CarDetails: Partial<CarDetail>[];
}