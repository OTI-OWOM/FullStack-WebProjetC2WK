import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { CarDetail } from '@core/models/Details';
import { Product } from '@core/models/Product';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Message } from '@core/models/Message';

@Injectable()
export class ProductService {

  constructor(private dbService: DbService, private router: Router) { }

  async submitCarDetails(carDetails: Partial<CarDetail>[], selectedCarId: number) {
    if (!carDetails) {
      carDetails = [];
    }

    if (selectedCarId && carDetails.length > 0) {
      return new Promise((resolve, reject) => {
        this.dbService.createCarDetail(
          selectedCarId, carDetails
        ).subscribe({
          next: (res: any) => {
            resolve(res.message);
          },
          error: (err: any) => {
            resolve(err.message);
          }
        });
      });
    } else {
      return Promise.resolve('Please add at least one car detail.');
    }
  }

  async submit(
    data: Partial<Product>,
    selectedImages: File[],
    carDetails: Partial<CarDetail>[]
  ): Promise<Message> {
    let message: Message;
    if (!data.Year || !data.Price || !data.Description) {
      return { Value: 'Required data is missing', ok: false };
    }

    try {
      const productCreationResponse = await firstValueFrom(this.dbService.createProduct(data)) as { message: string; carId: string; };
      const selectedCarId = parseInt(productCreationResponse.carId);

      if (selectedImages.length > 0) {
        await firstValueFrom(this.dbService.uploadCarImage(selectedCarId, selectedImages));
      }

      message = await this.submitCarDetails(carDetails, selectedCarId)
        .then(() => {
          return { Value: productCreationResponse.carId, ok: true };
        })
        .catch((err: any) => {
          return { Value: `Error uploading details ${err}`, ok: false };
        });

      return message;
    } catch (err) {
      return { Value: 'An unknown error occurred', ok: false };
    }
  }

  findMissingKeyValuePairs(list1: Partial<CarDetail>[], list2: Partial<CarDetail>[]): Partial<CarDetail>[] {
    const missingPairs: Partial<CarDetail>[] = [];

    for (let i = 0; i < list1.length; i++) {
      const map1 = list1[i];
      const map2 = list2[i] || {};

      const missingInMap: Partial<CarDetail> = {};
      for (const key in map1) {
        if (map1.hasOwnProperty(key) && !map2.hasOwnProperty(key)) {
          (missingInMap as any)[key] = map1[key as keyof CarDetail];
        }
      }

      if (Object.keys(missingInMap).length > 0) {
        missingPairs.push(missingInMap);
      }
    }

    return missingPairs;
  }

  async submitModify(
    data: Partial<Product>,
    selectedImages: File[],
    carDetails: Partial<CarDetail>[],
    oldCarDetails: Partial<CarDetail>[],
    productId: string,
    imagesToRemove: number[]
  ): Promise<Message> {

    let message: Message;
    let productCreationResponse: { message: string };
    let removedDetails: Partial<CarDetail>[] = this.findMissingKeyValuePairs(oldCarDetails, carDetails);
    
    for (const detail of removedDetails) {
      try {
        if (detail.id) {
          productCreationResponse = await firstValueFrom(this.dbService.deleteCarDetail(detail.id)) as { message: string };
        }
      } catch (err) {
        return { Value: `Error deleting detail!`, ok: false };
      }
    }
    try {
      productCreationResponse = await firstValueFrom(this.dbService.modifyProduct(productId, data)) as { message: string };
    } catch (err) {
      return { Value: `Error modifying car!`, ok: false };
    }
    try {
      if (selectedImages.length > 0) {
        await firstValueFrom(this.dbService.uploadCarImage(parseInt(productId), selectedImages));
      }
    } catch (err) {
      return { Value: `Error uploading Images!`, ok: false };
    }
    try {
      for (const imageId of imagesToRemove) {
        await firstValueFrom(this.dbService.deleteCarImage(imageId));
      }
    } catch (err) {
      return { Value: `Error removing images!`, ok: false };
    }
    message = await this.submitCarDetails(carDetails, parseInt(productId))
      .then(() => {
        return { Value: productCreationResponse.message, ok: true };
      })
      .catch((err: any) => {
        return { Value: `Error uploading details!`, ok: false };
      });

    return message;
  }
}
