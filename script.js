function showMessage() {
  document.getElementById('message').textContent = 'Button clicked!';
}

function open104Home() {
  window.open('https://www.104.com.tw', '_blank', 'noopener,noreferrer');
}

function openPingHsu104() {
  window.open('https://www.104.com.tw/jobbank/custview/index.php?r=cust&j=4a4b432f3e5c3f284e323c1d1d1d1d5f2443a363189j99', '_blank', 'noopener,noreferrer');
}

function openPingHsuLinkedIn() {
  // 這裡確保是在點擊事件中呼叫window.open，避免被阻擋
  const newWindow = window.open('https://www.linkedin.com/in/ping-h-32b485104/', '_blank', 'noopener,noreferrer');
  if (!newWindow) {
    alert('瀏覽器阻擋了彈出視窗，請允許彈窗後再試一次');
  }
}
