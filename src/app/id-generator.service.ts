import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdGeneratorService {

  private sequenceMap = {
    'TR': 1000, // Trip Itinerary
    'UR': 0,    // User
    'DG': 0,    // Destination Guide
    'DD': 0,    // Destination Detail
    'FR': 0,    // Favorite
    'TG': 0,    // Travel Group
    'AI': 0,    // Admin
    'UI': 0     // User Itinerary
  };

  // Method 1: Generate ID using a pure mathematical formula (User - 'UR')
  generateUuidId(): string {
    const randomNum = Math.floor(Math.random() * 1e8); // Random 8 digit number
    return `UR${randomNum}`;
  }

  // Method 2: Sequential ID generation (Trip Itinerary - 'TR')
  generateSequentialId(): string {
    const prefix = 'TR';
    if (!this.sequenceMap[prefix]) {
      throw new Error('Invalid prefix');
    }

    const id = this.sequenceMap[prefix] + 1;
    this.sequenceMap[prefix] = id;

    // Zero-padding to ensure a fixed-length ID, e.g., 'TR1001'
    return `${prefix}${String(id).padStart(4, '0')}`;
  }

  // Method 3: Generate ID based on pure math (Destination Guide - 'DG')
  generateObjectIdWithPrefix(): string {
    // Using the current timestamp and mathematical operation to generate unique ID
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const mathResult = timestamp * Math.random(); // Multiply timestamp with a random factor
    return `DG${Math.floor(mathResult).toString().slice(0, 8)}`; // Slice to 8 digits
  }

  // Method 4: Timestamp-based ID generation (Destination Detail - 'DD')
  generateTimestampId(): string {
    const timestamp = Date.now(); // Get the current timestamp in milliseconds
    return `DD${timestamp}`;
  }

  // Method 5: Random alphanumeric ID generation (Favorite - 'FR')
  generateRandomId(): string {
    const randomString = this.generateRandomString(6); // Generate a random alphanumeric string of length 6
    return `FR${randomString}`;
  }

  // Method 6: Custom Date/Time + Counter-based ID generation (Travel Group - 'TG')
  generateCustomDateId(): string {
    const dateStr = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
    const prefix = 'TG';
    const counter = this.sequenceMap[prefix] + 1;
    this.sequenceMap[prefix] = counter;

    // Return a custom ID with date and counter
    return `${prefix}${dateStr}-${String(counter).padStart(4, '0')}`;
  }

  // Method 7: Sequential ID generation (Admin - 'AI')
  generateAdminSequentialId(): string {
    const prefix = 'AI';
    if (!this.sequenceMap[prefix]) {
      throw new Error('Invalid prefix');
    }

    const id = this.sequenceMap[prefix] + 1;
    this.sequenceMap[prefix] = id;

    // Zero-padding to ensure a fixed-length ID, e.g., 'AI0001'
    return `${prefix}${String(id).padStart(4, '0')}`;
  }

  // Method 8: Sequential ID generation (User Itinerary - 'UI')
  generateUserItinerarySequentialId(): string {
    const prefix = 'UI';
    if (!this.sequenceMap[prefix]) {
      throw new Error('Invalid prefix');
    }

    const id = this.sequenceMap[prefix] + 1;
    this.sequenceMap[prefix] = id;

    // Zero-padding to ensure a fixed-length ID, e.g., 'UI0001'
    return `${prefix}${String(id).padStart(4, '0')}`;
  }

  // Helper function to generate a random alphanumeric string using pure math
  private generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Alphanumeric characters
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length); // Generate a random index
      result += characters[randomIndex]; // Add the character to the result string
    }
    return result;
  }
}
