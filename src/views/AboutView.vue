<template>
  <div class="frame">
    <nav>
      <img alt="Dotch logo" src="../assets/logo.svg" />
    </nav>
    <main>
      <Transition name="fade" appear>
      <div id="about">
        <div id="tagline">
          <h4>Dotch lets you digitise and <br> share your receipts</h4>
        </div>
        <ul id="features">
          <li>Scan receipts with AI</li>
          <li>Select and count items</li>
          <li>Share link with anyone</li>
        </ul>
      </div>
      </Transition>
    </main>
    <footer>
      <Transition name="slide-up" appear>
      <div>
        <a href="/">Back</a>
      </div>
      </Transition>
    </footer>
  </div>
</template>

<style scoped>
  #about {
    padding: 24px 36px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  #features {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }
  #features li {
    border: solid 1px #7b7fa5;
    box-shadow: 0 2px 3px rgba(0,0,0,0.2);
    padding: 12px 16px;
    border-radius: 36px;
    font-size: 18px;
    color: #7b7fa5;
  }
</style>