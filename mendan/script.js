// ページ全体の初期化
document.addEventListener('DOMContentLoaded', function() {
  // ここではもともとのタブ切替用の処理もありますが、
  // 各画面は個別ページとなるため、必要に応じて処理を調整してください。
  setupBookingTabs();
});

// 予約フォームとカレンダータブの連携設定
function setupBookingTabs() {
  const bookingTabs = document.querySelectorAll('#bookingTab .nav-link');
  if (bookingTabs.length > 0) {
    bookingTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const target = this.getAttribute('data-bs-target').replace('#', '');
        document.querySelectorAll('#bookingTabContent .tab-pane').forEach(pane => {
          pane.classList.remove('show', 'active');
        });
        const targetPane = document.getElementById(target);
        if (targetPane) {
          targetPane.classList.add('show', 'active');
        }
      });
    });
  }
}

// 日付選択処理
function selectDate(date) {
  document.getElementById('time-slots-date').textContent = date + 'の空き時間';
  setTimeout(() => {
    const timeslotsTab = document.getElementById('timeslots-tab');
    if (timeslotsTab) {
      timeslotsTab.click();
    }
  }, 100);
}

// 時間枠選択処理
function selectTimeSlot(element) {
  document.querySelectorAll('.time-slot.selected').forEach(el => {
    el.classList.remove('selected');
  });
  element.classList.add('selected');
  const date = document.getElementById('time-slots-date').textContent.replace('の空き時間', '');
  const time = element.querySelector('.card-body').textContent.trim();
  document.getElementById('selected-date-time').innerHTML = '<i class="fas fa-calendar me-1"></i>' + date + ' ' + time;
  document.getElementById('booking-submit-btn').removeAttribute('disabled');
}

// チケットプラン選択処理
function selectPlan(element, planId) {
  document.querySelectorAll('.plan-card.selected').forEach(el => {
    el.classList.remove('selected');
  });
  element.classList.add('selected');
  document.getElementById('purchase-panel').classList.remove('d-none');
  if (planId === '1ticket') {
    document.getElementById('selected-plan-name').textContent = '1枚';
    document.getElementById('original-price').textContent = '¥1,500';
    document.getElementById('final-price').textContent = '¥1,500';
  } else if (planId === '3tickets') {
    document.getElementById('selected-plan-name').textContent = '3枚セット';
    document.getElementById('original-price').textContent = '¥3,900';
    document.getElementById('final-price').textContent = '¥3,900';
  } else if (planId === '5tickets') {
    document.getElementById('selected-plan-name').textContent = '5枚セット';
    document.getElementById('original-price').textContent = '¥6,000';
    document.getElementById('final-price').textContent = '¥6,000';
  }
}

// 購入キャンセル処理
function cancelPurchase() {
  document.getElementById('purchase-panel').classList.add('d-none');
  document.querySelectorAll('.plan-card.selected').forEach(el => {
    el.classList.remove('selected');
  });
}

// クーポン適用処理
function applyCoupon() {
  const couponCode = document.getElementById('coupon-code').value;
  if (couponCode === 'GW2024') {
    document.getElementById('coupon-success').classList.remove('d-none');
    document.getElementById('coupon-error').classList.add('d-none');
    document.getElementById('coupon-message').textContent = 'クーポン「GW2024」が適用されました (50%OFF)';
    const originalPrice = document.getElementById('original-price').textContent;
    const price = parseInt(originalPrice.replace('¥', '').replace(',', ''));
    const discountPrice = price * 0.5;
    document.getElementById('discount-row').classList.remove('d-none');
    document.getElementById('discount-amount').textContent = '-¥' + discountPrice.toLocaleString();
    document.getElementById('final-price').textContent = '¥' + (price - discountPrice).toLocaleString();
    document.getElementById('coupon-applied').classList.remove('d-none');
    document.getElementById('applied-coupon-message').textContent = 'クーポン「GW2024」が適用されました (50%OFF)';
  } else {
    document.getElementById('coupon-error').classList.remove('d-none');
    document.getElementById('coupon-success').classList.add('d-none');
  }
}

// ストライプモーダル表示／非表示処理
function openStripeModal() {
  const modal = document.getElementById('stripeModal');
  const planName = document.getElementById('selected-plan-name').textContent;
  const finalPrice = document.getElementById('final-price').textContent;
  document.getElementById('stripe-payment-description').textContent = planName + '面談チケット: ' + finalPrice;
  modal.style.display = 'block';
}
function closeStripeModal() {
  document.getElementById('stripeModal').style.display = 'none';
}
document.getElementById('stripe-payment-form') && document.getElementById('stripe-payment-form').addEventListener('submit', function(event) {
  event.preventDefault();
  closeStripeModal();
  document.getElementById('purchase-panel').classList.add('d-none');
  document.getElementById('success-message').classList.remove('d-none');
  document.querySelectorAll('.plan-card.selected').forEach(el => {
    el.classList.remove('selected');
  });
});

// アカウント削除確認処理
document.getElementById('deleteConfirmText') && document.getElementById('deleteConfirmText').addEventListener('input', function() {
  const confirmCheckbox = document.getElementById('confirmDelete');
  const deleteBtn = document.getElementById('confirmDeleteBtn');
  if (this.value === 'delete' && confirmCheckbox.checked) {
    deleteBtn.removeAttribute('disabled');
  } else {
    deleteBtn.setAttribute('disabled', 'disabled');
  }
});
document.getElementById('confirmDelete') && document.getElementById('confirmDelete').addEventListener('change', function() {
  const deleteText = document.getElementById('deleteConfirmText');
  const deleteBtn = document.getElementById('confirmDeleteBtn');
  if (this.checked && deleteText.value === 'delete') {
    deleteBtn.removeAttribute('disabled');
  } else {
    deleteBtn.setAttribute('disabled', 'disabled');
  }
});
