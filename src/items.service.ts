import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  // include a random number in - required due to some form of default caching.  not sure whether required when deployed
  //private instanceId = Math.random().toString(36).substring(2, 8);

  findOne(id: number) {
    // dynamically generate the item each time
    const minute = new Date().getMinutes();
    const items = [
      { id: 1, name: 'Keyboard', price: 49.99, updatedAt: `${minute} mins past the hour` },
      { id: 2, name: 'Mouse', price: 19.99, updatedAt: `${minute} mins past the hour` },
    ];
    return items.find((i) => i.id === id);
  }

  computeETag(item: any): string {
    const payload = `${item.id}-${item.name}-${item.price}-${item.updatedAt}`;
    return `"${Buffer.from(payload).toString('base64')}"`;
  }  
}
