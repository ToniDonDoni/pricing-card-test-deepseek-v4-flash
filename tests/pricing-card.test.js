#!/usr/bin/env node
/**
 * Test suite for Pricing Card Component
 * RED phase: all tests should fail because index.html doesn't exist yet
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const HTML_PATH = path.join(__dirname, '..', 'index.html');
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    console.log(`  ✗ ${name}: ${e.message}`);
  }
}

console.log('\nPricing Card Component Tests\n');

// Test 1: File existence
test('index.html file exists', () => {
  assert(fs.existsSync(HTML_PATH), 'index.html not found');
});

if (fs.existsSync(HTML_PATH)) {
  const html = fs.readFileSync(HTML_PATH, 'utf-8');

  // Test 2: Basic HTML structure
  test('contains <!DOCTYPE html>', () => {
    assert(html.includes('<!DOCTYPE html>') || html.includes('<!doctype html>'),
      'Missing DOCTYPE declaration');
  });

  test('contains <html> tag', () => {
    assert(html.includes('<html'), 'Missing <html> tag');
  });

  test('contains <head> and <body>', () => {
    assert(html.includes('<head>') || html.includes('<header'), 'Missing <head>');
    assert(html.includes('<body'), 'Missing <body>');
  });

  // Test 3: Three pricing cards
  test('contains "Free" pricing card', () => {
    assert(html.includes('Free'), 'Missing "Free" plan');
  });

  test('contains "Pro" pricing card', () => {
    assert(html.includes('Pro'), 'Missing "Pro" plan');
  });

  test('contains "Enterprise" pricing card', () => {
    assert(html.includes('Enterprise'), 'Missing "Enterprise" plan');
  });

  // Test 4: "Most Popular" badge on Pro
  test('contains "Most Popular" badge', () => {
    assert(html.includes('Most Popular'), 'Missing "Most Popular" badge');
  });

  // Test 5: Pricing toggle
  test('contains pricing toggle element', () => {
    assert(
      html.includes('toggle') || html.includes('switch') || html.includes('checkbox'),
      'Missing pricing toggle'
    );
  });

  // Test 6: Monthly/Annual pricing (data in JS)
  test('contains monthly pricing data ($0, $19, $99)', () => {
    assert(
      (html.includes('monthly: 0') || html.includes('monthly:0')) &&
      (html.includes('monthly: 19') || html.includes('monthly:19')) &&
      (html.includes('monthly: 99') || html.includes('monthly:99')),
      'Missing monthly price data in JS');
  });

  test('contains annual pricing data (20% discount)', () => {
    assert(
      html.includes('15.20') || html.includes('annual: 15') ||
      html.includes('79.20') || html.includes('annual: 79') ||
      html.includes('annual: 0'),
      'Missing annual price data (20% off)');
  });

  // Test 7: CTA buttons (created dynamically)
  test('contains button creation code for all plans', () => {
    const btnMatches = (html.match(/card-btn/g) || []).length;
    assert(btnMatches >= 3,
      `Expected 'card-btn' references >= 3, found ${btnMatches}`);
  });

  // Test 8: Responsive CSS
  test('contains responsive media query (mobile)', () => {
    assert(html.includes('@media') || html.includes('max-width'), 'Missing responsive CSS');
  });

  // Test 9: Ripple effect
  test('contains ripple effect JavaScript', () => {
    assert(
      html.includes('ripple') || html.includes('animate') || html.includes('transition'),
      'Missing ripple/transition code'
    );
  });

  // Test 10: Dark theme
  test('contains dark theme colors', () => {
    const hasDarkTheme = html.includes('#0f0') || html.includes('rgb(') ||
      html.includes('#1a') || html.includes('dark') ||
      html.includes('background');
    assert(hasDarkTheme, 'Missing dark theme styling');
  });
}

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
