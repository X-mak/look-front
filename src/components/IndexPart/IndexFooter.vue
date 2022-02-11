<template>
  <div class="column board">
    <div class="title"><p>为什么选择我们</p></div>
    <div class="content row">
      <div class="story">
          品牌故事
      </div>
      <div class="column">
        <div class="info row">
          <div class="column about">
            <p class="subtitle">关于我们</p>
            <div class="subinfo">
              <div>
                <p>关注我们</p>
              </div>
              <div>
                <p>联系我们</p>
              </div>
              <div>
                <p>常见问题</p>
              </div>
              <div>
                <p>在线客服</p>
              </div>
              <div>
                <p>法律条款</p>
              </div>
            </div>
          </div>
          <div>
            <p class="subtitle">关注我们</p>
            <div class="row pics">
              <div>
                <img
                  src="../../assets/img/wechat.png"
                  alt=""
                  style="width: 50px"
                />
              </div>
              <div>
                <img
                  src="../../assets/img/weibo.png"
                  alt=""
                  style="width: 50px"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="net">网络备案</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
}
.board {
  background-color: rgb(211, 208, 208,0.8);
  width: 90%;
  margin: 2% auto 0;
}
.title p {
  font-size: 30px;
  text-align: center;
  font-weight: 400;
}
.title {
  width: 100%;
  margin: 1% auto;
}
.story {
  width: 500px;
  height: 520px;
  background-color: rgb(135, 192, 98);
  margin: 2% 6%;
}
.info {
  margin: 8% 14% 0;
  height: 370px;
}
.net {
  width: 600px;
  height: 100px;
  background-color: rgb(223, 84, 84);
}
.about {
  margin: 5px 100px 0 50px;
}
.subtitle {
  font-size: large;
  margin-bottom: 4px;
}
.subinfo p {
  margin: 8px 0;
}
.subinfo :hover {
  color: rgb(148, 223, 241, 0.8);
  cursor: pointer;
}
.pics{
    margin-top: 12px;
}
.pics img{
    margin-right: 12px;
    cursor: pointer;
}
</style>
