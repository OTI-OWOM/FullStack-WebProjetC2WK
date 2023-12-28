import { CarDetail } from "./Details";

export interface Product {
    id: string;
    Year: number;
    Price: number;
    Description: string;
    Available: boolean;
    SellerID: string;
    ModelBrandName: string;
    BrandName: string;
    CarDetails: CarDetail[];
}