import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

/**
 * Submit a contact/inquiry form entry to Firestore.
 * @param {Object} data - Form data from the contact form
 */
export async function submitInquiry(data) {
  try {
    const docRef = await addDoc(collection(db, 'inquiries'), {
      ...data,
      createdAt: new Date(),
    });
    console.log('Inquiry submitted with ID:', docRef.id);
    return docRef.id;
  } catch {
    console.error('Error submitting inquiry:', error);
    throw error;
  }
}

/**
 * Fetch testimonials from Firestore.
 * Falls back to static data if Firestore isn't configured.
 */
export async function getTestimonials() {
  try {
    const q = query(
      collection(db, 'testimonials'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch {
    console.warn('Firestore not configured, using static testimonials.');
    return [];
  }
}

/**
 * Fetch inquiries (admin use only — protect with Auth in production).
 */
export async function getInquiries() {
  try {
    const q = query(
      collection(db, 'inquiries'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }
}
