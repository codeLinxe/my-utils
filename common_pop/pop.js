/**
 * @desc 判断输入值是否是数组类型
 * @param {*} val 
 * @return {Boolean}
 */
function isArray(val) {
  if(!val) {
      return false
  }
  if(Object.prototype.toString.call(val) === '[object Array]') {
      return true
  }
  return false
}

/**
 * @desc 关闭弹窗
 */
function closepop() {
  $('.pop_modal').remove();
  $('.pop_tag').remove();
}

/**
  * @desc 单按钮消息弹窗
  * @param obj
  * @param obj.msg Array || String 消息
  * @param obj.red_flag Number 控制第几行变红色样式
  * @param obj.confirm_word String 按钮文本
  * @param obj.confirm_fn Function 按钮方法
  */
function pop_msg_single(obj) {
  var msg = obj.msg ? obj.msg : '';
  var red_flag = obj.red_flag ? obj.red_flag : 0; // 0：不存在 1：第一行红色样式 2: 第二行红色样式
  var confirm_word = obj.confirm_word ? obj.confirm_word : '确认';
  var confirm_fn = obj.confirm_fn ? obj.confirm_fn : closepop;
  var msg_content = '';
  if(isArray(msg)) {
    msg.forEach(function (item, index) {
      if (!!red_flag && index == red_flag - 1) {
        msg_content += ('<p class="pop_msg red_flag">' + item + '</p>');
      } else {
        msg_content += ('<p class="pop_msg">' + item + '</p>');
      }
    })
  }else {
    msg_content = !!red_flag ? '<p class="pop_msg red_flag">' + msg + '</p>' : '<p class="pop_msg">' + msg + '</p>';
  }
  
  var html = `
      <div class="pop_modal"></div>
      <div class="pop_tag pop_single">
          <div class="msg_wrap">
              ${msg_content}
          </div>
          <a href="javascirpt:;" class="confirm_btn">${confirm_word}</a>
      </div>
  `;
  $('body').append(html);
  $('.pop_single .confirm_btn').click(function(e) {
    e.preventDefault();
    confirm_fn();
  });
}

/**
 * @desc 双按钮消息弹窗
 * @param obj
 * @param obj.msg Array || String 消息
 * @param obj.red_flag Number 控制第几行变红色样式
 * @param obj.cancle_word String 灰色按钮文本
 * @param obj.confirm_word String 红色按钮文本
 * @param obj.cancle_fn Function 灰色按钮方法
 * @param obj.confirm_fn Function 红色按钮方法
 */
function pop_msg_double(obj) {
  var msg = obj.msg ? obj.msg : '';
  var red_flag = obj.red_flag ? obj.red_flag : 0; // 0：不存在 1：第一行红色样式 2: 第二行红色样式
  var cancle_word = obj.cancle_word ? obj.cancle_word : '取消';
  var confirm_word = obj.confirm_word ? obj.confirm_word : '确认';
  var cancle_fn = obj.cancle_fn ? obj.cancle_fn : closepop;
  var confirm_fn = obj.confirm_fn ? obj.confirm_fn : closepop;
  var msg_content = '';

  if(isArray(msg)) {
    msg.forEach(function(item, index) {
      if (!!red_flag && index == red_flag - 1) {
        msg_content += '<p class="pop_msg red_flag">'+ item +'</p>'
      }else {
        msg_content += '<p class="pop_msg">'+ item +'</p>'
      }
    })
  }else {
    msg_content = !!red_flag ? '<p class="pop_msg red_flag">' + msg + '</p>' : '<p class="pop_msg">' + msg + '</p>';
  }


  var html = `
      <div class="pop_modal"></div>
      <div class="pop_tag pop_double">
          <div class="msg_wrap">
            ${msg_content}
          </div>
          <div class="pop_double_btn_wrap">
              <a href="javascript:;" class="cancle_btn">${cancle_word}</a>
              <a href="javascirpt:;" class="confirm_btn">${confirm_word}</a>
          </div>
      </div>
  `;
  $('body').append(html);
  $('.pop_double .confirm_btn').click(function(e) {
    e.preventDefault();
    confirm_fn();
  });
  $('.pop_double .cancle_btn').click(function(e) {
    e.preventDefault();
    cancle_fn();
  });
}