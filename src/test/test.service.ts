// src/test/test.service.ts
import { Injectable } from '@nestjs/common';
import { db } from '../../firebase.admin'; // adjust path if needed

@Injectable()
export class TestService {
  async createTestEntry(): Promise<string> {
    const docRef = db.collection('testEntries').doc();
    await docRef.set({
      createdAt: new Date().toISOString(),
      message: 'Test entry from Local NestJS!',
    });
    return docRef.id;
  }
}
