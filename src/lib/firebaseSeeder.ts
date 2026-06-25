import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { PRODUCTS } from '../data';

export async function seedProductsIfEmpty() {
  const path = 'products';
  let querySnapshot;
  try {
    const productsRef = collection(db, path);
    querySnapshot = await getDocs(productsRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return;
  }
  
  if (querySnapshot && querySnapshot.empty) {
    console.log('Firestore products collection is empty. Seeding initial products...');
    for (const product of PRODUCTS) {
      // Set document ID as the product's ID to keep them aligned
      const productDocRef = doc(db, path, product.id);
      try {
        await setDoc(productDocRef, {
          ...product,
          approved: true, // Existing products are pre-approved
          createdAt: new Date().toISOString()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `${path}/${product.id}`);
      }
    }
    console.log('Seeding completed successfully!');
  } else {
    console.log('Firestore products collection already contains data. Skipping seeding.');
  }
}
