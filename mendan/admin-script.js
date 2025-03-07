// admin-script.js

document.addEventListener('DOMContentLoaded', function() {
  // 必要に応じて初期化処理をここに書く
});

/* 
  以下は例示的な関数。実際にはバックエンドと連携して
  新規チケット登録やクーポン登録などの処理を行ってください。
*/

// チケットプラン選択デモ
function selectTicketPlan(element) {
  document.querySelectorAll('.ticket-card.selected').forEach(el => {
    el.classList.remove('selected');
  });
  element.classList.add('selected');
}

// 新規チケット登録デモ
function registerNewTicket() {
  const ticketName = document.getElementById('newTicketName').value;
  const ticketPrice = document.getElementById('newTicketPrice').value;
  const ticketDesc = document.getElementById('newTicketDesc').value;

  // ここでバックエンドにPOSTするなどの処理を想定
  alert(`チケット「${ticketName}」を登録しました（価格: ${ticketPrice}, 内容: ${ticketDesc}）`);
}

// 新規クーポン登録デモ
function registerNewCoupon() {
  const couponCode = document.getElementById('newCouponCode').value;
  const discountRate = document.getElementById('newCouponDiscount').value;
  // ここでバックエンドにPOSTするなどの処理を想定
  alert(`クーポン「${couponCode}」を登録しました（割引率: ${discountRate}%）`);
}
