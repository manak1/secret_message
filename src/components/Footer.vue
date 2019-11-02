<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__box flex justfiy-center">
        <div class="footer__item">
          <ul class="footer__lists">
            <li class="footer__lists-item">
              <h3 class="footer__title">Links</h3>
            </li>
            <li class="footer__lists-item">
              <a href="/about" class="footer__link">アンゴウメッセについて</a>
            </li>
            <li class="footer__lists-item">
              <a href class="footer__link">ホーム</a>
            </li>
            <li class="footer__lists-item">
              <a href class="footer__link">ログイン</a>
            </li>
          </ul>
        </div>

        <div class="footer__item px-20">
          <h3 class="footer__title">開発者</h3>
          <p class="footer__desc">
            このページを訪れて頂きありがとうございます！アンゴウメッセは私が初めて開発したウェブサービスです！
            バグや使いづらい点などもあるかもしれませんが、楽しんでもらえると幸いです。
            何か問題等があれば、お手数をおかけしますが連絡お願いします(*_ _)ﾍﾟｺ
          </p>
          <ul class="mt-5 flex justify-center items-center footer__sns-list">
            <li>
              <a href="
              https://twitter.com/mikeanakida
              ">
                <i class="fab mr-4 fa-twitter footer__sns"></i>
              </a>
            </li>

            <li class>
              <a href="https://github.com/manak1">
                <i class="mr-4 footer__sns fab fa-github"></i>
              </a>
            </li>

            <li class="footer__sns">
              <a href="https://www.linkedin.com/in/mikeanakida/">
                <i class="fab fa-linkedin footer__sns"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <small class="footer__copyright mt-10 pb-6">copyright © PenguinFactory</small>
    </div>
  </footer>
</template>