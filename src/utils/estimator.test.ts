import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimate, generateWhatsAppUrl, validateEmail, validatePhone } from './estimator';

test('calculateEstimate returns realistic budget ranges based on area and grade', () => {
  const result = calculateEstimate({
    projectType: 'residential-construction',
    areaSqFt: 3000,
    finishGrade: 'luxury',
  });

  assert.ok(result.estimatedTotalMin > 0, 'Min estimate should be positive');
  assert.ok(result.estimatedTotalMax > result.estimatedTotalMin, 'Max should be strictly greater than min');
  assert.equal(result.estimatedTotalMin, 3000 * 90);
  assert.equal(result.estimatedTotalMax, 3000 * 130);
  assert.ok(result.estimatedTimelineMonths.max >= result.estimatedTimelineMonths.min);
  assert.ok(result.breakdown.structuralOrCivil > 0);
});

test('generateWhatsAppUrl builds clean wa.me link with encoded params', () => {
  const url = generateWhatsAppUrl('+91 80981 54005', {
    name: 'Alexander Wright',
    service: 'Luxury Interior Design',
    areaSqFt: 4500,
    message: 'Looking for a complete penthouse overhaul.',
  });

  assert.ok(url.startsWith('https://wa.me/918098154005?text='), 'Should format phone without spaces');
  assert.ok(url.includes('Alexander%20Wright') || url.includes('Alexander+Wright'), 'Should encode name');
  assert.ok(url.includes('Luxury%20Interior%20Design') || url.includes('Luxury+Interior+Design'));
  assert.ok(url.includes('4500'));

  // Also test raw 10-digit phone number
  const url10 = generateWhatsAppUrl('8098154005', {
    name: 'DAS Client',
  });
  assert.ok(url10.startsWith('https://wa.me/918098154005?text='), 'Should auto-prefix 91 to 10-digit phone');
});

test('validateEmail correctly evaluates emails', () => {
  assert.equal(validateEmail('client@architect.com'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail(''), false);
});

test('validatePhone evaluates valid phone number lengths', () => {
  assert.equal(validatePhone('+91 98400 12345'), true);
  assert.equal(validatePhone('1234567890'), true);
  assert.equal(validatePhone('123'), false);
});
