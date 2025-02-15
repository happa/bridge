// 自動ポップアップを止める場合は"false"
const auto_popup = true

// ブラウザポップアップを止める場合は"false"
const back_popup = true

// ポップアップを２回出さないときにfalse
const multi_popup = true

// ブラウザバックをさせない場合は"true"にする
const prevent_back = false

// ポップアップを出すタイミングを設定(秒)
const pop_time=5

// 画像ファイルの相対path
const img_path="images/popup.jpg"

// リンク先
const set_href="https://docs.google.com/forms/d/e/1FAIpQLScj5GnA1FNGcqb2V-dLDpM3w8tYnZUrYORDqryvRg0-GzD_XA/viewform"




$(function () {
    let pop_flg = false
    let back_flg = false
    let insertHtml=`
    <!-- ポップアップ -->
    <div class="modal_wrap">
    <input id="modal_trigger" type="checkbox" >
        <div class="modal_overlay">
        <div id="modal_label" for="trigger" class="modal_trigger"></div>
        <div id="modal_content" class="modal_content">
            <a href="${set_href}">
                <img src="${img_path}" alt="">
            </a>
        </div>
    </div>
    </div>
    <!-- ポップアップ -->
    `

    let insertCSS=`
    <style>
    .modal_wrap input {
        display: none;
    }

    .modal_overlay {
        display: flex;
        justify-content: center;
        overflow: auto;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        background-color: rgba(50, 50, 50, 0.6);
        opacity: 0;
        transition: opacity 0.2s, transform 0s 0.2s;
        transform: scale(0);
    }

    .modal_trigger {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .modal_content {
        position: absolute;
        top: 50%;
        left: 50%;
        align-self: flex-start;
        min-width: 300px;
		max-width:350px;
        box-sizing: border-box;
        background: rgb(255, 255, 255);
        line-height: 1.4em;

        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transition: 0.5s;
        line-height: 1.4;
        font-weight: 100;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 12px 27px 2px;

        
    }


    .modal_wrap input:checked~.modal_overlay {
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.2s;
    }

    .modal_content img{
        max-width: 100%;
    }
    </style>
    `


    document.getElementsByTagName('head')[0]
        .insertAdjacentHTML('beforeend', insertCSS);
    document.getElementsByTagName('body')[0]
        .insertAdjacentHTML('afterbegin', insertHtml);


    if(back_popup){
        $(document).ready(function () {
            (function (b) {
                var c = function () {
                    this.initialize();
                };
                c.prototype = {
                    initialize: function () {
                        // if (b.originalEvent.state == "beforeunload") {
                        history.replaceState("beforeunload", null, null);
                        history.pushState(null, null, null);
                        //  }
                        b(window).on("popstate", b.proxy(this.popstate, this));
                    },
                    popstate: function (b) {
                        if(pop_flg && !multi_popup){
                            history.go(-1)
                        }
                        if (b.originalEvent.state === "beforeunload") {
                            viewBackGuide();     
                            back_flg=true                  
                        }
                    },
                };
                new c();
            })($);
        });
    }

    //ポップアップ領域をクリックされた場合、ポップアップを閉じる
    $("#modal_label").on('click', function () {
        $("#modal_trigger").prop('checked', false);
    });
    

    function viewBackGuide() {
        //戻るボタン無効化にするには下記を有効課
        if(prevent_back){
            history.pushState(null, null, null);
        }
        $("#modal_trigger").prop('checked', true);
    }
    if(auto_popup){
        if(!back_flg){
            setTimeout(function(){
                $("#modal_trigger").prop('checked', true)
                pop_flg=true
            }, pop_time*1000);
        }
    }
});
 