'use strict';

// Telif yılını güncel tutar; sayfa JavaScript olmadan da tamamen kullanılabilir.
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}
