// DOM 準備が終わったら実行
document.addEventListener('DOMContentLoaded', () => {
  const cartCountEl = document.getElementById('cart-count');
  let cartCount = 0;

  // 他のスクリプトから呼び出せるようグローバル化
  window.incrementCartCount = () => {
    cartCount++;
    cartCountEl.textContent = cartCount;

    // アニメーション（ちょっと膨らむ）
    cartCountEl.animate([
      { transform: 'scale(1.3)' },
      { transform: 'scale(1)' }
    ], {
      duration: 200,
      easing: 'ease-out'
    });
  };
});
