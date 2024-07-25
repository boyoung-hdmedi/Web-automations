// 프로토콜(uri scheme)
var protocol = 'webautomationlogin://';

var installPageUrl = 'http://127.0.0.1:5500/InstallExe/install.html';
var loginPageUrl = 'http://127.0.0.1:5500/InstallExe/login.html';

function checkProgramInstalled() {
  var timeout = 2000;         // 최대 대기 시간 (2초)

  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);    // web에 추가
  iframe.style.display = 'none';         // 보이지 않도록
  iframe.src = protocol;                // scheme 연결

  // 타이머 설정
  var timeoutHandler = setTimeout(function () {
    alert('프로그램이 설치되어 있지 않습니다. 설치 페이지로 이동합니다.');
    window.location.href = installPageUrl; // 설치 페이지로 리디렉션
    document.body.removeChild(iframe);
  }, timeout);

  // 프로토콜 핸들러가 실행되었으면 알림 표시
  window.addEventListener('blur', function () {
    clearTimeout(timeoutHandler);
    document.body.removeChild(iframe);
    alert('프로그램이 설치되어 있습니다.');
    window.location.href = loginPageUrl;
  }, { once: true });
}