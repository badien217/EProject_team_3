import { EventEmitter, Injectable } from '@angular/core';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  avatarFirstLetter?: string;
  avatarBackgroundColor?: string;

  cartItemsLength: number = 0;
  cartUpdated: EventEmitter<void> = new EventEmitter<void>();

  get(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  set(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
    this.cartUpdated.emit(); // Emit event when cart is updated
  }

  setAvatar(value: any): void {
    sessionStorage.setItem('avatar', JSON.stringify(value));
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
    this.cartUpdated.emit(); // Emit event when cart is updated
  }

  clear(): void {
    sessionStorage.clear();
    this.cartUpdated.emit(); // Emit event when cart is updated
  }

  getCartItems(): Book[] {
    return this.get('cartDetails') || [];
  }



}
